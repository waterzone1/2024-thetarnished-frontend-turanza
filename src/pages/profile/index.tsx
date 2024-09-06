import SideBar from '../../components/sidebar/sidebar'
import { MainContainer, Content, ProfileCard, UserImage, UserInfo, UserName, UserEmail, UserSubjects, Subject, CardButtons, Form, Input, InputText, ButtonsContainer, FormTitle, FormContainer } from './components';
import { Button } from '../../components/main-button/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState('Balti');
    const [lastName, setLastName] = useState('Turanza');

    const handlePasswordChange = () => {
        navigate('/change-password');
    };

    const handleProfileSave = () => {
        setIsEditing(false);
    };

    return (
        <MainContainer>
            <SideBar/>
            <Content>
                {!isEditing ? ( 
                <ProfileCard>
                    <UserImage src="https://i.pravatar.cc/150?img=12" alt="User Image" />
                    <UserInfo>
                        <UserName>Balti Turanza</UserName>
                        <UserEmail>balticapo@hotmail.com</UserEmail>
                        <UserSubjects>
                            <Subject>Math</Subject>
                            <Subject>Physics</Subject>
                            <Subject>Programming</Subject>
                        </UserSubjects>
                    </UserInfo>
                    <CardButtons>
                        <Button onClick={() => setIsEditing(true)}>Edit your profile</Button>
                        <Button important onClick={handlePasswordChange}>Change password</Button>
                    </CardButtons>
                </ProfileCard>
                ) : (
                <FormContainer>
                    <FormTitle>Edit your profile</FormTitle>
                    <Form onSubmit={handleProfileSave}>
                        <InputText>First name:</InputText>
                        <Input type="text" id="username" placeholder="Username..." value={firstName} onChange={(e) => setFirstName(e.target.value)} required ></Input>
                        <InputText>Last name:</InputText>
                        <Input type="text" id="username" placeholder="Username..." value={lastName} onChange={(e) => setLastName(e.target.value)} required ></Input>
                        <ButtonsContainer>
                            <Button type="submit">Save</Button>
                            <Button type="button" onClick={() => setIsEditing(false)} important>Cancel</Button>
                        </ButtonsContainer>
                    </Form>
                </FormContainer> 
                )}
            </Content>
        </MainContainer>
    )
}

export default Profile