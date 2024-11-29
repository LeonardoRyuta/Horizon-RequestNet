import { Outlet } from "react-router";
// import Navbar from "./Navbar";
import { VStack } from "@chakra-ui/react";

export default function Layout() {
  return (
    <VStack
      w="300px"
      h="500px"
      p="2rem"
      border="2px solid white"
    >
      {/* <Navbar /> */}
      <Outlet />
    </VStack>
  );
}