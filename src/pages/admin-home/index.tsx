/* import { useEffect } from "react";
import { useAuth } from "../../auth/useAuth"; */

import { useState } from "react";
import { Content, MainContainer } from "./components"
import Logo from "../../components/top-down-logo";
import { PopUp, PopUpContainer } from "../../components/popup/components";
import { Button } from "../../components/main-button/components";

const AdminHome = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

/*     const { isLoggedIn, user } = useAuth();

    useEffect(() => {
        if (!isLoggedIn || user?.role !== "ADMIN") {
            window.location.href = "/";
        }
    }, [isLoggedIn, user?.role]); */
  return (
    <>
    {isPopupOpen && (
        <PopUpContainer>
            <PopUp>
                <h1>Teacher</h1>
                <Button secondary onClick={() => setIsPopupOpen(false)}>Close</Button>
            </PopUp>
        </PopUpContainer>
    )}
    <Logo/>
    <MainContainer isPopupOpen={isPopupOpen}>
        <Content>

        </Content>
    </MainContainer>
    </>
  )
}

export default AdminHome
