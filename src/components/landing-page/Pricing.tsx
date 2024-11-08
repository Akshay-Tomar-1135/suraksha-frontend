import { IoMdCheckmark } from "react-icons/io";

export default function Pricing(){
  return (
    <div className="mb-8">
    <div className="flex flex-col items-center font-medium mt-16 mb-12 px-12 mx-auto max-w-[550px] ">
      <div className="border-2 w-fit p-0.5 px-3 text-sm rounded-xl border-slate-300/80">
        Pricing
      </div>
      <div className="text-3xl md:text-4xl lg:text-5xl py-6 font-bold tracking-tighter text-center bg-gradient-to-b from-black to-[#ff4d6d] text-transparent bg-clip-text">
        Your Safety, Our Priority
      </div>

      <div className="text-center text-lg mb-8 md:text-xl">
        Choose the plan that best suits your needs and get access to tools designed to enhance your safety and provide support when you need it the most.
      </div>
    </div>

    <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center pb-20 gap-8">
      <div className="shadow-xl border-slate-300/80 border-2 rounded-2xl p-8">
        <div className="font-bold text-gray-500">Basic</div>
        <div className="py-8">
          <span className="font-extrabold text-5xl">$0</span>
          <span className="font-semibold text-gray-600">/month</span>
        </div>
        <button type="button" className="text-white mb-8 bg-black py-1.5 w-full rounded-lg cursor-pointer">
          Get Started for Free
        </button>
        <div className="flex flex-col gap-6">
          <div>
            <IoMdCheckmark className="inline mr-2" /> Emergency contact alert
          </div>
          <div>
            <IoMdCheckmark className="inline mr-2" /> Location sharing
          </div>
          <div>
            <IoMdCheckmark className="inline mr-2" /> Safety tips and guidelines
          </div>
          <div>
            <IoMdCheckmark className="inline mr-2" /> Basic support
          </div>
        </div>
      </div>

      <div className="shadow-2xl border-2 rounded-2xl p-8 bg-black text-white">
        <div className="flex justify-between items-center">
          <div className="font-bold text-gray-500">Premium</div>
          <div className="border-2 w-fit p-0.5 px-3 text-xs rounded-xl border-slate-300/20 bg-gradient-to-r from-pink-500 via-lime-600 to-sky-400 text-transparent bg-clip-text font-bold tracking-tighter">
            Most Popular
          </div>
        </div>
        <div className="py-8">
          <span className="font-extrabold text-5xl">$9</span>
          <span className="font-semibold text-gray-600">/month</span>
        </div>
        <button type="button" className="text-black font-medium mb-8 bg-white py-1.5 w-full rounded-lg cursor-pointer">
          Sign Up Now
        </button>
        <div className="flex flex-col gap-6">
          <div>
            <IoMdCheckmark className="inline mr-2" /> All Basic features
          </div>
          <div>
            <IoMdCheckmark className="inline mr-2" /> Real-time incident alerts
          </div>
          <div>
            <IoMdCheckmark className="inline mr-2" /> Advanced location tracking
          </div>
          <div>
            <IoMdCheckmark className="inline mr-2" /> Priority support
          </div>
          <div>
            <IoMdCheckmark className="inline mr-2" /> Enhanced safety features
          </div>
        </div>
      </div>

      <div className="shadow-xl border-slate-300/80 border-2 rounded-2xl p-8">
        <div className="font-bold text-gray-500">Enterprise</div>
        <div className="py-8">
          <span className="font-extrabold text-5xl">$19</span>
          <span className="font-semibold text-gray-600">/month</span>
        </div>
        <button type="button" className="text-white mb-8 bg-black py-1.5 w-full rounded-lg cursor-pointer">
          Sign Up Now
        </button>
        <div className="flex flex-col gap-6">
          <div>
            <IoMdCheckmark className="inline mr-2" /> All Premium features
          </div>
          <div>
            <IoMdCheckmark className="inline mr-2" /> Custom safety alerts
          </div>
          <div>
            <IoMdCheckmark className="inline mr-2" /> Dedicated safety coordinator
          </div>
          <div>
            <IoMdCheckmark className="inline mr-2" /> Advanced analytics
          </div>
          <div>
            <IoMdCheckmark className="inline mr-2" /> Personalized safety plans
          </div>
          <div>
            <IoMdCheckmark className="inline mr-2" /> API access
          </div>
          <div>
            <IoMdCheckmark className="inline mr-2" /> Advanced security features
          </div>
        </div>
      </div>
    </div>
  </div>


  );
};
