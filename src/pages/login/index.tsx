import React, { useState } from "react"
import { MainContainer, LeftContainer, RightContainer, Image, FormContainer, Form, InputText, Input, FormTitle, Button, ToggleVisibilityButton, ButtonsContainer, AnimatedStars, Star, ForgotPass } from "./components"
import { AiTwotoneEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/Logo.png"
import { logUser } from "./methods"
import Loading from "../../components/loading";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const success = await logUser(username, password);
        if (success) {
            setLoading(true);
            setTimeout(() => {
                navigate("/teacher-home");
                setLoading(false);
              }, 3000);
            
        } else {
            alert("Incorrect username or password");
        }
    }

    const handleRegisterButtonClick = () => {
        navigate("/register");
    }

    return(
        loading ? (<Loading/>) : (
        <MainContainer>
            <LeftContainer>
                <Image src={Logo}></Image>
            </LeftContainer>
            <RightContainer>
            <AnimatedStars xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
                <Star cx="100" cy="100" r="2" delay="2s"/>
                <Star cx="200" cy="200" r="2" delay="0s"/>
                <Star cx="300" cy="300" r="2" delay="1s"/>
                <Star cx="500" cy="100" r="2" delay="0s"/>
                <Star cx="600" cy="500" r="2" delay="0s"/>
                <Star cx="700" cy="300" r="2" delay="1s"/>
                <Star cx="100" cy="500" r="2" delay="2s"/>
                <Star cx="300" cy="600" r="2" delay="1s"/>
                <Star cx="650" cy="50" r="2" delay="1s"/>
            </AnimatedStars>
                <FormContainer>
                    <FormTitle>Welcome!</FormTitle>
                    <Form onSubmit={handleLogin}>
                        <InputText>Username:</InputText>
                        <Input type="text" id="username" placeholder="Username..." value={username} onChange={(e) => setUsername(e.target.value)} required ></Input>
                        <InputText>Password:</InputText>
                        <div style={{ position: 'relative' }}>
                            <Input 
                                type={isVisible ? 'text' : 'password'} 
                                id="password" 
                                placeholder="Password..." 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                style={{ paddingRight: '30px' }}
                            />
                            <ToggleVisibilityButton
                                onClick={() => setIsVisible(!isVisible)}
                                type="button"
                            >
                                {isVisible ? <AiTwotoneEyeInvisible /> : <AiOutlineEye />}
                            </ToggleVisibilityButton>
                        </div>
                        <ButtonsContainer>
                            <Button type="submit">Login</Button>
                            <Button type="button" onClick={handleRegisterButtonClick} secondary>Register</Button>
                            <ForgotPass to="/forgot-password">Forgot Password?</ForgotPass>
                        </ButtonsContainer>
                    </Form>
                </FormContainer>
            </RightContainer>
        </MainContainer>
    )

    )

}
export default Login;