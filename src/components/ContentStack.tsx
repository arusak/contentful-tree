import { Box, Icon, Stack } from '@chakra-ui/react'
import { type FC, useState } from 'react'
import type { FolderEntry, InstructionEntry } from '../types/contentful.ts'

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
  const childrenIds: string[] = parent.fields.children?.map((child) => child.sys.id) ?? []
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
      <Stack gap={16}>
        <Box borderBottom={'thin solid #ddd'}>{String(parent.fields.title)}</Box>

        {folders.map((f) => (
          <Box
            display="grid"
            gridTemplateColumns="1fr auto"
            background="#ddd"
            padding={20}
            rounded="md"
            shadow="sm"
            minHeight={90}
            outline={selectedFolder === f ? '0.25rem solid tan' : 'none'}
            alignItems="center"
            key={f.sys.id}
            cursor="pointer"
            onClick={() => {
              selectFolder(f)
            }}>
            <Box>{String(f.fields.title)}</Box>
            <Box>&gt;</Box>
          </Box>
        ))}
        {instructions.map((i) => (
          <Box
            background="#ddd"
            display="grid"
            gridTemplateColumns="1fr auto"
            alignItems="center"
            padding={20}
            rounded="md"
            outline={selectedInstruction === i ? '0.25rem solid orange' : 'none'}
            shadow="sm"
            minHeight={90}
            key={i.sys.id}
            cursor="pointer"
            onClick={() => {
              onShowInstruction(i)
            }}>
            <Box>{String(i.fields.title)}</Box>
            <Icon>
              {/** biome-ignore lint/a11y/noSvgWithoutTitle: no */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 2H6C4.9 2 4 2.9 4 4v16c0 1.1 0.9 2 2 2h12c1.1 0 2-0.9 2-2V8l-6-6z"
                  fill="#f8f9fa"
                  stroke="#374151"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
                <path
                  d="M14 2v6h6"
                  fill="none"
                  stroke="#374151"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <line x1="8" y1="13" x2="16" y2="13" stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round" />
                <line x1="8" y1="17" x2="16" y2="17" stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round" />
                <line x1="8" y1="9" x2="12" y2="9" stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </Icon>
          </Box>
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
