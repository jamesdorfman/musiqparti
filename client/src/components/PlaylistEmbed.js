import { Link as ChakraLink, Flex, Button, Heading, VStack, HStack } from "@chakra-ui/react";
import { Container } from "../components/Container";
import axios from "axios";
import { useState } from "react";
import React from "react"
import { Box, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";

export default function PlaylistEmbed(props) {
	
  //	const playlist = this.props;
    const source = "https://open.spotify.com/embed/playlist/" + props.playlist;
  	return (
    	<div className="embed-Playlist">
    	  <iframe src={source} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    	</div>
    );
  }
