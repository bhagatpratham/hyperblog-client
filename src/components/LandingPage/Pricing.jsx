import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const Pricing = () => {
  return (
    <Box py={8} mt={100}>
      <Heading as="h2" mb={10} textAlign="center">
        Pricing
      </Heading>
      <Flex justify="center">
        <Box maxW="sm" mx={4} textAlign="center">
          <Heading as="h3" fontSize="xl" mb={2}>
            Free Trial
          </Heading>
          <Text mb={4}>Generate 3 blogs, SEO optimization</Text>
        </Box>
        <Box maxW="sm" mx={4} textAlign="center">
          <Heading as="h3" fontSize="xl" mb={2}>
            Pro Plan
          </Heading>
          <Text mb={4}>$19/mo: 10,000 tokens, SEO optimization, Chatbot support</Text>
        </Box>
        <Box maxW="sm" mx={4} textAlign="center">
          <Heading as="h3" fontSize="xl" mb={2}>
            One Time Offer
          </Heading>
          <Text mb={4}>$49/ Lifetime Access (Bring your own API key)</Text>
        </Box>
        <Box maxW="sm" mx={4} textAlign="center">
          <Heading as="h3" fontSize="xl" mb={2}>
            Enterprise
          </Heading>
          <Text mb={4}>Custom: Generate unlimited blogs, SEO optimization, Chatbot support</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Pricing;
