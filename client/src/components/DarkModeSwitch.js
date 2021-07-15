/* import { useColorMode, Switch } from '@chakra-ui/react'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Switch
      position="fixed"
      top="1rem"
      right="1rem"
      color="green"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  )
} */
import { useState } from "react";
import {
  useColorMode,
  Switch,
  Flex,
  Button,
  IconButton,
  Heading,
  Box,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [display, changeDisplay] = useState("none");
  return (
    <Flex>
      <Box style={{ backgroundColor: "#E2E8F0" }}>
        <Flex position="fixed" top="1rem" right="1rem" align="center">
          <Heading
            fontSize="2.5vw"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            position="fixed"
            left="2%"
          >
            musicparti
          </Heading>

          {/* Desktop */}
          <Flex display={["none", "none", "flex", "flex"]}>
            <NextLink href="/matching" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="matching"
                my={5}
                w="100%"
              >
                Matching
              </Button>
            </NextLink>

            <NextLink href="/login" passHref>
              <Button as="a" variant="ghost" aria-label="Login" my={5} w="100%">
                Login
              </Button>
            </NextLink>

            <NextLink href="/aftermatch" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Profile"
                my={5}
                w="100%"
              >
                Profile
              </Button>
            </NextLink>
          </Flex>

          {/* Mobile */}
          <IconButton
            aria-label="Open Menu"
            size="lg"
            mr={2}
            icon={<HamburgerIcon />}
            onClick={() => changeDisplay("flex")}
            display={["flex", "flex", "none", "none"]}
          />
          <Switch color="green" isChecked={isDark} onChange={toggleColorMode} />
        </Flex>

        {/* Mobile Content */}
        <Flex
          w="100vw"
          display={display}
          bgColor="gray.50"
          zIndex={20}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          zIndex={20}
          overflowY="auto"
          flexDir="column"
        >
          <Flex justify="flex-end">
            <IconButton
              mt={2}
              mr={2}
              aria-label="Open Menu"
              size="lg"
              icon={<CloseIcon />}
              onClick={() => changeDisplay("none")}
            />
          </Flex>

          <Flex flexDir="column" align="center">
            <NextLink href="/" passHref>
              <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
                Home
              </Button>
            </NextLink>

            <NextLink href="/about" passHref>
              <Button as="a" variant="ghost" aria-label="About" my={5} w="100%">
                About
              </Button>
            </NextLink>

            <NextLink href="/contact" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                Contact
              </Button>
            </NextLink>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
