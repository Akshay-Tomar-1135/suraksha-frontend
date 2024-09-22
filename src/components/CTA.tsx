import { FaArrowRight } from "react-icons/fa";
import Star from "/assets/images/others/emojistar 1.png";
import Helix from "/assets/images/others/helix2 1.png";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "./Button";

const CTA = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center pt-16 pb-24 px-14 bg-gradient-to-t from-[#a0c8f0] to-[#e0f2ff] overflow-x-clip"
    >
      <div className="max-w-[570px] flex flex-col items-center relative">
        <motion.img
          src={Star}
          alt="Star"
          className="absolute -left-[345px] -top-28 pr-6 hidden md:block"
          style={{
            translateY,
          }}
        />
        <motion.img
          src={Helix}
          alt="Helix"
          className="absolute -right-80 -top-6 hidden md:block"
          style={{
            translateY,
          }}
        />
        <div className="text-4xl md:text-5xl lg:text-6xl py-6 font-bold tracking-tighter text-center bg-gradient-to-b from-black to-[#6a0dad] text-transparent bg-clip-text">
          Sign up for free today
        </div>
        




        <div className="text-center text-lg mb-8 md:text-xl text-gray-800">
            Empower women and ensure their safety with our innovative app designed to keep you protected.
        </div>

        <div className="flex items-center gap-4 mt-4 text-lg">
          <Button text="Get Started" />
          <div className="font-semibold cursor-pointer hover:underline text-gray-800">
            Learn more
            <FaArrowRight className="h-3 w-3 inline ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;


