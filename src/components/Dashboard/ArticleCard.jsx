import React from 'react';
import { Box, Button, Heading, useColorMode } from '@chakra-ui/react';
import { LinkIcon, DeleteIcon } from '@chakra-ui/icons';

const ArticleCard = ({ article }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Box
      p={5}
      shadow='md'
      borderWidth={1}
      flex='1'
      borderRadius='md'
      borderColor={isDark ? 'gray.700' : 'gray.200'}
    >
      <Heading fontSize='xl'>{article.title}</Heading>
      <Button mt={4} colorScheme='teal' variant='outline' leftIcon={<LinkIcon />}>
        Share
      </Button>
      <Button
        mt={4}
        colorScheme='red'
        variant='outline'
        leftIcon={<DeleteIcon />}
        ml={4}
      >
        Delete
      </Button>
    </Box>
  );
};

export default ArticleCard;
