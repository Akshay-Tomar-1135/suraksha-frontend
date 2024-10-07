import { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: 'What is Suraksha?',
      answer: 'Suraksha is a platform designed to ensure women’s safety by providing real-time tracking, safest routes, and emergency alerts.',
    },
    {
      question: 'How does live location tracking work?',
      answer: 'Live location tracking uses GPS to share your real-time position with your emergency contacts, allowing them to monitor your safety.',
    },
    {
      question: 'Can I mark unsafe areas?',
      answer: 'Yes, users can report and mark areas as safe or unsafe, which helps others plan safer routes.',
    },
    {
      question: 'How can I contribute to Suraksha?',
      answer: 'You can contribute by providing feedback, sharing your experience, and donating through the platform to support further development.',
    },
  ];

  return (
    <section className="py-12 px-8 sm:px-10 md:px-12 bg-gradient-to-t from-[#e0f2ff] to-[#a0c8f0] text-black">
      <div className="flex flex-col items-center max-w-5xl mx-auto">
        <div className="text-4xl md:text-5xl lg:text-6xl pt-6 font-bold tracking-tighter mb-8 text-center bg-gradient-to-b from-black to-[#6a0dad] text-transparent bg-clip-text">
          Frequently Asked Questions
        </div>

        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ease-in-out transform ${
                activeIndex === index ? 'scale-105' : 'scale-100'
              } border-b border-slate-300`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full text-left py-4 px-6 font-semibold text-xl flex justify-between items-center transition-colors duration-300 hover:bg-slate-200 rounded-t-md"
              >
                {faq.question}
                <span className="text-2xl transition-transform duration-300">
                  {activeIndex === index ? '-' : '+'}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 py-4 bg-slate-100 text-black rounded-b-md">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
