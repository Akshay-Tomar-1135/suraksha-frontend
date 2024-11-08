import Logo from "/assets/images/others/main-logo.png";
import { FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import Box from "@mui/material/Box";

export default function Footer() {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-900 text-white p-8 md:p-12 lg:p-16 gap-8 justify-between md:px-16 lg:px-20 xl:px-44">
      {/* Logo and Social Links */}
      <div className="flex flex-col gap-6 text-gray-300/85 max-w-[300px] mx-auto lg:mx-0">
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          className="cursor-pointer w-28 sm:w-32 md:w-40 lg:w-48 xl:w-56"
        />
        <div className="flex justify-center lg:justify-start gap-4 text-2xl cursor-pointer">
          <FaXTwitter className="hover:scale-125 transition-transform" />
          <AiFillInstagram className="hover:scale-125 transition-transform" />
          <FaLinkedin className="hover:scale-125 transition-transform" />
          <FaYoutube className="hover:scale-125 transition-transform" />
        </div>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:flex gap-8 md:gap-12 lg:gap-16 mx-auto lg:mx-0 text-center lg:text-left">
        <div className="flex flex-col gap-2">
          <div className="font-bold text-lg">Product</div>
          <div className="cursor-pointer text-gray-300/85 hover:text-white">Features</div>
          <div className="cursor-pointer text-gray-300/85 hover:text-white">Integrations</div>
          <div className="cursor-pointer text-gray-300/85 hover:text-white">Updates</div>
          <div className="cursor-pointer text-gray-300/85 hover:text-white">FAQ</div>
          <div className="cursor-pointer text-gray-300/85 hover:text-white">Pricing</div>
        </div>

        {/* Company Section */}
        <div className="flex flex-col gap-2">
          <div className="font-bold text-lg">Company</div>
          <div className="cursor-pointer text-gray-300/85 hover:text-white">About</div>
          <div className="cursor-pointer text-gray-300/85 hover:text-white">Blog</div>
          <div className="cursor-pointer text-gray-300/85 hover:text-white">Careers</div>
          <div className="cursor-pointer text-gray-300/85 hover:text-white">Manifesto</div>
          <div className="cursor-pointer text-gray-300/85 hover:text-white">Press</div>
          <div className="cursor-pointer text-gray-300/85 hover:text-white">Contact</div>
        </div>

        {/* Resources Section */}
        <div className="flex flex-col gap-2">
          <div className="font-bold text-lg">Resources</div>
          <div className="cursor-pointer text-gray-300/85 hover:text-white">Examples</div>
          <div className="cursor-pointer text-gray-300/85 hover:text-white">Community</div>
          <div className="cursor-pointer text-gray-300/85 hover:text-white">Guides</div>
          <div className="cursor-pointer text-gray-300/85 hover:text-white">Docs</div>
        </div>

        {/* Legal Section */}
        <div className="flex flex-col gap-2">
          <div className="font-bold text-lg">Legal</div>
          <div className="cursor-pointer text-gray-300/85 hover:text-white">Privacy</div>
          <div className="cursor-pointer text-gray-300/85 hover:text-white">Terms</div>
          <div className="cursor-pointer text-gray-300/85 hover:text-white">Security</div>
        </div>
      </div>
    </div>
  );
}
