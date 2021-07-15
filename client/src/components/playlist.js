import { Image, Radio, Text, Heading, Box, Center } from "@chakra-ui/react";
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
        <Radio>
          <div style={{ display: "inline-flex" }}>
            <Image
              borderRadius="full"
              boxSize="150px"
              objectFit="cover"
              src={props.image}
            />
            <div>
              <Heading as="h4" size="md">
                {props.playlist.name}
              </Heading>

              <Text>{props.playlist.description}</Text>
            </div>
          </div>
        </Radio>
      </Box>
    </>
  );
}
