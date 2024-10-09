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

  return (
    <>
      <UserTypeModal
        openModal={openModal}
        handleCloseModal={() => setOpenModal(false)}
        setUserType={setLocalUserType}
      />

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
            <Button text="Get Started" onButtonClick={() => setOpenModal(true)} />
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
    </>
  );
}
