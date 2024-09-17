import SideBar from '../../components/sidebar/sidebar'
import { MainContainer, Content, ProfileCard, UserImage, UserInfo, UserName, UserEmail, UserSubjects, Subject, CardButtons, Form, Input, InputText, ButtonsContainer, FormTitle, FormContainer } from './components';
import { Button } from '../../components/main-button/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { Message } from '../../components/message/components';
import { AnimatedLoadingLogo } from '../../components/animated-loading-logo/components';
import SimplifiedLogo from "../../assets/Logo transparent.png";
import Topbar from '../../components/topbar';
import { PopUp, PopUpContainer } from '../class-browser/components';
import Logo from '../../components/top-down-logo';

const Profile = () => {

    const navigate = useNavigate();
    const { user, updateUser, logout } = useAuth();

    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showDeleteAccountConfirmation, setShowDeleteAccountConfirmation] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handlePasswordChange = () => {
        navigate('/change-password');
    };

    const handleDeleteAccountClick = () => {
        setShowDeleteAccountConfirmation(true);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setShowDeleteAccountConfirmation(false);
        setIsPopupOpen(false);
    };

    const handleDeleteAccount = async () => {
        try{
            const response = await fetch('http://localhost:3000/authentication/delete-account', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user?.email
                }),
            });
            if (!response.ok) {
                setMessage("Could not delete account");
                throw new Error('Failed to delete user');
            }
            logout();
        }catch(error){
            setShowErrorMessage(true);
            setTimeout(() => {
                setShowErrorMessage(false)
            }, 3000);
            console.error(error);
        }
        
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
                setMessage("Could not update profile");
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
            console.error(error);
            setIsEditing(false);
            setShowErrorMessage(true);
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000);
        }
    };

    return (
        <>
            {showDeleteAccountConfirmation && (
            <PopUpContainer>
                <PopUp>
                    <h2>Are you sure you want to delete your account?</h2>
                    <ButtonsContainer>
                    <Button onClick={handleDeleteAccount}>Yes</Button>
                    <Button secondary onClick={handleClosePopup}>No</Button>
                    </ButtonsContainer>
                </PopUp>
            </PopUpContainer>
            )}
        <MainContainer isPopupOpen={isPopupOpen}>
            {showSuccessMessage && <Message>Your profile has been updated.</Message>}
            {showErrorMessage && <Message error>{message}</Message>}
            <SideBar/>
            <Topbar/>
            <Content>
                {!isEditing ? ( 
                <ProfileCard>
                    <UserImage src="https://imgs.search.brave.com/CidPMbEerqHyYiRV-k0nX7jmRCWkpObwF5BxWwlJKog/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjE5/NDAwODEwL3Bob3Rv/L21yLXdoby5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9aGFy/VHhXX0lSbDA2Q25o/LTRrbkNudHh3WWlx/V282eWlBeEpUcld5/U0ppRT0" alt="User Image" />
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
                        <Button important onClick={handleDeleteAccountClick}>Delete account</Button>
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
            <Logo/>
        </MainContainer>
        </>
    )
}

export default Profile