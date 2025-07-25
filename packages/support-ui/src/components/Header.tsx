import { Avatar, Box, Flex, HStack, Menu, Portal, Tabs } from '@chakra-ui/react'
import { ChevronDown, LogOut } from 'lucide-react'
import logoSvg from 'assets/logo.svg'
import type { FC } from 'react'

type Props = {
  userName?: string
  userInitials?: string
}

export const Header: FC<Props> = ({ userName = 'John Doe', userInitials = 'JD' }) => {
  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log('Logout clicked')
  }

  return (
    <Box bg="white" borderBottom="1px" borderColor="gray.200" px={8} py={4}>
      <Flex align="center" justify="space-between">
        {/* Logo */}
        <Box>
          <img src={logoSvg} alt="Logo" style={{ height: '40px' }} />
        </Box>

        {/* Navigation Menu */}
        <Tabs.Root defaultValue="documents" variant="enclosed">
          <Tabs.List>
            <Tabs.Trigger value="home">Home</Tabs.Trigger>
            <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
            <Tabs.Trigger value="live-support">Live Support</Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>

        {/* User Menu */}
        <Menu.Root>
          <Menu.Trigger asChild>
            <HStack cursor="pointer" gap={2}>
              <Avatar.Root size="sm">
                <Avatar.Fallback>{userInitials}</Avatar.Fallback>
              </Avatar.Root>
              <ChevronDown size={16} />
            </HStack>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item disabled value="profile">
                  <Box fontWeight="medium">{userName}</Box>
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item onClick={handleLogout} value="logout">
                  <HStack>
                    <LogOut size={16} />
                    <Box>Log out</Box>
                  </HStack>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>
    </Box>
  )
}
