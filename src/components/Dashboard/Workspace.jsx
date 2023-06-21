/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Button, SimpleGrid, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ArticleCard from './ArticleCard';

const Workspace = ({ articles }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Box
      w='80%'
      h='100vh'
      bg={isDark ? 'gray.800' : 'white'}
      p={8}
      borderColor={isDark ? 'gray.700' : 'gray.200'}
    >
      <Button as={Link} to='/new-article' colorScheme='teal' mb={4}>
        Start a new article
      </Button>
      <SimpleGrid columns={2} spacing={10}>
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Workspace;
