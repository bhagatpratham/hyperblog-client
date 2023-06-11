/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router";
import SocialSignIn from "./auth/SocialSignIn";
import {
  Button,
  Center,
  Container,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  chakra,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Link,
  LinkBox,
  LinkOverlay,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Container maxW={"container.xl"}>
        <Text
          width={"100"}
          textAlign={"start"}
          ml={12}
          fontSize="28.73px"
          color={"blue.700"}
        >
          HyperBlog
        </Text>
        <Button m={4} colorScheme="brand" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button m={4} colorScheme="brand" onClick={() => navigate("/signup")}>
          Signup
        </Button>
        <SocialSignIn />
      </Container>
      <Container maxW="container.lg">
        <Center p={2} minHeight="70vh">
          <VStack>
            <Container maxW="container.md" textAlign="center">
              <Heading size="xl" mb={4} color="gray.700">
                Ship Your Blogs 10X Faster With AI
              </Heading>

              <Text fontSize="xl" color="gray.500">
                Be the first one to experience future of writing with our AI
                powered Auto writer
              </Text>

              <Button
                mt={8}
                colorScheme="brand"
                onClick={() => {
                  window.open("", "_blank");
                }}
              >
                I need this for $19/month →
              </Button>

              <Text my={2} fontSize="sm" color="gray.500">
                108+ writers have signed up in the last 30 days
              </Text>
              <Image src="src/assets/Editor.jpeg" alt="editor" />
            </Container>
          </VStack>
        </Center>
      </Container>
    </div>
  );
};

export default LandingPage;
