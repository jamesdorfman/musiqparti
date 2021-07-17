import {
  Image,
  Radio,
  Text,
  Heading,
  Box,
  Center,
  Button,
  Flex,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useRouter } from "next/router";

export default function MatchingUser(props) {
  const router = useRouter();
  const spotifyURL =
    "https://open.spotify.com/embed/playlist/" + props.playlistLink;
  return (
    /*
     <Heading as="h5" size="md">
              {props.playlistTitle}
            </Heading>
     */
    <>
      <Box
        //      bg="#F7FAFC"
        align="left"
        w="800px"
        p={4}
        borderWidth="1px"
        borderRadius="2xl"
        style={{ display: "inline-block", alignContent: "center" }}
        boxShadow="lg"
        rounded="md"
      >
        <div style={{ display: "inline-flex" }}>
          <Image
            borderRadius="full"
            boxSize="150px"
            objectFit="cover"
            _hover={{ cursor: "pointer" }}
            src={
              props.image
                ? props.image
                : "https://www.freepnglogos.com/uploads/spotify-logo-png/image-gallery-spotify-logo-21.png"
            }
            onClick={() => {
              router.push(`/user/${props.id}`);
            }}
          />
          <div style={{ display: "block", marginLeft: "20px" }}>
            <Flex marginBottom="2px">
              <Heading pr={4} as="h4" size="lg">
                {props.name}
              </Heading>
              <NextLink href={props.link}>
                <Button>
                  {" "}
                  <ExternalLinkIcon w={6} h={6} />
                </Button>
              </NextLink>
            </Flex>

            <iframe
              src={spotifyURL}
              width="600"
              height="200"
              frameBorder="0"
              // allowTransparency="true"
              allow="encrypted-media"
            ></iframe>
          </div>
        </div>
      </Box>
    </>
  );
}
