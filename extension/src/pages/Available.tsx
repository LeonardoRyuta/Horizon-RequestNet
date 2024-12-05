import { Heading, VStack, Text, Center } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { DealCard } from "@/components"

export default function Available({ deals, txs }: { deals: any[], txs: any[] }) {
  const [availableDeals, setAvailableDeals] = useState<any[]>([])

  const checkIfDealReqsMet = () => {
    const fresh: any[] = []
    txs.forEach((tx) => {
      deals.forEach((deal) => {
        if (checkDupe(deal, fresh)) return
        if (deal.requirements[0].type == "spend") {
          if (tx.price >= deal.requirements[0].amount && deal.tags.some((tag: string) => tx.tags.includes(tag))) {
            fresh.push(deal)
          }
        } else {
          if (tx.tags.includes(deal.requirements[0].amount) && deal.tags.some((tag: string) => tx.tags.includes(tag))) {
            fresh.push(deal)
          }
        }
      })
    })
    setAvailableDeals(fresh)
  }

  const checkDupe = (tx: any, list: any[]) => {
    return list.some((deal) => deal.id === tx.id)
  }

  useEffect(() => {
    checkIfDealReqsMet()
  }, [txs])

  return (
    <VStack w="full" h="full" alignItems="flex-start">
      <Heading>Available Deals</Heading>
      {
        availableDeals.length === 0 &&
        <Center w="full" h="full">
          <Text>No deals available</Text>
        </Center>
      }
      {
        availableDeals.map((deal, index) => {
          return (
            <DealCard key={index} deal={deal} available={true} />
          )
        })
      }
    </VStack>
  )
}