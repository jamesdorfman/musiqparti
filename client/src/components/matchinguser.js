import {
  Image,
  Radio,
  Text,
  Heading,
  Box,
  Center,
  Button,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export default function MatchingUser(props) {
  return (
    /*
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
            src={props.image}
          />
          <div style={{ display: "block", marginLeft: "20px" }}>
            <Heading as="h4" size="lg">
              {props.name}
            </Heading>

            <NextLink href={props.link}>
              <Button>
                {" "}
                <ExternalLinkIcon w={6} h={6} />
              </Button>
            </NextLink>
          </div>
        </div>
      </Box>
    </>
  );
}
