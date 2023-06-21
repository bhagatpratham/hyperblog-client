/* eslint-disable no-unused-vars */
import React from 'react';
import { ChakraProvider, Box, Flex, Link, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export default function NavBar() {
    const navigate = useNavigate();
  return (
    <Box p={2}>
      <Flex align="center" justify="space-between" maxW="800px" mx="auto">
      <Box
        as="h1"
        width="176px"
        fontFamily="'Inter'"
        fontStyle="normal"
        fontWeight="700"
        fontSize="28.7313px"
        leadingTrim="both"
        textEdge="cap"
        background="linear-gradient(91.2deg, #6400B3 0%, #1596DF 81.26%)"
        WebkitBackgroundClip="text"
        WebkitTextFillColor="transparent"
        backgroundClip="text"
        textFillColor="transparent"
        flex="none"
        order={0}
        flexGrow={0}
      >
        HyperBlog
      </Box>
        <Flex>
          <Link color={'gray.600'} href="#features" mb={2} mt={6} mr={6}>
            Features
          </Link>
          <Link color={'gray.600'} href="#pricing" mb={2} mt={6} mr={6}>
            Pricing
          </Link>
          <Link color={'gray.600'} href="#faqs" mb={2} mt={6} mr={6}>
            FAQs
          </Link>
          <Button  m={4} colorScheme="brand" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button m={4} colorScheme="brand" onClick={() => navigate("/signup")}>Sign up</Button>
        </Flex>
      </Flex>
    </Box>
  );
}

