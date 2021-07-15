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
  // const [user, setUser] = useState({});

  //console.log(props);

  const [playlist, setPlaylist] = useState({ data: [] });
  const [actualPlaylist, setActualPlaylist] = useState([]);

  /*
  useEffect(() => {
    // GET request using axios inside useEffect React hook
    // TEMP SET TO MY ACCOUNT ID!
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/info/52rm80r6w3tl1s1alav0dhytv`
      )
      // response.data.total
      .then((response) => setPlaylist(response.data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  console.log(playlist); */

  /*
  useEffect(() => {
    getAllPlaylist();
  }, []);

  const getAllPlaylist = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/info/52rm80r6w3tl1s1alav0dhytv`
      )
      .then((response) => {
        const allPlaylist = response.data;
        setPlaylist(allPlaylist);
        console.log("yes it workewd");
      })
      .catch((error) => console.error(`Error: ${error}`));
  }; 
  
  my user id: 52rm80r6w3tl1s1alav0dhytv

  {playlist.items
              .filter((playlist) => playlist.owner.id == `${user}`)
              .map((filteredPlaylist) => (
                <li>{filteredPlaylist.name}</li>
              ))}

  */

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/info/52rm80r6w3tl1s1alav0dhytv`,
        {
          withCredentials: true,
        }
      );
      //   setPlaylist(result.data.playlists);
      console.log(result.data.playlists.items);
      setPlaylist({ data: result.data.playlists.items });

      //  filterPlaylist();
      // setActualPlaylist(playlist.items);
    };

    /* const { data } = getQueryParams(window.location.search);
    setUser(data);
    console.log(user); */

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

    /* playlist.filter(
      (playlist) => playlist.owner.id == "52rm80r6w3tl1s1alav0dhytv"
    ); */
    console.log(playlist.data);
  };
  //console.log(playlist);
  // console.log(playlist.length);
  /*    <ul>
            {playlist.items
              .filter(
                (playlist) => playlist.owner.id == "52rm80r6w3tl1s1alav0dhytv"
              )
              .map((filteredPlaylist) => (
                <li>{filteredPlaylist.name}</li>
              ))}
          </ul> */
  /* <div>
          {actualPlaylist
            .filter(
              (playlist) => playlist.owner.id == "52rm80r6w3tl1s1alav0dhytv"
            )
            .map((filteredPlaylist) => (
              <li>{filteredPlaylist.name}</li>
            ))}
        </div> */

  /* orig buttons:
        <Button
            m={4}
            onClick={async () => {
              const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/user/info/52rm80r6w3tl1s1alav0dhytv`,
                {
                  withCredentials: true,
                }
              );
              setPlaylist(data);
            }}
          ></Button>

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
          ></Button> */
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
          <Flex justify="center">
            <RadioGroup defaultValue="1" align="left">
              {playlist.data.map((filteredPlaylist) => (
                // <li>{filteredPlaylist.name}</li>
                <Flex
                  style={{ alignContent: "center" }}
                  //   align="center"
                  // justify="center"
                >
                  <Playlist
                    playlist={filteredPlaylist}
                    image={filteredPlaylist.images[0].url}
                  />
                </Flex>
              ))}
            </RadioGroup>
          </Flex>
        </FormControl>

        <Button>Submit</Button>
        <Box bg="#E2E8F0">
          <DarkModeSwitch />
        </Box>
      </Container>
    </>
  );
};

export default Matching;
