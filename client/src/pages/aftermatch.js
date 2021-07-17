import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Container } from "../components/Container";
import { Heading, Text, Flex } from "@chakra-ui/layout";
import MatchingUser from "../components/matchinguser";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
// import user from "../../../server/src/model/user";

const afterMatch = () => {
  //    <Heading fontSize="2vw" as="i">
  //  Pick a playlist to match with another user
  //  </Heading>
  const [users, setUsers] = useState({ data: [] });

  // user/match -> axios.get

  useEffect(() => {
    const fetchData2 = async () => {
      await axios(
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
      //   setPlaylist(result.data.playlists);

      //    setUsers({ data: result.data.results });
      // console.log(users);
      // console.log(users);
      //  filterPlaylist();
      // setActualPlaylist(playlist.items);
    };

    /* const { data } = getQueryParams(window.location.search);
    setUser(data);
    console.log(user); */

    fetchData2();
  }, []);
  /*  {!users
              ? null
              : users.data.forEach((user) => {
                  {
                    user.user.bio;
                  }
                })}





                     {!users
              ? null
              : users.data.forEach((user) => {
                  <MatchingUser
                    image={user.spotify.images[0].url}
                    name={user.spotify.display_name}
                    link={user.spotify.external_urls.spotify}
                    playlistLink={user.user.playlistId}
                  />;
                })}
                */

  /*  <MatchingUser
              image="https://i.scdn.co/image/ab6775700000ee8543a1eed0faa8d57da8f1d0a6"
              name="julianne"
              link="https://open.spotify.com/user/52rm80r6w3tl1s1alav0dhytv"
              playlistTitle="bops"
              playlistLink="6qI6Ua3Q9nxXSGzgDRwYcC"
            />
            <MatchingUser
              image="https://i.scdn.co/image/ab6775700000ee850c04a33b51c3b54530500768"
              name="Joshua Reyes"
              link="https://open.spotify.com/user/0oc2yixjx7u1gvzua75lihhgp?si=23b2886cbadc48d3"
              playlistTitle="vibin w depression"
              playlistLink="02jg3VT4yZzpTogwhVNqyB"
            />
            <MatchingUser
              image="https://i.scdn.co/image/ab6775700000ee85b84c0699af0a986800590e75"
              name="markbaula_"
              link="https://open.spotify.com/user/5ce3we8ofk40z5cbknivma2kv?si=8a86910b19a44648"
              playlistTitle="sad boi hours"
              playlistLink="77Qr6NxdDVCa5Al8Hsh7oc"
            />
            */

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
                  image={
                    user.spotify.images[0] ? user.spotify.images[0].url : null
                  }
                  name={user.spotify.display_name}
                  link={user.spotify.external_urls.spotify}
                  playlistLink={user.user.playlistId}
                />
                ;
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
