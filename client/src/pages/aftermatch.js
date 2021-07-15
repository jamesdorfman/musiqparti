import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Container } from "../components/Container";
import { Heading, Text, Flex, Button } from "@chakra-ui/layout";
import MatchingUser from "../components/matchinguser";

const afterMatch = () => {
  return (
    //    <Heading fontSize="2vw" as="i">
    //  Pick a playlist to match with another user
    //  </Heading>
    <>
      <Container>
        <div style={{ marginTop: "100px", textAlign: "center" }}>
          <Heading
            fontSize="5vw"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
          >
            Matched Users
          </Heading>
          <Heading fontSize="2vw" as="i">
            Other Users with Similar Playlists:
          </Heading>
          <Flex justify="center">
            <MatchingUser
              image="https://i.scdn.co/image/ab6775700000ee8543a1eed0faa8d57da8f1d0a6"
              name="julianne"
              link="https://open.spotify.com/user/52rm80r6w3tl1s1alav0dhytv"
            />
          </Flex>
        </div>
        <DarkModeSwitch />
      </Container>
    </>
  );
};

export default afterMatch;
