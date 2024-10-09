import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Avatar1 from '/assets/images/avatar/avatar-1.webp';
import Avatar2 from '/assets/images/avatar/avatar-2.webp';
import Avatar3 from '/assets/images/avatar/avatar-3.webp';
import Avatar4 from '/assets/images/avatar/avatar-4.webp';
import Avatar5 from '/assets/images/avatar/avatar-5.webp';
import Avatar6 from '/assets/images/avatar/avatar-6.webp';
import Avatar7 from '/assets/images/avatar/avatar-7.webp';
import Avatar8 from '/assets/images/avatar/avatar-8.webp';
import Avatar9 from '/assets/images/avatar/avatar-9.webp';

export default function Testimonials() {
  return (
    <div className="pt-12" id="customers">
      <div className="flex flex-col items-center px-28 pb-16">
        <div className="border-2 w-fit p-0.5 px-3 text-sm rounded-xl font-semibold border-[#6a0dad]/80">
          Testimonials
        </div>
        <div className="text-4xl lg:text-5xl pt-6 font-bold tracking-tighter text-center bg-gradient-to-b from-black to-[#002499] text-transparent bg-clip-text">
          What our users say
        </div>
      </div>
      <div className="overflow-hidden [mask-image:linear-gradient(to_top,transparent,black,transparent)] h-[750px] mb-12 md:mb-28 lg:mb-36">
        <motion.div
          animate={{
            translateY: '-50%',
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
        >
          <div className="flex items-center justify-center overflow-x-hidden pb-4 gap-4 ">
            <div className="hidden md:block">
              <div className="shadow-xl w-[310px] rounded-2xl p-8">
                <div className="font-medium pb-4">
                  The Suraksha app has helped me feel more confident walking home at night, knowing that my location is shared with trusted contacts.
                </div>
                <div className="flex items-center gap-3">
                  <Box component="img" src={Avatar1} alt="Avatar" className="h-12 w-12" />
                  <div>
                    <div className="font-semibold">Neha Singh</div>
                    <div>@neha_safety</div>
                  </div>
                </div>
              </div>

              <div className="shadow-xl w-[310px] rounded-2xl p-8 my-6">
                <div className="font-medium pb-4">
                  The safe routes feature is a game-changer. I no longer have to worry about finding the best path to take when I’m out late.
                </div>
                <div className="flex items-center gap-3">
                  <Box component="img" src={Avatar6} alt="Avatar" className="h-12 w-12" />
                  <div>
                    <div className="font-semibold">Riya Sharma</div>
                    <div>@riyasmartways</div>
                  </div>
                </div>
              </div>

              <div className="shadow-xl w-[310px] rounded-2xl p-8">
                <div className="font-medium pb-4">
                  I love how easy it is to send an SOS alert. This app has truly made me feel safer when traveling alone.
                </div>
                <div className="flex items-center gap-3">
                  <Box component="img" src={Avatar3} alt="Avatar" className="h-12 w-12" />
                  <div>
                    <div className="font-semibold">Ananya Desai</div>
                    <div>@ananyadesigns</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="shadow-xl w-[310px] rounded-2xl p-8">
                <div className="font-medium pb-4">
                  The live tracking feature ensures that my friends can keep an eye on me, especially during late-night commutes.
                </div>
                <div className="flex items-center gap-3">
                  <Box component="img" src={Avatar7} alt="Avatar" className="h-12 w-12" />
                  <div>
                    <div className="font-semibold">Pooja Verma</div>
                    <div>@poojav</div>
                  </div>
                </div>
              </div>

              <div className="shadow-xl w-[310px] rounded-2xl p-8 my-6">
                <div className="font-medium pb-4">
                  The feedback system is brilliant. It helps to know which areas are rated safe by others in the community.
                </div>
                <div className="flex items-center gap-3">
                  <Box component="img" src={Avatar2} alt="Avatar" className="h-12 w-12" />
                  <div>
                    <div className="font-semibold">Ishita Ghosh</div>
                    <div>@ishitasafe</div>
                  </div>
                </div>
              </div>

              <div className="shadow-xl w-[310px] rounded-2xl p-8">
                <div className="font-medium pb-4">
                  Suraksha’s emergency contact feature gives me peace of mind. I know help is just a click away.
                </div>
                <div className="flex items-center gap-3">
                  <Box component="img" src={Avatar5} alt="Avatar" className="h-12 w-12" />
                  <div>
                    <div className="font-semibold">Sara Khan</div>
                    <div>@sarak_safe</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="shadow-xl w-[310px] rounded-2xl p-8">
                <div className="font-medium pb-4">
                  The app’s safety features allow me to explore new places without the constant worry of getting lost or feeling unsafe.
                </div>
                <div className="flex items-center gap-3">
                  <Box component="img" src={Avatar4} alt="Avatar" className="h-12 w-12" />
                  <div>
                    <div className="font-semibold">Meera Nair</div>
                    <div>@meeranair</div>
                  </div>
                </div>
              </div>

              <div className="shadow-xl w-[310px] rounded-2xl p-8 my-6">
                <div className="font-medium pb-4">
                  Suraksha has made it easier to report areas that feel unsafe and avoid them.
                </div>
                <div className="flex items-center gap-3">
                  <Box component="img" src={Avatar8} alt="Avatar" className="h-12 w-12" />
                  <div>
                    <div className="font-semibold">Natasha Mehta</div>
                    <div>@nmehta_safe</div>
                  </div>
                </div>
              </div>

              <div className="shadow-xl w-[310px] rounded-2xl p-8">
                <div className="font-medium pb-4">
                  I feel empowered using Suraksha and always recommend it to my friends for added security.
                </div>
                <div className="flex items-center gap-3">
                  <Box component="img" src={Avatar9} alt="Avatar" className="h-12 w-12" />
                  <div>
                    <div className="font-semibold">Priya Gupta</div>
                    <div>@priyagupta_safe</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
