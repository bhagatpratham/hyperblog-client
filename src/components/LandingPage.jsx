/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router";
import SocialSignIn from "./auth/SocialSignIn";
import FileUploader from "../FileUploader"
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
import NavBar from "./NavBar";
import Features from "./LandingPage/Features";
import Pricing from "./LandingPage/Pricing";
import FAQs from "./LandingPage/FAQS";
import Footer from "./LandingPage/Footer";
import Home from "./Home";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar /> 
  
      <Container maxW="container.lg">
        <Center p={8} minHeight="70vh">
          <VStack>
            <Container maxW="container.md" textAlign="center">
            <Heading size="xl" mb={4} color="gray.700">
      Ship Your Blogs{" "}
      <Box
        display="inline-block"
        p={2}
        color="white"
      > 
        <Box 
          border={"none"}
          background = "linear-gradient(89.91deg, #1596DF 56.12%, #BC00CC 99.92%)" 
          backgroundClip={"text"}
          textColor={"transparent"}
          >
            
          10X Faster With AI
        </Box>
        
      </Box> 
    </Heading>

              <Text fontSize="xl" color="gray.500">
              HyperBlog.me simplifies article writing with just a few clicks. (See demo below.)
              </Text>

              <Button
                mt={8}
                colorScheme="brand"
                onClick={() => {
                  window.open("", "_blank");
                }}
              >
                Grab for $49/ Lifetime access → 
              </Button>

              <Text my={2} fontSize="sm" color="gray.500">
                108+ writers have signed up in the last 30 days
              </Text>
              <Image src="src/assets/Editor.jpeg" alt="editor" />
              <Box
                position="absolute"
                width="900px"
                height="141px"
                left="calc(50% - 1004px/2)"
                top="1045px"
                fontWeight="bold"
                fontSize="26px"
                lineHeight="47px"
                display="flex"
                alignItems="center"
                textAlign="center"
                letterSpacing="-0.004em"
                bgGradient="linear(to-r, #6400B3, #1596DF)"
                bgClip="text"
                textColor="transparent"
              >
                This is not the 252853rd blogging tool, it has an
                <br />
                AI Assistant for SEO-optimized content & boooom success is guaranteed.
              </Box>
      <Features />
      <Pricing />
      <FAQs />
      <Footer /> 
      
              <Features />
              <Pricing />
              <FAQs />
              <Footer />
            </Container>
          </VStack>
        </Center>
      </Container>
    </div>
  );
};

export default LandingPage;
