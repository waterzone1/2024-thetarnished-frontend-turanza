import { useState } from "react"
import { MainContainer, RightContainer, FormContainer, Form, InputText, Input, FormTitle, Button, ButtonsContainer, EmailSentNotification } from "./components"
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const navigate = useNavigate();

    const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmailSent(true);
        console.log(email);
    }

    const handleBackToLogin = () => {
        navigate('/');
    }

    return(
        <MainContainer>
           {emailSent && <EmailSentNotification>If the email exists in our database, you will receive a link to reset your password</EmailSentNotification>}
            <RightContainer>
                <FormContainer>
                    <FormTitle>Enter your email</FormTitle>
                    <Form onSubmit={(event) => handleResetPassword(event)}>
                        <InputText>Email:</InputText>
                        <Input type="email" id="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} required ></Input>
                        <ButtonsContainer>
                            <Button type="submit" >Send</Button>
                            <Button type="submit" secondary onClick={handleBackToLogin}>Back to login</Button>
                        </ButtonsContainer>
                    </Form>
                </FormContainer>
            </RightContainer>
        </MainContainer>
    )

}
export default ForgotPassword;