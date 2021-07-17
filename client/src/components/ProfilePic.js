import { Link as ChakraLink, Flex, Button, Heading, VStack, HStack } from "@chakra-ui/react";
import { Container } from "../components/Container";
import axios from "axios";
import { useState } from "react";
import React from "react"
import { Box, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";

export default function ProfilePic(props) {
	render() {
    const profile = this.props;
  	return (
    	<div>
        <Flex justifyContent="center" alignItems="center">
            <VStack>
                <Box>
                    <Heading
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
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