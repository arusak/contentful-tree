import { Alert, Container } from '@chakra-ui/react'
import { useContentful } from '@contentful-web/core'
import { ContentTree } from 'components/ContentTree'
import { Header } from 'components/Header'
import { LoadingSpinner } from 'components/LoadingSpinner'
import { RoleSelector } from 'components/RoleSelector'
import { useEffect, useState } from 'react'

export const App = () => {
  const { roles, loading, error, folders, instructions } = useContentful()
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null)

  // @ts-expect-error
  const instructionsForRole = instructions.filter((i) => i.fields.roles?.some((role) => role.sys.id === selectedRoleId))
  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect runs only once to set the initial role
  useEffect(() => {
    if (roles.length === 0 || selectedRoleId) return
    setSelectedRoleId(roles[0].sys.id)
  }, [roles])

  return (
    <>
      <Header />
      <Container fluid p="8" minH="100vh" bg="gray.50">
        {error && (
          <Alert.Root status="error" className="mb-6 rounded-md">
            <Alert.Title>Error loading content!</Alert.Title>
            <Alert.Description>Please check your Contentful credentials and try again.</Alert.Description>
          </Alert.Root>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <RoleSelector
              roles={roles}
              selectedRoleId={selectedRoleId}
              onRoleChange={setSelectedRoleId}
              isLoading={loading}
            />
            <ContentTree key={selectedRoleId} folders={folders} instructions={instructionsForRole} roles={roles} />
          </>
        )}
      </Container>
    </>
  )
}
