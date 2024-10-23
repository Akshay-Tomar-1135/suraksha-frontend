import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { faq } from '../_mock/_data';

// Define the type for your FAQ items
type FaqItem = {
  question: string;
  answer: string;
};

const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | false>(false);

  const handleChange = (index: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedIndex(isExpanded ? index : false);
  };

  return (
    <section
      id="faq"
      className="py-12 px-4 sm:px-6 md:px-8 lg:px-10 bg-gradient-to-t from-[#e0f2ff] to-[#a0c8f0] text-black"
    >
      <div className="flex flex-col items-center max-w-5xl mx-auto">
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl pt-6 font-bold tracking-tighter mb-8 text-center bg-gradient-to-b from-black to-[#6a0dad] text-transparent bg-clip-text">
          Frequently Asked Questions
        </div>

        <div className="w-full space-y-4">
          {faq.map((faqItem: FaqItem, index: number) => (
            <Accordion
              key={index}
              expanded={expandedIndex === index}
              onChange={handleChange(index)}
              className="transition-all duration-500 ease-in-out transform"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`faq-content-${index}`}
                id={`faq-header-${index}`}
                className="bg-slate-200 hover:bg-slate-300"
              >
                <Typography className="font-semibold text-lg sm:text-xl">
                  {faqItem.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="bg-slate-100">
                <Typography>
                  {faqItem.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
