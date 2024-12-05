import { Card, AspectRatio, Flex, Badge, Center, Button, Image, Text } from "@chakra-ui/react"
import { Radio, RadioGroup } from "./ui/radio"
import { useState } from "react"

export const DealCard = ({ deal, available }: { deal: any, available: boolean }) => {
  const [applied, setApplied] = useState(false)
  
  const applyDeal = (deal: any) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "APPLY_DEAL", data: JSON.stringify(deal) });
        setApplied(true)
      }
    });
  }

  return (
    <>
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
          {
            available &&
            <Center>
              <Button as={Text} size="sm" fontSize="xs" fontWeight="bold" color="fg.strong"
                onClick={() => applyDeal(deal)}
                opacity={applied ? 0.5 : 1}
              >
                {
                  applied ? "Applied" : "Apply"
                }
              </Button>
            </Center>
          }
        </Card.Body>
      </Card.Root>
      <RadioGroup variant="outline" size="sm" 
        defaultValue={deal.name}
        colorPalette={available ? "blue" : "gray"}
      >
        <Radio value={deal.name} disabled>
          {
            deal?.requirements[0]?.type == "spend" ? `Spend $${deal.requirements[0].amount} on ${deal.tags.map((tag: string) => tag).join(", ")}` : `Buy ${deal.requirements[0].amount} related to ${deal.tags.map((tag: string) => tag).join(", ")}`
          }
        </Radio>
      </RadioGroup>
    </>
  )
}