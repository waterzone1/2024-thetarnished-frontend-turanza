import { useAuth } from "../../auth/useAuth";
import { FullMenuContainer, FullMenuLink, MenuButton, MenuWrapper, TopbarContainer } from './components';
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";

const Topbar = () => {

  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logoutUser = () => {
    logout();
  };

  return (
    <TopbarContainer>
        <MenuWrapper>
            <MenuButton onClick={toggleMenuOpen}>
                {isMenuOpen ? <IoCloseSharp /> : <RxHamburgerMenu />}
            </MenuButton>
        </MenuWrapper>
        {isMenuOpen && (
        <FullMenuContainer>
          {(user?.role === 'TEACHER') && (
                  <>
                  <FullMenuLink title='Home' to="/teacher-home" className={({ isActive }) => (isActive ? "active" : "")}>Home</FullMenuLink>
                  <FullMenuLink title='Manage schedule' to="/manage-schedule" className={({ isActive }) => (isActive ? "active" : "")}>Manage schedule</FullMenuLink>
                  {/* <FullMenuLink title='Manage classes' to="/manage-classes" className={({ isActive }) => (isActive ? "active" : "")}>Manage classes</FullMenuLink> */}
                  </>
              )}

          {(user?.role === 'STUDENT') && (
              <>
              <FullMenuLink title='Home' to="/student-home" className={({ isActive }) => (isActive ? "active" : "")}>Home</FullMenuLink>
              <FullMenuLink title='My classes' to="/my-classes" className={({ isActive }) => (isActive ? "active" : "")}>My classes</FullMenuLink>
              </>
          )}

          <FullMenuLink title='My profile' to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>Profile</FullMenuLink>
          {/* <FullMenuLink title='Settings' to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>Settings</FullMenuLink> */}
          <FullMenuLink to='/' onClick={logoutUser}>Log out</FullMenuLink>
        </FullMenuContainer>
        )}
    </TopbarContainer>
  )
}

export default Topbar
