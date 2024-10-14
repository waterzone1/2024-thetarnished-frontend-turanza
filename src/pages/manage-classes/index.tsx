import { useState } from "react";
import { Button } from "../../components/main-button/components";
import ClassManager from "./ClassManager";
import ClassHistory from "./ClassHistory";
import { ButtonContainer } from "./components";


const ManageClasses = () => {

    const [showContainer, setShowContainer] = useState(true);
    
    const toggleContainer = () => {
        setShowContainer(!showContainer);
    };

    return (
        <>
        <ButtonContainer>
            <Button secondary onClick={toggleContainer}>{showContainer ? "Go to class history " : "Go to class manager"}</Button>
        </ButtonContainer>
        {showContainer ? <ClassManager/> :  <ClassHistory/>}
        </>
    );
};

export default ManageClasses;