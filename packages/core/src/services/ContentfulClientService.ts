import { createClient } from 'contentful'
import type { EmployeeRoleCollection, FolderCollection, InstructionCollection } from '../types/ContentfulTypes.ts'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? '',
  environment: process.env.CONTENTFUL_ENVIRONMENT ?? 'master',
})

export const fetchContentfulData = async () => {
  const folderResponse: FolderCollection = await client.getEntries({
    content_type: 'folder',
    include: 0,
  })

  const instructionResponse: InstructionCollection = await client.getEntries({
    content_type: 'instruction',
    include: 2,
  })

  const roleResponse: EmployeeRoleCollection = await client.getEntries({
    content_type: 'employeeRole',
  })

  return {
    folders: folderResponse.items,
    instructions: instructionResponse.items,
    roles: roleResponse.items,
  }
}
