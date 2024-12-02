import { Heading, VStack, Card, Image, AspectRatio } from "@chakra-ui/react"
import { mockData } from "@/utils"

export default function Available({ data }: any) {
  const deals = mockData.deals

  return (
    <VStack w="full" h="full" alignItems="flex-start">
      <Heading>Available Deals</Heading>
      <Card.Root size="sm" flexDir="row" h="auto">
        <Card.Header p={2}>
          <AspectRatio w="60px" h="full" ratio={4 / 3}>
          
            <Image src={deals[0].image} alt={deals[0].name} objectFit="cover" rounded="sm"/>
          </AspectRatio>  
        </Card.Header>
        <Card.Body color="fg.muted" fontSize="xs" p={2}>
          This is the card body. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </Card.Body>
      </Card.Root>
    </VStack>
  )
}