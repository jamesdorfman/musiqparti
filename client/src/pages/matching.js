import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Container } from "../components/Container";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import styles from "./matching.module.css";
import {
  Heading,
  Text,
  Flex,
  Button,
  filter,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  RadioGroup,
  HStack,
  Radio,
  Center,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import Playlist from "../components/playlist";

/*   <Text>Next + Chakra + Spotify</Text> 
<div className={styles.test}>
            <h1>Hello </h1>
          </div>
          


          <Playlist playlist={playlist} />
          {console.log(playlist)}
          */
const Matching = () => {
  const [user, setUser] = useState({});

  const [playlist, setPlaylist] = useState({ data: [] });
  const [actualPlaylist, setActualPlaylist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios(
        // HERE IS FOR SPECIFCIC PLAYLIST
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/me`,
        {
          withCredentials: true,
        }
      )
        .then((result) => {
          console.log(result.data.playlists.items);
          setPlaylist({ data: result.data.playlists.items });
          setUser(result.data.spotify.id);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  console.log(playlist);
  console.log(playlist.data);

  const filterPlaylist = () => {
    console.log(playlist.data);
    const filterP = playlist.data.filter(
      (playlist) => playlist.owner.id == "52rm80r6w3tl1s1alav0dhytv"
    );
    console.log(filterP);
    setPlaylist({ data: filterP });

    console.log(playlist.data);
  };

  return (
    <>
      <Container>
        <div style={{ marginTop: "100px", textAlign: "center" }}>
          <Heading
            fontSize="5vw"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
          >
            List of Playlists
          </Heading>
          <Heading fontSize="2vw" as="i">
            Pick a playlist to match with another user
          </Heading>
        </div>
        {console.log(playlist)}
        {console.log(playlist.data)}
        {console.log(actualPlaylist)}

        <FormControl as="fieldset">
          <Flex marginTop="25px" justify="center" direction={"column"}>
            {playlist.data.map((filteredPlaylist) => (
              // <li>{filteredPlaylist.name}</li>
              <Flex
                style={{ alignContent: "center" }}
                //   align="center"
                // justify="center"
                justify="center"
              >
                <Playlist
                  playlist={filteredPlaylist}
                  image={filteredPlaylist.images[0].url}
                />
              </Flex>
            ))}
          </Flex>
        </FormControl>

        <Box>
          <DarkModeSwitch />
        </Box>
      </Container>
    </>
  );
};

export default Matching;
