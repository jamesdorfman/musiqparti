import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Container } from "../components/Container";
import { Heading, Text, Flex } from "@chakra-ui/layout";
import MatchingUser from "../components/matchinguser";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

const afterMatch = () => {
  const [users, setUsers] = useState({ data: [] });

  useEffect(() => {
    const fetchData2 = async () => {
      await axios
        .get(
          // HERE IS FOR list of users
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/match`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data.results);
          setUsers({ data: res.data.results });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData2();
  }, []);

  return (
    <>
      <Container height="100%">
        <div style={{ marginTop: "100px", textAlign: "center" }}>
          <Heading
            fontSize="5vw"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
          >
            Matched Users
          </Heading>
          {console.log(users)}
          <Heading fontSize="2vw" as="i">
            Other Users with Similar Playlists:
          </Heading>
          <Flex justify="center" marginTop="25px" direction={"column"}>
            {users.data.map((user) => (
              // <li>{filteredPlaylist.name}</li>
              <Flex
                style={{ alignContent: "center" }}
                //   align="center"
                // justify="center"
                justify="center"
              >
                {console.log(user)}
                <MatchingUser
                  key={user.id}
                  image={
                    user.spotify.images[0] ? user.spotify.images[0].url : null
                  }
                  name={user.spotify.display_name}
                  link={user.spotify.external_urls.spotify}
                  playlistLink={user.user.playlistId}
                />
              </Flex>
            ))}
          </Flex>
        </div>
        <DarkModeSwitch />
      </Container>
    </>
  );
};

export default afterMatch;
