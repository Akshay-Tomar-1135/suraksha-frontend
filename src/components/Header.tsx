import { useState, useEffect } from 'react';
import Logo from '/assets/images/others/main-logo.png';
import { FaBars } from 'react-icons/fa';
import Box from '@mui/material/Box';
import { useRouter } from 'src/routes/hooks';
import { useAppDispatch } from 'src/store/reduxHooks';
import { setUserType } from 'src/store/features/userConfig/userConfigSlice';
import { UserTypes } from 'src/_mock';
import UserTypeModal from './UserTypeModal';
import Button from './Button';

export default function Header() {
  const [localUserType, setLocalUserType] = useState<UserTypes | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUserType(localUserType));
  }, [dispatch, localUserType]);

  useEffect(() => {
    console.log('userType in header ---', localUserType);
    if (!localUserType) return;
    router.push('/auth');
  }, [localUserType, router]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Customers', href: '#customers' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Feedback', href: '#feedback' },
  ];

  const renderNavLinks = () =>
    navLinks.map((link) => (
      <li key={link.name}>
        <a href={link.href}>{link.name}</a>
      </li>
    ));

  const menuList = (
    <>
      {renderNavLinks()}
      <Button text="Get Started" onButtonClick={() => setOpenModal(true)} />
    </>
  );

  return (
    <>
      <UserTypeModal
        openModal={openModal}
        handleCloseModal={() => setOpenModal(false)}
        setUserType={setLocalUserType}
      />

      <header className="flex justify-between items-center px-6 py-4 backdrop-blur-md sticky top-0 z-20 bg-gradient-to-r from-[#E0E7FD] to-[#FDFEFF] shadow-md">
        <Box component="img" src={Logo} alt="Logo" className="cursor-pointer" />

        {/* Menu Icon for Mobile */}
        <FaBars className="block md:hidden cursor-pointer" onClick={toggleMenu} />

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 items-center">{menuList}</ul>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 w-full bg-gradient-to-r from-[#E0E7FD] to-[#FDFEFF] shadow-md">
            <ul className="flex flex-col gap-4 p-6">{menuList}</ul>
          </nav>
        )}
      </header>
    </>
  );
}
