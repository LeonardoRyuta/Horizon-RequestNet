import { AspectRatio, Card, Center, Flex, Heading, VStack, Image, Text, HStack, Box } from '@chakra-ui/react'

export default function History ({ txs }: { txs: any[] }) {
  return (
    <VStack w="full" h="full" alignItems="flex-start">
      <Heading>History</Heading>
      {
        txs.map((tx, index) => {
          return (
            <Card.Root key={index} size="sm" h="auto" w="full">
              <Card.Body color="fg.muted" fontSize="xs" p={2} flexDir="row">
                <AspectRatio h="auto" minW="60px" ratio={1}>
                  <Image src={tx.image} alt={tx.name} objectFit="cover" rounded="sm" />
                </AspectRatio>
                <Flex w="full" flexDir="column" justifyContent="space-between" ml={2}>
                  <Text fontSize="sm" fontWeight="bold">
                    {tx.name}
                  </Text>
                  <Text fontSize="xs">
                    {tx.description}	
                  </Text>
                  <Text fontSize="xs">
                    {` ${new Date(tx.time * 1000).toLocaleDateString()} `}
                  </Text>
                  <HStack>
                    {tx.tags.map((tag: string, index: number) => (
                      <Box key={index} border="1px solid gray" rounded="full" px={2} fontSize="xx-small" display="flex" justifyContent="center" alignItems="center">
                        {tag}
                      </Box>
                    ))}
                  </HStack>
                </Flex>
                <Center>
                  <Text fontSize="xs" fontWeight="bold" color="fg.strong">
                    ${tx.price}
                  </Text>
                </Center>
              </Card.Body>
            </Card.Root>
          )
        })
      }
    </VStack>
  )
}