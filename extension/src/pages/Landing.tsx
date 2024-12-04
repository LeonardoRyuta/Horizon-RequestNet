/* eslint-disable @typescript-eslint/no-unused-vars */
import { VStack, Tabs, HStack, Heading } from "@chakra-ui/react";
import Available from "./Available";
import Others from "./Others";
import History from "./History";
import { requestNet, mockData } from "@/utils";
import { IRequestDataWithEvents } from "@requestnetwork/request-client.js/dist/types";
import { useEffect, useState } from "react";

export default function Landing() {
  const [txs, setTxs] = useState<any[]>([])

  const tabs: { [key: string]: JSX.Element } = {
    "Available Deals": <Available deals={mockData.deals} txs={txs} />,
    "Others": <Others deals={mockData.deals} />,
    "History": <History txs={txs} />
  }

  const getTxs = async () => {
    const rntxs: IRequestDataWithEvents[] = await requestNet.getRequestsByWalletAddress("0x2346ac3Bc15656D4dE1da99384B5498A75f128a2")
    const temp: any = [];

    rntxs.forEach((tx: IRequestDataWithEvents) => {
      try {
        const json = JSON.parse(tx.contentData.invoiceItems[0].name)

        const formattedTx = {
          id: tx.requestId,
          name: json.name,
          image: json.image,
          description: json.description,
          time: tx.timestamp,
          price: tx.contentData.miscellaneous.amountInUSD,
          tags: json.tags.split(","),
        }

        //check if tx is already in txs
        if (!txs.some((existingTx) => existingTx.id === formattedTx.id)) {
          temp.push(formattedTx)
        }
       
      } catch (e) {
        //do nothing

      }
    })
    
    temp.sort((a: any, b: any) => b.time - a.time)

    setTxs([...txs, ...temp])
  }

  useState(() => {
    getTxs()
  })

  return (
    <VStack w="full" h="full" alignItems="flex-start">
      <HStack w="full" justifyContent="center">
        <Heading>Horizon</Heading>
      </HStack>
      <Tabs.Root defaultValue="Available Deals" variant={"enclosed"} fitted w="full">
        <Tabs.List fontSize="0.7rem">
          {Object.keys(tabs).map((tab: string) => {
            return (
            <Tabs.Trigger key={tab} value={tab} p={1} h="auto">
              {tab}
            </Tabs.Trigger>
          )})}
        </Tabs.List>
        {Object.keys(tabs).map((tab) => {
          return (
            <Tabs.Content key={tab} value={tab}>
              {tabs[tab]}
            </Tabs.Content>
          )
        })}
      </Tabs.Root>
    </VStack>
  )
}