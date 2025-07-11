import { Box, createListCollection, Flex, Portal, Select, Spinner } from '@chakra-ui/react'
import type { FC } from 'react'
import type { EmployeeRoleEntry } from '../types/contentful'

type Props = {
  roles: EmployeeRoleEntry[]
  selectedRoleId: string | null
  onRoleChange: (roleId: string | null) => void
  isLoading: boolean
}

const RoleSelector: FC<Props> = ({ roles, selectedRoleId, onRoleChange, isLoading }) => {
  const options = createListCollection({
    items: roles,
    itemToString: (r) => r.fields.title as string,
    itemToValue: (r) => r.sys.id,
  })

  return (
    <Flex alignItems="center" gap={2} marginBottom={16}>
      <Box>Select User Role:</Box>
      <Select.Root
        value={selectedRoleId ? [selectedRoleId] : undefined}
        onValueChange={(details) => onRoleChange(details.value[0] || null)}
        disabled={isLoading || roles.length === 0}
        bg="white"
        borderColor="gray.300"
        className="w-full"
        collection={options}
        data-testid="role-selector">
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select User Role" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            {isLoading && <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />}
            {/*<Select.Indicator />*/}
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {options.items.map((i) => (
                <Select.Item item={i} key={i.sys.id}>
                  <Flex alignItems="center" gap={6} background="white" padding={'0.5rem 0.5rem'} cursor="pointer">
                    <Box width={8} height={8} background={i.fields.color as string} borderRadius={'50%'} />
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

export default RoleSelector
