import SideBar from '../../components/sidebar/sidebar'
import { MainContainer, Content, ProfileCard, UserImage, UserInfo, UserName, UserEmail, UserSubjects, Subject, CardButtons, Form, Input, InputText, ButtonsContainer, FormTitle, FormContainer } from './components';
import { Button } from '../../components/main-button/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { Message } from '../../components/message/components';
import { AnimatedLoadingLogo } from '../../components/animated-loading-logo/components';
import SimplifiedLogo from "../../assets/Logo transparent.png";

const Profile = () => {

    const navigate = useNavigate();
    const { user, updateUser } = useAuth();

    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handlePasswordChange = () => {
        navigate('/change-password');
    };

    const handleProfileSave = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSaving(true);
        try{
            const response = await fetch('http://localhost:3000/authentication/edit-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newFirstName: firstName,
                    newLastName: lastName,
                    email: user?.email
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            setIsSaving(false);
            updateUser({ firstName: firstName, lastName: lastName });
            setIsEditing(false);
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        }catch(error){
            console.error(error)
        }
    };

    return (
        <MainContainer>
            {showSuccessMessage && <Message>Your profile has been updated.</Message>}
            <SideBar/>
            <Content>
                {!isEditing ? ( 
                <ProfileCard>
                    <UserImage src="https://i.pravatar.cc/150?img=68" alt="User Image" />
                    <UserInfo>
                        <UserName>{user?.firstName + ' ' + user?.lastName}</UserName>
                        <UserEmail>{user?.email}</UserEmail>
                        {user?.role === 'TEACHER' ? ( 
                            <UserSubjects>
                                {user?.subjects?.map((subject) => (
                                    <Subject key={subject.subjectid}>{subject.subjectname}</Subject>
                                ))}
                            </UserSubjects>
                        ) : (
                            <UserSubjects>
                                <Subject>{user?.role}</Subject>
                            </UserSubjects>
                        )}
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
                            <Button type="submit">{isSaving ? <AnimatedLoadingLogo src={SimplifiedLogo}/> : "Save"}</Button>
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