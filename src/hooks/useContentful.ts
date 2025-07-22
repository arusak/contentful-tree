import { useEffect, useState } from 'react'
import { fetchContentfulData } from '../services/ContentfulClientService.ts'
import type { EmployeeRoleEntry, FolderEntry, InstructionEntry, InstructionWithPath } from '../types/contentful'
import { processInstructions } from '../utils/ContentfulDataUtils.ts'

export const useContentful = () => {
  const [folders, setFolders] = useState<FolderEntry[]>([])
  const [instructions, setInstructions] = useState<InstructionEntry[]>([])
  const [roles, setRoles] = useState<EmployeeRoleEntry[]>([])
  const [processedInstructions, setProcessedInstructions] = useState<InstructionWithPath[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchContent = async () => {
    setLoading(true)
    setError(null)

    try {
      const { folders, instructions, roles } = await fetchContentfulData()
      setFolders(folders)
      setInstructions(instructions)
      setRoles(roles)

      const processed = processInstructions(folders, instructions, roles)
      setProcessedInstructions(processed)
    } catch (err) {
      console.error('[Contentful Error]', err)
      setError(err instanceof Error ? err : new Error('Unknown error occurred'))
    } finally {
      setLoading(false)
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: used to fetch data on mount
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
