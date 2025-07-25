import { Bleed, Box, EmptyState, Flex, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import type { EmployeeRoleEntry, FolderEntry, InstructionEntry } from '@contentful-web/core'
import { ContentStack } from 'components/ContentStack'
import { type FC, useState } from 'react'

type Props = {
  folders: FolderEntry[]
  instructions: InstructionEntry[]
  roles: EmployeeRoleEntry[]
}

export const ContentTree: FC<Props> = ({ folders, instructions, roles }) => {
  const [instruction, setInstruction] = useState<InstructionEntry | null>(null)

  const folderMap = new Map<string, FolderEntry>()
  folders.forEach((folder) => folderMap.set(folder.sys.id, folder))

  const instructionMap = new Map<string, InstructionEntry>()
  instructions.forEach((instruction) => instructionMap.set(instruction.sys.id, instruction))

  const roleMap = new Map<string, EmployeeRoleEntry>()
  roles.forEach((role) => roleMap.set(role.sys.id, role))

  const rootFolder = folders.find((folder) => folder.fields.title === 'root')

  return (
    <Flex direction={'column'} gap={8}>
      <Box>
        {rootFolder ? (
          <Grid templateColumns={'repeat(6, 16rem)'} gap={4}>
            <ContentStack
              foldersMap={folderMap}
              instructionsMap={instructionMap}
              parent={rootFolder}
              onShowInstruction={setInstruction}
              selectedInstruction={instruction}
            />
          </Grid>
        ) : (
          <EmptyState.Root>
            <EmptyState.Content>
              <VStack textAlign="center">
                <EmptyState.Title>No content is available</EmptyState.Title>
                <EmptyState.Description>
                  Please check your Contentful setup or contact your administrator.
                </EmptyState.Description>
              </VStack>
            </EmptyState.Content>
          </EmptyState.Root>
        )}
      </Box>

      {instruction && (
        <Flex direction={'column'} gap={4} p={'2rem 4rem'} rounded="md" bg="white" shadow="lg">
          <HStack>
            {(instruction.fields.roles as EmployeeRoleEntry[]).sort(compareRoles).map((role) => (
              <Box key={role.sys.id} w={6} h={6} bg={role.fields.color as string} rounded={'50%'} />
            ))}
          </HStack>
          <Bleed />
          <Heading as="h2">{String(instruction.fields.title)}</Heading>
          <Text>{String(instruction.fields.description)}</Text>
        </Flex>
      )}
    </Flex>
  )
}

const compareRoles = (r1: EmployeeRoleEntry, r2: EmployeeRoleEntry): number => {
  const title1 = r1.fields.title as string
  const title2 = r2.fields.title as string
  return title1.localeCompare(title2)
}
