// import React from "react";
// import { Box, Image, Text } from "@chakra-ui/react";


// export default function Features() {
//     return (
// <Box
//   boxSizing="border-box"
//   display="flex"
//   flexDirection="column"
//   alignItems="flex-start"
//   padding="45px 42px"
//   gap="10px"
//   width="100%"
//   height="365.05px"
//   background="linear-gradient(98.2deg, rgba(244, 239, 255, 0.6) 0%, rgba(237, 248, 255, 0.6) 100.67%)"
//   borderRadius="15px"
//   flex="none"
//   order={0}
//   flexGrow={0}
//   mt={550}
// >
// <Box
//   width="650px"
//   height="275.05px"
//   boxShadow="0px 4px 15px rgba(0, 0, 0, 0.1)"
//   borderRadius="12.8px"
//   flex="none"
//   order={0}
//   flexGrow={0}
//   display= "flex"
//     flex-direction= "row"
//     align-items= "center"
//     padding= "0px"
//     gap= "50px"
// >
//   <Image src="src/assets/Editor.jpeg" alt="Image" width="100%" height="100%" objectFit="cover" />
//   <Text
//   width="341px"
//   height="86px"
//   fontWeight={400}
//   fontSize="24px"
//   lineHeight="31px"
//   letterSpacing="-0.004em"
//   mr={70}
// >
//   Create your own tiny blog with the power of AI or simply, Connect your own domain 🌎
// </Text>
// </Box>



// </Box> 

//     )
// }

import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

const Features = () => {
  return (
    <Box py={8} mt={400}>
      <Heading as="h2" mb={10} textAlign="center">
        Key Features
      </Heading>
      <Flex justify="center">
        <Box maxW="sm" mx={4} textAlign="center">
          <Icon as={CheckCircleIcon} boxSize={10} color="teal.500" mb={4} />
          <Heading as="h3" fontSize="xl" mb={2}>
            Feature 1
          </Heading>
          <Text>
            Description of feature 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Box>
        <Box maxW="sm" mx={4} textAlign="center">
          <Icon as={CheckCircleIcon} boxSize={10} color="teal.500" mb={4} />
          <Heading as="h3" fontSize="xl" mb={2}>
            Feature 2
          </Heading>
          <Text>
            Description of feature 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Box>
        <Box maxW="sm" mx={4} textAlign="center">
          <Icon as={CheckCircleIcon} boxSize={10} color="teal.500" mb={4} />
          <Heading as="h3" fontSize="xl" mb={2}>
            Feature 3
          </Heading>
          <Text>
            Description of feature 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Features;
