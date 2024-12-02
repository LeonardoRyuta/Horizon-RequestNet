import { VStack, Tabs, HStack, Heading } from "@chakra-ui/react";
import Available from "./Available";
import Others from "./Others";
import History from "./History";

export default function Landing() {
  const tabs: { [key: string]: JSX.Element } = {
    "Available Deals": <Available/>,
    "Others": <Others/>,
    "History": <History />
  }

  return (
    <VStack w="full" h="full" alignItems="flex-start">
      <HStack w="full" justifyContent="center">
        <Heading>Horizon</Heading>
      </HStack>
      <Tabs.Root defaultValue="members" variant={"enclosed"} fitted w="full">
        <Tabs.List fontSize="0.7rem">
          {Object.keys(tabs).map((tab: string) => {
            console.log(tab)
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