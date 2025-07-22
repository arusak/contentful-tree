import { Container, Spinner, Text, VStack } from '@chakra-ui/react'
import type { FC } from 'react'

interface LoadingSpinnerProps {
  message?: string
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ message = 'Loading content...' }) => (
  <Container fluid p="8" centerContent>
    <VStack>
      <Spinner color="blue.500" size="xl" />
      <Text color="gray.600">{message}</Text>
    </VStack>
  </Container>
)
