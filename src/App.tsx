import { Alert, Box, Container, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import './App.css'

import ContentTree from './components/ContentTree.tsx'
import LoadingSpinner from './components/LoadingSpinner'
import RoleSelector from './components/RoleSelector'
import { useContentful } from './hooks/useContentful'

function App() {
  const { roles, loading, error, folders, instructions } = useContentful()
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect runs only once to set the initial role
  useEffect(() => {
    if (roles.length === 0 || selectedRoleId) return
    setSelectedRoleId(roles[0].sys.id)
  }, [roles])

  return (
    <Container maxW="container.lg" padding="1rem 2rem">
      <Box>
        <Heading as="h1" size="xl">
          Instructions Catalog
        </Heading>
        <RoleSelector
          roles={roles}
          selectedRoleId={selectedRoleId}
          onRoleChange={setSelectedRoleId}
          isLoading={loading}
        />
      </Box>

      {error && (
        <Alert.Root status="error" className="mb-6 rounded-md">
          <Alert.Title>Error loading content!</Alert.Title>
          <Alert.Description>Please check your Contentful credentials and try again.</Alert.Description>
        </Alert.Root>
      )}

      {loading ? <LoadingSpinner /> : <ContentTree folders={folders} instructions={instructions} roles={roles} />}
    </Container>
  )
}

export default App
