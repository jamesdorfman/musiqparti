import { Link as ChakraLink, Flex, Button, Heading, VStack, HStack } from "@chakra-ui/react";
import { Container } from "../components/Container";
import axios from "axios";
import { useState } from "react";
import React from "react"
import { Box, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";

// const testData = [
//     {image="https://i.scdn.co/image/ab6775700000ee8543a1eed0faa8d57da8f1d0a6",
//     name="julianne",
//     link="https://open.spotify.com/user/52rm80r6w3tl1s1alav0dhytv",
//     playlistTitle="bops",
//     playlistLink="6qI6Ua3Q9nxXSGzgDRwYcC"},
// ];

const playlistData = [
    {playlistName: "BEST INTEREST",
    pURL: "https://open.spotify.com/playlist/408Eh050EvRUQef0UrT9wp",
    pid: "408Eh050EvRUQef0UrT9wp"},
    {playlistName: "Weeb",
    pURL: "https://open.spotify.com/playlist/6WD6AkwEi8ggAIW6TMg1wX",
    pid:"6WD6AkwEi8ggAIW6TMg1wX"},
    {playlistName: "<3",
    pURL: "https://open.spotify.com/playlist/39flI0e3UW9g7Qg6hQihWE",
    pid: "39flI0e3UW9g7Qg6hQihWE"},
    {playlistName: "danngggg",
    pURL: "https://open.spotify.com/playlist/0R9aINeI6uAEnDyxuqWKNR",
    pid: "0R9aINeI6uAEnDyxuqWKNR"},
    {playlistName: "angst ✨",
    pURL: "https://open.spotify.com/playlist/3CGLRPtW27kcXpNPQIgKQw",
    pid: "3CGLRPtW27kcXpNPQIgKQw"},
];


const PlaylistList = (props) => (
	<div>
  	    {playlistData.map(playlist => <PlaylistEmbed {...playlist}/>)}
	</div>
);

class PlaylistEmbed extends React.Component {
	render() {
  	const playlist = this.props;
    const source = "https://open.spotify.com/embed/playlist/" + playlist.pid;
  	return (
    	<div className="embed-Playlist">
    	  <iframe src={source} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
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
                    fontSize="3vw"
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    bgClip="text">
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


function LikeButton(props) {
    const handleClick = () => 
    {{props.changeIncrement();
     props.changeCounter(props.liked);}};
        return (
          <Button 
              onClick={handleClick}>
              {props.liked}
          </Button>
      );
}
  
function DisplayLikes(props) {
      return (
          <div>{props.message}</div>
      );
}
  
  
function Likes(props) {
      const [counter, setCounter] = useState(100); // currently hardcoded find way to retrieve the user's likes
      const [increment, setIncrement] = useState(1);
      const toggleLike = () => setIncrement(-1 * increment);
      const incrementCounter = (incrementValue) => setCounter(counter+incrementValue);
      return(
          <div>
              <HStack>
                <LikeButton changeIncrement={toggleLike} changeCounter={incrementCounter} liked={increment} currentLikes={counter} />
                <VStack>
                    <Box><DisplayLikes message={counter}/></Box>
                    <Box><h1>LIKES</h1></Box>
                </VStack>
              </HStack>
          </div>
      );
      
}
  
// value for number of playlists is currently hardccoded, bio is hardcoded,, consider how to edit bio
class UserDetails extends React.Component {
	render() {
    const profile = this.props;
  	return (
    	<div>
        <Flex justifyContent="center" alignItems="center">
            <VStack>
                <HStack spacing="24px">
                <Box>
                    <Likes />
                </Box>
                <Box>
                    <VStack>
                        <Box classname="stat-playlist"><h1>10</h1></Box> 
                        <Box><h1>PLAYLISTS</h1></Box>
                    </VStack>
                </Box>                
            </HStack>
            <Box><h1 classname="bio">Hello, nice to meet you! This is my bio</h1></Box>
            </VStack>
        </Flex>
    	</div>
    );
  }	
}


const Index = () => {
  const [user, setUser] = useState({});

  console.log(user);

  return (
    <Container height="auto" centerContent>
      <Flex justifyContent="center" alignItems="center">
        <Heading
          fontSize="10vw"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
        >
          Profile
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
          View Profile
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
        <Box bg="gray.800"
             p={10}>
            {user.id ? (
                <>
                <Flex justifyContent="center" alignItems="center">
                <VStack>
                <Box>
                    <ProfilePic {...user}/>
                </Box>
                <Box>
                    <UserDetails {...user}/>
                </Box>
                <Box>
                    <PlaylistList />
                </Box>
                <div>
                
                    <div>
                    <Box>
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
                    </Box>
                    </div>
                </div>
                </VStack>
                </Flex>
                </>
            ) : (
                <></>
            )}
        </Box>
    </Container>
  );
};

export default Index;
