import { Radio, RadioGroup } from "@/components/ui/radio"
import { Heading, VStack, Card, Image, AspectRatio, Badge, Text, Flex, Center, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export default function Available({ deals, txs }: { deals: any[], txs: any[] }) {
  const [availableDeals, setAvailableDeals] = useState<any[]>([])
  
  const checkIfDealReqsMet = () => {
    txs.forEach((tx) => {
      if (checkDupe(tx)) return
      deals.forEach((deal) => {
        if (deal.requirements[0].type == "spend") {
          if (tx.price >= deal.requirements[0].amount && deal.tags.every((tag: string) => tx.tags.includes(tag))) {
            setAvailableDeals([...availableDeals, deal])
          }
        } else {
          if (tx.tags.includes(deal.requirements[0].amount) && deal.tags.every((tag: string) => tx.tags.includes(tag))) {
            setAvailableDeals([...availableDeals, deal])
          }
        }
      })
    })
  }

  const checkDupe = (tx: any) => {
    return availableDeals.some((deal) => deal.id === tx.id)
  }

  const applyDeal = (deal: any) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "APPLY_DEAL", data: JSON.stringify(deal) });
      }
    });
  }

  useEffect(() => {
    checkIfDealReqsMet()
  }, [txs])

  return (
    <VStack w="full" h="full" alignItems="flex-start">
      <Heading>Available Deals</Heading>
      {
        availableDeals.map((deal, index) => {
          return (
            <div key={index}>
              <Card.Root size="sm" h="auto" w="full">
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
                    <Button as={Text} size="sm" fontSize="xs" fontWeight="bold" color="fg.strong"
                      onClick={() => applyDeal(deal)}
                    >
                      Apply
                    </Button>
                  </Center>
                </Card.Body>
              </Card.Root>
              <RadioGroup variant="outline" size="sm" defaultValue={deal.name}>
                <Radio value={deal.name} disabled>
                  {
                    deal.requirements[0].type == "spend" ? `Spend $${deal.requirements[0].amount} on ${deal.tags.map((tag: string) => tag).join(", ")}` : `Buy ${deal.requirements[0].amount} related to ${deal.tags.map((tag: string) => tag).join(", ")}`
                  }
                </Radio>
              </RadioGroup>
            </div>
          )
        })
      }
    </VStack>
  )
}