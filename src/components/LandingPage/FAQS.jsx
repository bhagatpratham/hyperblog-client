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
                Can it write blog posts autonomously using AI?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Text>
              Absolutely! HyperBlog harnesses the superpower of AI to generate captivating blog posts automatically.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                How does it generate stock images?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Text>
              HyperBlog's AI assistant effortlessly discovers relevant, copyright-free stock images to enhance your blog posts.
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
