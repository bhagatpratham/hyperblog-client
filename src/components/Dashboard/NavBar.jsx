/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Button, IconButton, useColorMode, VStack } from '@chakra-ui/react';
import { HamburgerIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';


const NavBar = ({ isCollapsed, handleCollapse }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Box
      w={isCollapsed ? '8%' : '20%'}
      h='100vh'
      bg={isDark ? 'gray.800' : 'white'}
      p={4}
      borderRightWidth={1}
      borderColor={isDark ? 'gray.700' : 'gray.200'}
    >
      <VStack align='stretch'>
        <Link to='/'>
          <img src='/logo.png' alt='HyperBlog Logo' />
        </Link>
        {isCollapsed ? (
          <IconButton
            aria-label='Menu'
            icon={<HamburgerIcon />}
            onClick={handleCollapse}
          />
        ) : (
          <>
            <Button as={Link} to='/editor-settings'>
              Editor Settings
            </Button>
            <Button as={Link} to='/user-settings'>
              User Settings
            </Button>
            <Button as={Link} to='/documentation'>
              How to use HyperBlog
            </Button>
            <Button as={Link} to='/new-article'>
              Start a new article
            </Button>
            <Button onClick={toggleColorMode}>
              Change theme ({isDark ? <SunIcon /> : <MoonIcon />})
            </Button>
            <IconButton
              aria-label='Menu'
              icon={<HamburgerIcon />}
              onClick={handleCollapse}
            />
          </>
        )}
      </VStack>
    </Box>
  );
};

export default NavBar;
