import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

const Index = () => {
  const { data, error, isLoading } = useQuery("hello", () => {
    return axios.get("http://localhost:5000/spotify/hello");
  });
  const router = useRouter();

  if (error) {
    console.log("error");
    return <Text>error</Text>;
  }

  if (isLoading) {
    return <Text>loading...</Text>;
  }

  if (!data) {
    return <Text>no data...</Text>;
  }

  console.log(data);
  console.log(router);

  return (
    <Container height="100vh">
      <Hero />
      <Main>
        <Text>
          Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code>.{" "}
        </Text>

        {/* This is a sample api call */}
        <Text>API Test: hello {data.data.hello}</Text>

        <List spacing={3} my={0}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <ChakraLink
              isExternal
              href="https://chakra-ui.com"
              flexGrow={1}
              mr={2}
            >
              Chakra UI <LinkIcon />
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <ChakraLink
              isExternal
              href="https://nextjs.org"
              flexGrow={1}
              mr={2}
            >
              Next.js <LinkIcon />
            </ChakraLink>
          </ListItem>
        </List>
      </Main>

      <DarkModeSwitch />
      <Footer>
        <Text>Next + Chakra + Spotify</Text>
      </Footer>
      <CTA />
    </Container>
  );
};

export default Index;
