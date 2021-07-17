import { useRouter } from "next/router";
import {
  Link as ChakraLink,
  Flex,
  Button,
  Heading,
  VStack,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import React from "react";
import {
  Box,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { Container } from "../../components/Container";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";

const PlaylistList = (props) => {
  return (
    <Box p={4}>
      {props.items.map((playlist) => (
        <PlaylistEmbed {...playlist} />
      ))}
    </Box>
  );
};

class PlaylistEmbed extends React.Component {
  render() {
    const playlist = this.props;
    const source = "https://open.spotify.com/embed/playlist/" + playlist.id;
    return (
      <div className="embed-Playlist">
        <iframe
          src={source}
          width="300"
          height="380"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      </div>
    );
  }
}

class ProfilePic extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div>
        <Flex justifyContent="center" alignItems="center">
          <VStack>
            <Box>
              <Heading
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
              >
                {profile.display_name}
              </Heading>
            </Box>
            <Box>
              <Image
                borderRadius="full"
                boxSize="150"
                src={profile.images[0].url}
                alt="userProfile"
              />
            </Box>
          </VStack>
        </Flex>
      </div>
    );
  }
}

// value for number of playlists is currently hardccoded, bio is hardcoded,, consider how to edit bio
class UserDetails extends React.Component {
  render() {
    const profile = this.props;
    console.log("user");
    console.log(profile);
    return (
      <div>
        <Flex justifyContent="center" alignItems="center">
          <VStack>
            <HStack spacing="24px">
              <Box>
                <VStack>
                  <Box>
                    <Text>PLAYLISTS: {profile.playlistLength}</Text>
                  </Box>
                </VStack>
              </Box>
            </HStack>
            <Flex>
              <Box>
                <Editable
                  defaultValue={profile.bio}
                  onSubmit={async (value) => {
                    await axios
                      .patch(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/bio`,
                        {
                          bio: value,
                        },
                        { withCredentials: true }
                      )
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Box>
            </Flex>
          </VStack>
        </Flex>
      </div>
    );
  }
}

const User = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const [playlists, setPlaylists] = useState({});
  const bgColor = { light: "gray.100", dark: "gray.800" };

  useEffect(async () => {
    await axios(
      // HERE IS FOR SPECIFCIC PLAYLIST
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/info/${id}`,
      {
        withCredentials: true,
      }
    )
      .then((result) => {
        setUser(result.data.spotify);
        setUserData(result.data.user);
        setPlaylists(result.data.playlists);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <Container height="auto">
      <Box bg={bgColor[colorMode]} p={10}>
        {user.id && playlists.items ? (
          <>
            <Flex justifyContent="center" alignItems="center">
              <VStack>
                <Box>
                  <ProfilePic {...user} />
                </Box>
                <Box>
                  <UserDetails
                    {...user}
                    {...userData}
                    playlistLength={playlists.items.length}
                  />
                </Box>
                <Box>
                  <PlaylistList {...playlists} />
                </Box>
              </VStack>
            </Flex>
          </>
        ) : (
          <Heading>No one here...</Heading>
        )}
      </Box>
      <Box>
        <DarkModeSwitch />
      </Box>
    </Container>
  );
};

export default User;
