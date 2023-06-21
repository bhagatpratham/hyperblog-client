/* eslint-disable react/no-unescaped-entities */
import { Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Text, Heading } from "@chakra-ui/react";

const FAQs = () => {
  return (
    <Box py={8} mt={50}>
        <Heading as="h2" mb={10} textAlign="center">
        FAQs
      </Heading>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              What file format should I upload to HyperBlog.me?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Text>
            HyperBlog.me accepts .txt, .pdf, .doc documents for easy content upload. (We will add more upload options once HyperBlog starts growing.)
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              Can I customize the tone and target audience of my articles?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Text>
            Absolutely! HyperBlog.me allows you to define the tone and target audience for your articles. Whether you want a formal tone for professional content or a conversational tone for a friendly approach, our platform adapts to your preferences.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              Will the generated articles be SEO-optimized?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Text>
            Yes, indeed! When you click "Generate with AI," HyperBlog.me's AI-powered algorithms generate SEO-optimized articles for you. This means your content will be optimized for search engine visibility, saving you the hassle of manual keyword research and optimization
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                When can we expect the launch of HyperBlog?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Text>
              HyperBlog is currently under development, and we're eagerly preparing for the launch of our beta version. Till then, you can sign up now for a one-time limited pre-launch offer. 🚀
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default FAQs;
