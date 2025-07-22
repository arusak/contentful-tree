import type { Entry } from 'contentful'
import type { EmployeeRoleEntry, FolderEntry, InstructionEntry, InstructionWithPath } from 'types/ContentfulTypes.ts'

const createFolderMap = (folders: FolderEntry[]) => {
  const folderMap = new Map<string, FolderEntry>()
  folders.forEach((folder) => folderMap.set(folder.sys.id, folder))
  return folderMap
}

const createRoleMap = (roles: EmployeeRoleEntry[]) => {
  const roleMap = new Map<string, EmployeeRoleEntry>()
  roles.forEach((role) => roleMap.set(role.sys.id, role))
  return roleMap
}

const createChildToParentMap = (folders: FolderEntry[]) => {
  const childToParent = new Map<string, string>()
  folders.forEach((folder) => {
    const children = (folder.fields.children ?? []) as Entry[]
    children.forEach((child) => {
      childToParent.set(child.sys.id, folder.sys.id)
    })
  })
  return childToParent
}

const buildPath = (id: string, childToParent: Map<string, string>, folderMap: Map<string, FolderEntry>): string[] => {
  const path: string[] = []
  let currentId = id
  const visited = new Set<string>()

  while (childToParent.has(currentId) && !visited.has(currentId)) {
    visited.add(currentId)
    const parentId = childToParent.get(currentId)!
    const parent = folderMap.get(parentId)

    if (parent) {
      path.unshift(parent.fields.title as string)
    }
    currentId = parentId
  }
  return path
}

export const processInstructions = (
  folders: FolderEntry[],
  instructions: InstructionEntry[],
  roles: EmployeeRoleEntry[],
): InstructionWithPath[] => {
  const folderMap = createFolderMap(folders)
  const roleMap = createRoleMap(roles)
  const childToParent = createChildToParentMap(folders)

  return instructions.map((instruction) => {
    const path = buildPath(instruction.sys.id, childToParent, folderMap)

    const rawRoles = (instruction?.fields?.roles ?? []) as EmployeeRoleEntry[]
    const instructionRoles = rawRoles.map((r) => {
      const role = roleMap.get(r.sys.id)
      return {
        id: r.sys.id,
        title: (role?.fields.title as string) || 'Unknown Role',
        color: (role?.fields.color as string) || '#CCCCCC',
      }
    })

    return {
      id: instruction.sys.id,
      title: instruction.fields.title as string,
      description: instruction.fields.description as string,
      path,
      roles: instructionRoles,
    }
  })
}
