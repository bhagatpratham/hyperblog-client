/* eslint-disable react/no-unescaped-entities */
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
      How does it work?
      </Heading>
      <Text my={4} fontSize="medium" color="gray.500">
               It's as simple as 1, 2, 3...
              </Text>
              
      <Flex justify="center" mt={50}>
        <Box maxW="sm" mx={4} textAlign="center">
          <Icon as={CheckCircleIcon} boxSize={10} color="teal.500" mb={4} />
          <Heading as="h3" fontSize="xl" mb={2}>
            Step 1
          </Heading>
          <Text fontWeight={"bold"}>
          Upload any Document
          </Text>
          <Text my={4} fontSize="medium" color="gray.500">
          Start by sharing your ideas, research, or existing content by uploading a .txt document. Whether it's a rough draft, notes, or a complete article, our intelligent system will work its magic.          
          </Text>
        </Box>
        <Box maxW="sm" mx={4} textAlign="center">
          <Icon as={CheckCircleIcon} boxSize={10} color="teal.500" mb={4} />
          <Heading as="h3" fontSize="xl" mb={2}>
            Step 2
          </Heading>
          <Text fontWeight={"bold"}>
          Select Target Audience and Desired Tone
          </Text>
          <Text my={4} fontSize="medium" color="gray.500">
          Define your target audience and the tone you want your article to have. Whether you're aiming for a formal and professional tone or a conversational and friendly approach, our platform adapts to your requirements.          
          </Text>
        </Box>
        <Box maxW="sm" mx={4} textAlign="center">
          <Icon as={CheckCircleIcon} boxSize={10} color="teal.500" mb={4} />
          <Heading as="h3" fontSize="xl" mb={2}>
            Step 3
          </Heading>
          <Text fontWeight={"bold"}>
          Click "Generate with AI" and Get an SEO-Optimized Article
          </Text>
          <Text my={4} fontSize="medium" color="gray.500">
          Now, the magic happens! With a single click, HyperBlog.me's AI-powered algorithms generate an SEO-optimized article for you. The generated content will be ready for review and editing in the integrated text editor. No more hours spent on keyword research or tweaking your content for search engine visibility – we take care of it all.          
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Features;
