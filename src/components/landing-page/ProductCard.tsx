import Box from '@mui/material/Box';
import Helix from '/assets/images/others/cube-helix 1.png';
import Cube from '/assets/images/others/cube-helix.png';

export default function ProductCard() {
  return (
    <div className="pb-28 flex flex-col items-center">
      <div className="flex flex-col items-center justify-center pt-28 px-12 pb-10 md:w-[600px]">
        <div className="border-2 w-fit p-0.5 px-3 text-sm rounded-xl border-slate-300/80">
          Empowering Women&apos;s Safety
        </div>
        <div className="text-3xl md:text-4xl lg:text-5xl py-6 font-bold tracking-tighter text-center bg-gradient-to-b from-black to-[#ff4d6d] text-transparent bg-clip-text">
          Tools for a Safer Tomorrow
        </div>

        <div className="text-center text-lg mb-8 md:text-xl">
          Suraksha provides a seamless platform to track safety, connect with support networks, and
          stay informed. Build your community and stay protected with cutting-edge tools designed
          for empowerment.
        </div>
      </div>

      <div className="flex flex-col gap-16 pt-4 lg:flex-row justify-center items-center px-8">
        <div className="shadow-2xl rounded-xl flex justify-center items-center flex-col p-8 max-w-[400px]">
          <Box component="img" src={Helix} alt="Helix" className="pb-4" />
          <div className="text-2xl font-bold pb-3 text-center">Empowerment Network</div>
          <div className="text-center">
            Connect with trusted allies, organizations, and resources all in one place to ensure
            support whenever needed.
          </div>
        </div>

        <div className="shadow-2xl rounded-xl flex justify-center items-center flex-col p-8 max-w-[400px]">
          <Box component="img" src={Cube} alt="Cube" className="pb-4" />
          <div className="text-2xl font-bold pb-3 text-center">Real-Time Safety Tracking</div>
          <div className="text-center">
            Stay informed with real-time tracking of your location, alerting your trusted contacts
            in moments of need.
          </div>
        </div>
      </div>
    </div>
  );
}
