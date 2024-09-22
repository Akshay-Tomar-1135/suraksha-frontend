import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import HeroImage from '/assets/images/others/Visual.png';
import Cylinder from '/assets/images/others/cylinder.png';
import HalfTorus from '/assets/images/others/half-torus.png';
import Button from './Button';

const Hero = () => {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={heroRef}
      className="p-8 pb-16 md:p-10 lg:p-20 font-medium bg-gradient-to-t from-[#a0c8f0] to-[#e0f2ff] overflow-x-clip md:items-center gap-3"
    >
      <div className="md:flex items-center justify-center gap-16">
        <div className="md:w-[478px]">
          <div className="border-2 w-fit p-0.5 px-1 lg:text-lg rounded-lg border-[#6a0dad]">
            Welcome to Suraksha
          </div>
          <div className="text-5xl md:text-7xl font-black my-7 bg-gradient-to-b from-black to-[#6a0dad] text-transparent bg-clip-text tracking-tighter">
            Redefining Safety, Empowering Women
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
            src={Cylinder}
            alt="Cylinder"
            className="hidden md:block md:absolute -left-8 -top-8"
            style={{ translateY }}
          />
          <motion.img
            src={HeroImage}
            alt="Hero Image"
            className="md:absolute md:h-full md:w-auto md:max-w-none"
            animate={{
              translateY: [-30, 30],
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'mirror',
              duration: 3,
              ease: 'easeInOut',
            }}
          />
          <motion.img
            src={HalfTorus}
            alt="HalfTorus"
            className="hidden lg:block md:absolute left-[400px] top-[500px]"
            style={{ translateY }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
