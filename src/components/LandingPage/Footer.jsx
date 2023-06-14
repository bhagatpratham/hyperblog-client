import { Box, Flex, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="gray.200" py={4}>
      <Flex justify="center">
        <Text fontSize="sm" color="gray.500">
          © 2023 HyperBlog. All rights reserved.
        </Text>
      </Flex>
      <Flex justify="center" mt={2}>
        <Link href="#" mx={2} fontSize="sm" color="gray.500">
          Terms of Service
        </Link>
        <Link href="#" mx={2} fontSize="sm" color="gray.500">
          Privacy Policy
        </Link>
        <Link href="#" mx={2} fontSize="sm" color="gray.500">
          Contact Us
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;
