import { createClient, type Entry } from 'contentful'
import { useEffect, useState } from 'react'
import type {
  EmployeeRoleCollection,
  EmployeeRoleEntry,
  FolderCollection,
  FolderEntry,
  InstructionCollection,
  InstructionEntry,
  InstructionWithPath,
} from '../types/contentful'

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
})

export const useContentful = () => {
  const [folders, setFolders] = useState<FolderEntry[]>([])
  const [instructions, setInstructions] = useState<InstructionEntry[]>([])
  const [roles, setRoles] = useState<EmployeeRoleEntry[]>([])
  const [processedInstructions, setProcessedInstructions] = useState<InstructionWithPath[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  // Fetch all content types from Contentful
  const fetchContent = async () => {
    setLoading(true)
    setError(null)

    try {
      // Fetch folders
      const folderResponse: FolderCollection = await client.getEntries({
        content_type: 'folder',
        include: 0, // levels of linked entries
      })

      // Fetch instructions
      const instructionResponse: InstructionCollection = await client.getEntries({
        content_type: 'instruction',
        include: 2, // levels of linked entries
      })

      // Fetch employee roles
      const roleResponse: EmployeeRoleCollection = await client.getEntries({
        content_type: 'employeeRole',
      })

      setFolders(folderResponse.items)
      setInstructions(instructionResponse.items)
      setRoles(roleResponse.items)

      // Process instructions to include path information
      const processed = processInstructions(folderResponse.items, instructionResponse.items, roleResponse.items)

      setProcessedInstructions(processed)
      setLoading(false)
    } catch (err) {
      console.error('[Contentful Error]', err)
      setError(err instanceof Error ? err : new Error('Unknown error occurred'))
      setLoading(false)
    }
  }

  // Build path for each instruction by traversing folder structure
  const processInstructions = (
    folders: FolderEntry[],
    instructions: InstructionEntry[],
    roles: EmployeeRoleEntry[],
  ): InstructionWithPath[] => {
    // Create a map of folder IDs to folder entries for quick lookup
    const folderMap = new Map<string, FolderEntry>()
    folders.forEach((folder) => folderMap.set(folder.sys.id, folder))

    // Create a map of instruction IDs to instruction entries for quick lookup
    const instructionMap = new Map<string, InstructionEntry>()
    instructions.forEach((instruction) => instructionMap.set(instruction.sys.id, instruction))

    // Create a map of role IDs to role entries for quick lookup
    const roleMap = new Map<string, EmployeeRoleEntry>()
    roles.forEach((role) => roleMap.set(role.sys.id, role))

    // Find all parent-child relationships
    const childToParent = new Map<string, string>()

    // For each folder, record the parent-child relationships
    folders.forEach((folder) => {
      const children = (folder.fields.children ?? []) as Entry[]
      children.forEach((child) => {
        childToParent.set(child.sys.id, folder.sys.id)
      })
    })

    // Process each instruction to build its path
    return instructions.map((instruction) => {
      const path = buildPath(instruction.sys.id, childToParent, folderMap)

      // Extract roles information
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

  // Recursively build the path for an instruction
  const buildPath = (id: string, childToParent: Map<string, string>, folderMap: Map<string, FolderEntry>): string[] => {
    const path: string[] = []
    let currentId = id

    // Prevent infinite loops by tracking visited IDs
    const visited = new Set<string>()

    while (childToParent.has(currentId) && !visited.has(currentId)) {
      visited.add(currentId)
      const parentId = childToParent.get(currentId) ?? ''
      const parent = folderMap.get(parentId)

      if (parent) {
        path.unshift(parent.fields.title as string)
      }

      currentId = parentId
    }

    return path
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: Fetch content on component mount
  useEffect(() => {
    fetchContent()
  }, [])

  return {
    folders,
    instructions,
    roles,
    processedInstructions,
    loading,
    error,
    refetch: fetchContent,
  }
}
