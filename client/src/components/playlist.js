import {
  Image,
  Radio,
  Text,
  Heading,
  Box,
  Center,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import NextLink from "next/link";
export default function Playlist(props) {
  console.log(props.playlist);
  return (
    <>
      <Box
        //      bg="#F7FAFC"
        w="800px"
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        style={{ display: "inline-block", alignContent: "center" }}
        boxShadow="lg"
        rounded="md"
      >
        <div style={{ display: "inline-flex" }}>
          <Image
            borderRadius="full"
            boxSize="150px"
            objectFit="cover"
            src={props.image}
          />
          <div style={{ marginLeft: "25px", marginTop: "10px" }}>
            <Heading as="h4" size="md">
              {props.playlist.name}
            </Heading>

            <Text>{props.playlist.description}</Text>
            <NextLink href="/aftermatch" passHref>
              <Button
                onClick={async () => {
                  await axios
                    .patch(
                      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/playlist`,
                      {
                        playlistId: props.playlist.id,
                      },
                      { withCredentials: true }
                    )
                    .then(() => {
                      console.log("success!!!");
                    })
                    .catch((error) => {
                      // throw error;
                      console.log(error);
                    });
                  //  console.log(res);
                }}
              >
                Select this playlist
              </Button>
            </NextLink>
          </div>
        </div>
      </Box>
    </>
  );
}
