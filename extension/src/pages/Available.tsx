import { Heading, VStack, Card, Image, AspectRatio, Badge, Text, Flex, Center } from "@chakra-ui/react"
import { mockData } from "@/utils"

export default function Available() {
  const deals = mockData.deals

  return (
    <VStack w="full" h="full" alignItems="flex-start">
      <Heading>Available Deals</Heading>
      {
        deals.map((deal, index) => {
          return (
            <Card.Root key={index} size="sm" h="auto" w="full">
              <Card.Body color="fg.muted" fontSize="xs" p={2} flexDir="row">
                <AspectRatio h="auto" minW="60px" ratio={1}>
                  <Image src={deal.image} alt={deal.name} objectFit="cover" rounded="sm" />
                </AspectRatio>
                <Flex w="full" flexDir="column" justifyContent="space-between" ml={2}>
                  <Badge variant="solid" colorPalette="blue" w="min">
                    {/* <HiStar /> */}
                    {deal.discount}% OFF
                  </Badge>
                  <Text fontSize="sm" fontWeight="bold">
                    {deal.name}
                  </Text>
                  <Text fontSize="xs">
                    Expires in
                    {` ${Math.floor((deal.expirationDate - Math.floor(Date.now() / 1000)) / (60 * 60 * 24))} `}
                    days
                  </Text>
                </Flex>
                <Center>
                  <Text fontSize="xs" fontWeight="bold" color="fg.strong">
                    Apply
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