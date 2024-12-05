import { VStack, Heading } from "@chakra-ui/react"
import { DealCard } from "@/components"

export default function Others({ deals }: { deals: any[] }) {
  return (
    <VStack w="full" h="full" alignItems="flex-start">
      <Heading>Other Deals</Heading>
      {
        deals.map((deal, index) => {
          return (
            <DealCard key={index} deal={deal} available={false} />
          )
        })
      }
    </VStack>
  )
}