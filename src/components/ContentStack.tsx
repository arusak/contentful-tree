import { Box, Grid, GridItem, Separator, Stack } from '@chakra-ui/react'
import { ChevronRight, FileText } from 'lucide-react'
import { type FC, useState } from 'react'
import type { FolderEntry, InstructionEntry } from 'types/ContentfulTypes.ts'

type Props = {
  foldersMap: Map<string, FolderEntry>
  instructionsMap: Map<string, InstructionEntry>
  parent: FolderEntry
  onShowInstruction: (instruction: InstructionEntry) => void
  selectedInstruction: InstructionEntry | null
}

export const ContentStack: FC<Props> = ({
  foldersMap,
  instructionsMap,
  parent,
  onShowInstruction,
  selectedInstruction,
}) => {
  const [selectedFolder, selectFolder] = useState<FolderEntry | null>(null)
  // @ts-expect-error todo
  const childrenIds: string[] = parent?.fields?.children?.map((child) => child.sys.id) ?? []
  const allEntriesIds = new Set([...foldersMap.keys(), ...instructionsMap.keys()])
  const folders = childrenIds
    .map((id) => foldersMap.get(id))
    .filter(Boolean)
    .filter(
      (f) =>
        !!f?.fields.children &&
        // @ts-expect-error
        f.fields.children.length > 0 &&
        // @ts-expect-error
        f.fields.children.some((child) => allEntriesIds.has(child.sys.id)),
    ) as FolderEntry[]
  const instructions = childrenIds.map((id) => instructionsMap.get(id)).filter(Boolean) as InstructionEntry[]

  return (
    <>
      <Stack gap={4}>
        <Box borderColor="gray.200" borderBottomWidth="thin">
          {String(parent?.fields.title)}
        </Box>

        {folders.map((f) => (
          <Grid
            templateColumns="1fr auto"
            p={4}
            gap={2}
            rounded="md"
            minH={90}
            bg={selectedFolder === f ? 'green.600' : 'gray.200'}
            color={selectedFolder === f ? 'white' : 'inherit'}
            alignItems="center"
            key={f.sys.id}
            cursor="pointer"
            onClick={() => {
              selectFolder(f)
            }}>
            <GridItem>{String(f.fields.title)}</GridItem>
            <GridItem>
              <ChevronRight />
            </GridItem>
          </Grid>
        ))}

        {folders.length > 0 && instructions.length > 0 && <Separator />}

        {instructions.map((i) => (
          <Grid
            templateColumns="1fr auto"
            gap={2}
            alignItems="center"
            p={4}
            rounded="md"
            bg="gray.200"
            outline={selectedInstruction === i ? '0.25rem solid orange' : 'none'}
            minH={90}
            key={i.sys.id}
            cursor="pointer"
            onClick={() => {
              onShowInstruction(i)
            }}>
            <Box>{String(i.fields.title)}</Box>
            <GridItem>
              <FileText />
            </GridItem>
          </Grid>
        ))}
      </Stack>
      {selectedFolder && folders.includes(selectedFolder) && (
        <ContentStack
          key={selectedFolder?.sys.id}
          foldersMap={foldersMap}
          instructionsMap={instructionsMap}
          parent={selectedFolder}
          onShowInstruction={onShowInstruction}
          selectedInstruction={selectedInstruction}
        />
      )}
    </>
  )
}
