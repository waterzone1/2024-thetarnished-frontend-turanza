import { useState } from "react"
import { MainContainer, RightContainer, FormContainer, Form, InputText, Input, FormTitle, Button, ButtonsContainer, EmailSentNotification } from "./components"
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {

    const [passwordChanged, setPasswordChanged] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate();

    const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPasswordChanged(true);
        setTimeout(() => {
            navigate('/');
        }, 3000);   
    }

    return(
        <MainContainer>
           {passwordChanged && <EmailSentNotification>Your new password has been saved</EmailSentNotification>}
            <RightContainer>
                <FormContainer>
                    <FormTitle>Change your password</FormTitle>
                    <Form onSubmit={(event) => handleChangePassword(event)}>
                        <InputText>Your current password:</InputText>
                        <Input type="password" id="password" placeholder="Current password..." value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required ></Input>
                        <InputText>Your new password:</InputText>
                        <Input type="password" id="password" placeholder="Password..." value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required ></Input>
                        <ButtonsContainer>
                            <Button type="submit" >Confirm</Button>
                        </ButtonsContainer>
                    </Form>
                </FormContainer>
            </RightContainer>
        </MainContainer>
    )

}
export default ChangePassword;