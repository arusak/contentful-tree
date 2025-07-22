import { Box, Heading, HStack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import type { EmployeeRoleEntry, FolderEntry, InstructionEntry } from '../types/contentful'
import { ContentStack } from './ContentStack.tsx'

interface ContentTreeProps {
  folders: FolderEntry[]
  instructions: InstructionEntry[]
  roles: EmployeeRoleEntry[]
}

export const ContentTree: React.FC<ContentTreeProps> = ({ folders, instructions, roles }) => {
  const [instruction, setInstruction] = useState<InstructionEntry | null>(null)

  const folderMap = new Map<string, FolderEntry>()
  folders.forEach((folder) => folderMap.set(folder.sys.id, folder))

  const instructionMap = new Map<string, InstructionEntry>()
  instructions.forEach((instruction) => instructionMap.set(instruction.sys.id, instruction))

  const roleMap = new Map<string, EmployeeRoleEntry>()
  roles.forEach((role) => roleMap.set(role.sys.id, role))

  const rootFolder = folders.find((folder) => folder.fields.title === 'root')

  return (
    <>
      <Box>
        {rootFolder ? (
          <Box display={'grid'} gridTemplateColumns={'repeat(6, 16rem)'} gap={4}>
            <ContentStack
              foldersMap={folderMap}
              instructionsMap={instructionMap}
              parent={rootFolder}
              onShowInstruction={setInstruction}
              selectedInstruction={instruction}
            />
          </Box>
        ) : (
          <Text className="text-center p-4">No content found.</Text>
        )}
      </Box>
      {instruction && (
        <Box m={'2rem 1rem 0'} p={'2rem 4rem 2rem'} rounded={1} bg="white" shadow="2px 2px 8px rgba(0,0,0,0.1)">
          <HStack>
            {(instruction.fields.roles as EmployeeRoleEntry[]).sort(compareRoles).map((role) => (
              <Box key={role.sys.id} w={6} h={6} bg={role.fields.color as string} rounded={'50%'} />
            ))}
          </HStack>
          <Heading as="h2" mb={1}>
            {String(instruction.fields.title)}
          </Heading>
          <Text mb={1}>{String(instruction.fields.description)}</Text>
        </Box>
      )}
    </>
  )
}

const compareRoles = (r1: EmployeeRoleEntry, r2: EmployeeRoleEntry): number => {
  const title1 = r1.fields.title as string
  const title2 = r2.fields.title as string
  return title1.localeCompare(title2)
}
