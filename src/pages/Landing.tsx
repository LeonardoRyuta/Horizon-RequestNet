import { Heading, Text, Button } from "@chakra-ui/react";
import { useState } from 'react'

export default function Landing() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Heading>Horizon</Heading>
      <Text>Count: {count}</Text>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
    </>
  )
}