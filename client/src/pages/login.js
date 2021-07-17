import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  createIcon,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Container } from "../components/Container";

const Index = () => {
  return (
    <>
      <Container height="100%">
        <Box>
          {" "}
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}
          >
            <Heading
              // color={"white"}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
            >
              Welcome to <br />
              <Text
                as={"span"}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
              >
                MusiqParti!
              </Text>
            </Heading>
            <Text>
              A platform to connect users based on their music preference
              <Text>
                Login with Spotify and match with other users based on your
                playlists similarity
              </Text>
            </Text>
            <Stack
              direction={"column"}
              spacing={3}
              align={"center"}
              alignSelf={"center"}
              position={"relative"}
            >
              <ChakraLink m={4} href={process.env.NEXT_PUBLIC_AUTH_URL}>
                <Button
                  colorScheme={"white"}
                  bg={"green.300"}
                  rounded={"full"}
                  px={6}
                  size="lg"
                  _hover={{
                    bgGradient: "linear(to-l, #7928CA, #FF0080)",
                  }}
                >
                  <Text>Login With Spotify</Text>
                </Button>
              </ChakraLink>
            </Stack>
          </Stack>
        </Box>
        <Box>
          <DarkModeSwitch />
        </Box>
      </Container>
    </>
  );
};

export default Index;
