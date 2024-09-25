import Logo from "/assets/images/others/main-logo.png";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import Box from "@mui/material/Box";
import { useRouter } from 'src/routes/hooks';
import Button from "./Button";

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 backdrop-blur-md sticky top-0 z-20 bg-gradient-to-r from-[#E0E7FD] to-[#FDFEFF] shadow-md">
      <Box component="img" src={Logo} alt="Logo" className="cursor-pointer" />
      
      {/* Menu Icon for Mobile */}
      <FaBars className="block md:hidden cursor-pointer" onClick={toggleMenu} />

      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex gap-6 items-center">
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Features</a>
          </li>
          <li>
            <a href="#">Customers</a>
          </li>
          <li>
            <a href="#">Feedback</a>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
          <Button text="Get Started" onButtonClick={() => router.push('/auth')} />
        </ul>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-gradient-to-r from-[#E0E7FD] to-[#FDFEFF] shadow-md">
          <ul className="flex flex-col gap-4 p-6">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">Customers</a>
            </li>
            <li>
              <a href="#">Feedback</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
            <Button text="Get Started" onButtonClick={() => router.push('/auth')} />
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
