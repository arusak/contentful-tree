import { Center, Spinner, Text, VStack } from '@chakra-ui/react'

interface LoadingSpinnerProps {
  message?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading content...' }) => {
  return (
    <Center className="h-64 w-full">
      <VStack>
        <Spinner color="blue.500" size="xl" />
        <Text color="gray.600">{message}</Text>
      </VStack>
    </Center>
  )
}

export default LoadingSpinner
