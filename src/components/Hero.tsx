import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import Button from './Button';
import Img from "./image.png";

const words = ["Empowering Women", "Inspiring Change", "Building Community", "Fostering Safety"];

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id='about'
      ref={heroRef}
      className="p-8 pb-16 md:p-10 lg:p-20 font-medium bg-gradient-to-t from-[#a0c8f0] to-[#e0f2ff] overflow-x-clip md:items-center gap-3"
    >
      <div className="md:flex items-center justify-center gap-16">
        <div className="md:w-[478px]">
          <div className="border-2 w-fit p-0.5 px-1 lg:text-lg rounded-lg border-[#6a0dad]">
            Welcome to Suraksha
          </div>
          <div className="text-5xl md:text-7xl font-black my-7 tracking-tighter">
            Redefining Safety,{" "}
            <motion.span
              key={currentWordIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="inline-block relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-1 before:w-full before:rounded before:opacity-50 before:translate-y-1 before:scale-x-0 before:transition-transform before:duration-300 before:transform hover:before:scale-x-100"
            >
              {words[currentWordIndex]}
            </motion.span>
          </div>
          <div className="text-black-100 lg:text-2xl tracking-tighter opacity-90">
            Suraksha is committed to empowering women by fostering safety and promoting awareness.
            Our platform builds a community that supports women to live without fear. Join us in
            shaping a future where safety is a right for every woman.
          </div>

          <div className="flex items-center gap-3 mt-6 text-lg">
            <Button text="Join Us Today" />
            <div className="cursor-pointer hover:underline">
              Learn More
              <FaArrowRight className="h-3 w-3 inline ml-2" />
            </div>
          </div>
        </div>

        <div className="pt-12 md:pt-0 md:h-[648px] md:w-[648px] relative">
          <motion.img
            src={Img}
            alt="Hero Image"
            className="md:absolute md:h-full md:w-auto md:max-w-none"
            animate={{
              translateY: [-30, 30],
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'mirror',
              duration: 1000,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
