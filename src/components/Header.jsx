import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import ProfileButton from './ProfileButton';
import { useAuth } from '../contexts/useAuth';
const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${(props) => (props.$isOpen ? '0' : '-100%')};
    width: 70%;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.colors.background.primary};
    box-shadow: -2px 0 10px ${(props) => props.theme.colors.shadow};
    transition: right 0.3s ease-in-out;
    padding: 2rem;
    z-index: 99;
  }
`;
const Profile = styled.span`
  position: relative;
  margin-right: -15rem;

  @media (max-width: 1000px) {
    margin-right: 0;
  }
`;

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0.8rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  background-color: ${(props) =>
    props.$scrolled ? props.theme.colors.background.primary : 'transparent'};
  box-shadow: ${(props) =>
    props.$scrolled ? `0 2px 10px ${props.theme.colors.shadow}` : 'none'};

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    height: 2px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &[data-active="true"]::after {
    transform: scaleX(1);
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    width: 100%;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.5rem;
  z-index: 100;

  @media (max-width: 768px) {
    display: block;
  }
`;
const Button = styled.button`
  height: 2.75rem;
  padding: 0 1.125rem;
  background: linear-gradient(90deg, ${({ theme }) => theme.googleColors.blue.dark}, ${({ theme }) => theme.googleColors.blue.darker});
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.2px;
  cursor: pointer;
  transition: transform 0.15s ease, filter 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 6px 18px rgba(26, 115, 232, 0.25);

  &:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
    box-shadow: 0 10px 24px rgba(26, 115, 232, 0.35);
  }

  &:active {
    transform: translateY(0);
    filter: brightness(0.98);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(138, 180, 248, 0.45);
  }

  @media (max-width: 1200px) {
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    width: auto;
    font-size: 0.85rem;
    height: 2.5rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    font-size: 0.85rem;
    height: 2.5rem;
  }

  @media (max-width: 320px) {
    width: 100%;
    font-size: 0.8rem;
    height: 2.25rem;
    padding: 0 1rem;
  }
`;


const Header = () => {
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (to) => {
    if (to.startsWith('/#')) {
      const targetHash = to.slice(1); // like '#sponsors'
      return location.pathname === '/' && location.hash === targetHash;
    }
    return location.pathname === to;
  };

  return (
    <HeaderContainer
      $scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo />
      <MenuButton onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </MenuButton>

      <Nav $isOpen={menuOpen}>
        <NavLink to="/" onClick={closeMenu} data-active={isActive('/')}>Home</NavLink>
        <NavLink to="/events" onClick={closeMenu} data-active={isActive('/events')}>Events</NavLink>
        <NavLink to="/team" onClick={closeMenu} data-active={isActive('/team')}>Team</NavLink>
        <NavLink to="/#sponsors" onClick={closeMenu} data-active={isActive('/#sponsors')}>Sponsor</NavLink>
        <NavLink to="/#contact" onClick={closeMenu} data-active={isActive('/#contact')}>Contact</NavLink>
        

        {isAuthenticated && (
          <Profile>
            <ProfileButton />
          </Profile>
        )}
      </Nav>

      <NavActions>
        {!isAuthenticated && (
          <Link to="/auth">
            <Button>Sign In / Sign Up</Button>
          </Link>
        )}
        <ThemeToggle toggle={toggleTheme} />
      </NavActions>
    </HeaderContainer>
  );
};

export default Header;
