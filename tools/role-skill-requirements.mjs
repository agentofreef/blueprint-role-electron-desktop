import { ProjectError } from './errors.mjs'

const namePattern = /^[a-z][a-z0-9-]{1,62}$/
const shaPattern = /^[a-f0-9]{40}$/
const digestPattern = /^[a-f0-9]{64}$/
const versionPattern = /^\d{1,8}\.\d{1,8}\.\d{1,8}$/
const repoPattern = /^[a-z\d][a-z\d-]{0,38}\/[a-z\d][a-z\d_.-]{0,99}$/i
const objectWith = (item, allowed) => item && typeof item === 'object' && !Array.isArray(item)
  && Object.keys(item).every(key => allowed.includes(key))
const validText = (value, max) => typeof value === 'string' && value.trim() && value.length <= max && !/[\x00-\x1f\x7f]/.test(value)
const invalid = () => { throw new ProjectError('INVALID_ROLE_PACKAGE', '角色 Skill 依赖声明无效。') }

export const roleSetupToolIds = ['git', 'node', 'npm', 'python', 'browser', 'terminal']
export const roleSetupPath = 'setup/requirements.json'

export function hasRoleSetup(manifest) {
  return manifest?.protocolVersion === 2 && Array.isArray(manifest.resources)
    && manifest.resources.some(resource => resource?.path === roleSetupPath && resource.kind === 'environment')
}

export function readRoleSetupManifest(manifest, bytes) {
  if (!hasRoleSetup(manifest)) return manifest
  if (!bytes?.length || bytes.length > 65_536 || ['skillRequirements', 'environment', 'installScript'].some(key => Object.hasOwn(manifest, key))) invalid()
  let setup
  try { setup = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)) } catch { invalid() }
  if (!objectWith(setup, ['schemaVersion', 'skillRequirements', 'environment', 'installScript']) || setup.schemaVersion !== 1) invalid()
  if (setup.installScript !== undefined && (typeof setup.installScript !== 'string' || !/^setup\/[a-z][a-z0-9-]*\.json$/.test(setup.installScript)
      || setup.installScript === roleSetupPath || !manifest.resources.some(resource => resource.path === setup.installScript && resource.kind === 'workflow'))) invalid()
  const { schemaVersion: _schemaVersion, ...fields } = setup
  const resolved = { ...manifest, ...fields }
  roleSkillRequirements(resolved)
  marketEnvironmentRequirements(resolved)
  return resolved
}

export function roleInstallScriptSteps(value, manifest) {
  const expected = new Set([
    ...(manifest.environment ?? []).map(item => `tool:${item.id}`),
    ...(manifest.skillRequirements ?? []).map(item => `skill:${item.name}`),
  ])
  if (!objectWith(value, ['steps']) || !Array.isArray(value.steps) || value.steps.length !== expected.size
      || new Set(value.steps).size !== expected.size || value.steps.some(step => !expected.has(step))) invalid()
  return value.steps
}

export function roleSkillRequirements(manifest) {
  const items = manifest.skillRequirements ?? []
  if (!Array.isArray(items) || items.length > 24) invalid()
  const names = new Set((manifest.skills ?? []).map(skill => skill?.name))
  return items.map(item => {
    if (!objectWith(item, ['name', 'required', 'missingPrompt', 'source']) || typeof item.name !== 'string' || !namePattern.test(item.name)
        || names.has(item.name) || typeof item.required !== 'boolean' || !validText(item.missingPrompt, 700)) invalid()
    names.add(item.name)
    const source = item.source
    if (source?.kind === 'github') {
      if (!objectWith(source, ['kind', 'repository', 'commit', 'path', 'sha256', 'group'])
          || typeof source.repository !== 'string' || !repoPattern.test(source.repository)
          || typeof source.commit !== 'string' || !shaPattern.test(source.commit)
          || typeof source.sha256 !== 'string' || !digestPattern.test(source.sha256)
          || typeof source.path !== 'string' || source.path.length > 240 || !/^(?:[a-z0-9_.-]+\/)*SKILL\.md$/i.test(source.path)
          || source.path.split('/').some(part => part === '.' || part === '..' || /\.$/.test(part))
          || source.group !== undefined && !validText(source.group, 100)
          || item.name.startsWith('blueprint-')) invalid()
    } else if (source?.kind === 'role-package') {
      if (!objectWith(source, ['kind', 'packageId', 'version', 'label']) || typeof source.packageId !== 'string' || !namePattern.test(source.packageId)
          || source.packageId === manifest.packageId || source.packageId === 'blueprint-manager'
          || typeof source.version !== 'string' || !versionPattern.test(source.version) || source.label !== undefined && !validText(source.label, 100)) invalid()
    } else invalid()
    return { name: item.name, required: item.required, missingPrompt: item.missingPrompt, source: { ...source } }
  })
}

export function marketEnvironmentRequirements(manifest) {
  const items = manifest.environment ?? []
  if (!Array.isArray(items) || items.length > 12) invalid()
  const ids = new Set()
  return items.map(item => {
    if (!objectWith(item, ['id', 'kind', 'required', 'minVersion', 'label']) || !roleSetupToolIds.includes(item.id)
        || ids.has(item.id) || !['runtime', 'tool'].includes(item.kind) || typeof item.required !== 'boolean'
        || !validText(item.label, 100) || item.minVersion !== undefined && !/^\d+\.\d+(?:\.\d+)?$/.test(item.minVersion)) invalid()
    ids.add(item.id)
    return { ...item }
  })
}
