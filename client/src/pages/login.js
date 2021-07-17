import { Link as ChakraLink, Flex, Button, Heading } from "@chakra-ui/react";
import { Container } from "../components/Container";
import axios from "axios";
import { useState } from "react";
import NextLink from "next/link";
import { DarkModeSwitch } from "../components/DarkModeSwitch";

const Index = () => {
  const [user, setUser] = useState({});
  /* <Flex>
              <Button>Head To Matching</Button>

              <NextLink
                href={{
                  pathname: "/matching",
                  query: { data: JSON.stringify(user.id) },
                }}
                passHref
              >
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Matching"
                  my={5}
                  w="100%"
                >
                  Matching
                </Button>
              </NextLink>
            </Flex>
            */

  console.log(user);

  return (
    <Container height="100%">
      <Flex
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "100px", textAlign: "center" }}
      >
        <Heading
          fontSize="10vw"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
        >
          Login With Spotify
        </Heading>
      </Flex>
      <Flex>
        <ChakraLink m={4} href={process.env.NEXT_PUBLIC_AUTH_URL}>
          <Button>Login</Button>
        </ChakraLink>

        <Button
          m={4}
          onClick={async () => {
            const { data } = await axios.get(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/spotify/hello`,
              {
                withCredentials: true,
              }
            );
            setUser(data);
          }}
        >
          Get Info
        </Button>
        {user.id ? (
          <Button
            m={4}
            onClick={async () => {
              await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/spotify/logout`,
                {
                  withCredentials: true,
                }
              );
              setUser({});
            }}
          >
            Logout
          </Button>
        ) : (
          <></>
        )}
      </Flex>

      {user.id ? (
        <>
          <h1>Logged in as {user.display_name}</h1>
          <div>
            <div>
              <img width="150" src={user.images[0].url} />
            </div>
            <div>
              <dl>
                <dt>Display name</dt>
                <dd>{user.display_name}</dd>
                <dt>Id</dt>
                <dd>{user.id}</dd>
                <dt>Email</dt>
                <dd>{user.email}</dd>
                <dt>Spotify URI</dt>
                <dd>
                  <a href={user.external_urls.spotify}>
                    {user.external_urls.spotify}
                  </a>
                </dd>
                <dt>Link</dt>
                <dd>
                  <a href={user.href}>{user.href}</a>
                </dd>
                <dt>Profile Image</dt>
                <dd>
                  <a href={user.images[0].url}>{user.images[0].url}</a>
                </dd>
                <dt>Country</dt>
                <dd>{user.country}</dd>
              </dl>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <DarkModeSwitch />
    </Container>
  );
};

export default Index;
