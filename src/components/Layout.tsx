import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { VStack } from "@chakra-ui/react";

export default function Layout() {
  return (
    <VStack h="vh" w="vw">
      <Navbar />
      <Outlet />
    </VStack>
  );
}