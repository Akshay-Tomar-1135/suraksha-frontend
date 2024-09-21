import Box from '@mui/material/Box';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { GoBell, GoGoal } from 'react-icons/go';
import { LuLeaf } from 'react-icons/lu';
import { MdLockOutline } from 'react-icons/md';
import ProductImage from '/assets/images/others/Product Image.png';
import Pyramid from '/assets/images/others/pyramid.png';
import Tube from '/assets/images/others/tube.png';

const ProductShowcase = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <div
      ref={sectionRef}
      className="bg-gradient-to-t from-[#ff9aa2] to-white flex flex-col items-center overflow-x-hidden pb-24"
    >
      <div className="flex flex-col items-center font-medium mt-24 px-8 mx-auto md:w-[550px] lg:w-[630px]">
        <div className="border-2 w-fit p-0.5 px-3 text-sm rounded-xl border-slate-300/80">
          Empowering Women Everywhere
        </div>
        <div className="text-3xl md:text-4xl lg:text-5xl py-6 font-bold tracking-tighter text-center bg-gradient-to-b from-black to-[#ff4d6d] text-transparent bg-clip-text">
          A Safer Tomorrow Starts with Suraksha
        </div>

        <div className="text-center text-lg mb-8 md:text-xl">
          Suraksha is your trusted partner in promoting safety, awareness, and empowerment for women
          everywhere. Together, we build a safer, stronger world for every woman.
        </div>
      </div>
      <div className="relative">
        <motion.img
          src={Pyramid}
          alt="Empowerment Image"
          className="absolute -right-24 -top-20 w-72 h-72 hidden md:block"
          style={{
            translateY,
          }}
        />
        <Box component="img" src={ProductImage} alt="Suraksha Image" className="px-1" />
        <motion.img
          src={Tube}
          alt="Community Support Image"
          className="absolute w-72 h-72 top-64 -left-28 hidden md:block"
          style={{
            translateY,
          }}
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-20 max-w-[1400px] lg:px-28">
        <div className="mt-16">
          <LuLeaf className="text-2xl mb-3" />
          <div className="font-bold text-2xl">Community Support</div>
          <div className="text-lg my-2">
            Join a network of women who uplift and protect one another.
          </div>
          <div className="text-lg font-medium">
            Learn more <FaArrowRight className="inline h-3 w-3" />
          </div>
        </div>

        <div className="mt-16">
          <GoGoal className="text-2xl mb-3" />
          <div className="font-bold text-2xl">Safety Goals and Tracking</div>
          <div className="text-lg my-2">
            Set personal safety goals and track your journey towards security and confidence.
          </div>
          <div className="text-lg font-medium">
            Learn more <FaArrowRight className="inline h-3 w-3" />
          </div>
        </div>

        <div className="mt-16">
          <MdLockOutline className="text-2xl mb-3" />
          <div className="font-bold text-2xl">Privacy and Security</div>
          <div className="text-lg my-2">
            Your data is safe with us. We prioritize the highest levels of encryption and privacy.
          </div>
          <div className="text-lg font-medium">
            Learn more <FaArrowRight className="inline h-3 w-3" />
          </div>
        </div>

        <div className="mt-16">
          <GoBell className="text-2xl mb-3" />
          <div className="font-bold text-2xl">Real-Time Alerts</div>
          <div className="text-lg my-2">
            Stay informed with timely alerts on safety updates and resources in your area.
          </div>
          <div className="text-lg font-medium">
            Learn more <FaArrowRight className="inline h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
