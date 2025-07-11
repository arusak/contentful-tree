import { Box, createListCollection, Portal, Select, Spinner } from '@chakra-ui/react'
import type { FC } from 'react'
import type { EmployeeRoleEntry } from '../types/contentful'

interface RoleSelectorProps {
  roles: EmployeeRoleEntry[]
  selectedRoleId: string | null
  onRoleChange: (roleId: string | null) => void
  isLoading: boolean
}

const RoleSelector: FC<RoleSelectorProps> = ({ roles, selectedRoleId, onRoleChange, isLoading }) => {
  const options = createListCollection({
    items: roles,
    itemToString: (r) => r.fields.title as string,
    itemToValue: (r) => r.sys.id,
  })

  return (
    <Box className="w-full max-w-md mx-auto mb-6">
      <Select.Root
        value={selectedRoleId ? [selectedRoleId] : undefined}
        onChange={(e) => {
          const target = e.target as HTMLSelectElement
          const value = target.value
          onRoleChange(value)
        }}
        disabled={isLoading || roles.length === 0}
        bg="white"
        borderColor="gray.300"
        className="w-full"
        collection={options}
        data-testid="role-selector">
        <Select.Label>Select User Role:</Select.Label>
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
                  {i.fields.title as string}
                  {/*<Select.ItemIndicator />*/}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Box>
  )
}

export default RoleSelector
