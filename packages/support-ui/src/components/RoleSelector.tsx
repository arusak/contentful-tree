import { Box, createListCollection, Flex, Portal, Select, Spinner, useSelectContext } from '@chakra-ui/react'
import type { EmployeeRoleEntry } from '@contentful-web/core'
import type { FC } from 'react'

type Props = {
  roles: EmployeeRoleEntry[]
  selectedRoleId: string | null
  onRoleChange: (roleId: string | null) => void
  isLoading: boolean
}

const SelectValue = () => {
  const select = useSelectContext()
  const [item] = select.selectedItems as EmployeeRoleEntry[]
  return (
    <Select.ValueText>
      <Flex align="center" gap={3}>
        <Box w={3} h={3} bg={item?.fields.color as string} rounded={'50%'} />
        {String(item?.fields.title)}
      </Flex>
    </Select.ValueText>
  )
}

export const RoleSelector: FC<Props> = ({ roles, selectedRoleId, onRoleChange, isLoading }) => {
  const options = createListCollection({
    items: roles,
    itemToString: (r) => r.fields.title as string,
    itemToValue: (r) => r.sys.id,
  })

  return (
    <Flex align="center" gap={3} m={'2rem 0'} fontSize={'150%'}>
      <Box flexShrink={0}>Select User Role:</Box>
      <Select.Root
        value={selectedRoleId ? [selectedRoleId] : undefined}
        onValueChange={(details) => onRoleChange(details.value[0] || null)}
        disabled={isLoading || roles.length === 0}
        bg="white"
        borderColor="gray.300"
        collection={options}>
        <Select.Control>
          <Select.Trigger>
            <SelectValue />
          </Select.Trigger>
          <Select.IndicatorGroup>
            {isLoading && <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />}
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {options.items.map((i) => (
                <Select.Item item={i} key={i.sys.id}>
                  <Flex align="center" gap={2} p={'0.5rem 0.5rem'} cursor="pointer">
                    <Box w={2} h={2} bg={i.fields.color as string} rounded={'50%'} />
                    {i.fields.title as string}
                  </Flex>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Flex>
  )
}
