import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
import { theme } from '../../theme';

const Nav = styled.nav`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: 1rem 0;
  box-shadow: ${theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: bold;
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  color: ${props => props.$active ? theme.colors.white : theme.colors.gray[200]};
  text-decoration: none;
  font-weight: ${props => props.$active ? '600' : '400'};
  font-size: ${theme.fontSizes.lg};
  transition: color 0.2s;

  &:hover {
    color: ${theme.colors.white};
  }
`;

export const Navbar = () => {
  const location = useLocation();

  return (
    <Nav>
      <NavContainer>
        <Logo>🎵 Song Manager</Logo>
        <NavLinks>
          <NavLink to="/" $active={location.pathname === '/'}>
            Songs
          </NavLink>
          <NavLink to="/stats" $active={location.pathname === '/stats'}>
            Statistics
          </NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};
