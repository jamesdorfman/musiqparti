import { Link as ChakraLink, Flex, Button, Heading } from "@chakra-ui/react";
import { Container } from "../components/Container";
import axios from "axios";
import { useState } from "react";
import getConfig from "next/config";

const Index = (props) => {
  const [user, setUser] = useState({});

  console.log(user);

  return (
    <Container height="100vh">
      <Flex justifyContent="center" alignItems="center">
        <Heading
          fontSize="10vw"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
        >
          Login With Spotify
        </Heading>
      </Flex>
      <Flex>
        <ChakraLink m={4} href={`${props.SERVER_URL}/spotify/login`}>
          <Button as={ChakraLink}>Login</Button>
        </ChakraLink>
        <Button
          m={4}
          onClick={async () => {
            const { data } = await axios.get(
              `${props.SERVER_URL}/spotify/hello`,
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
              await axios.get(`${props.SERVER_URL}/spotify/logout`, {
                withCredentials: true,
              });
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
    </Container>
  );
};

export async function getStaticProps() {
  const { publicRuntimeConfig } = getConfig();
  const SERVER_URL = publicRuntimeConfig.SERVER_URL;

  return {
    props: {
      SERVER_URL: SERVER_URL
    },
  }
}


export default Index;