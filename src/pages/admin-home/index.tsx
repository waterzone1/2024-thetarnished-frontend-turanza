import { useAuth } from "../../auth/useAuth";
import { useEffect, useState } from "react";
import { ButtonContainer, CardsContainer, Content, MainContainer, SearchBar, TeacherCard, TeacherInfo, TeacherName } from "./components";
import Logo from "../../components/top-down-logo";
import { PopUp, PopUpContainer } from "../../components/popup/components";
import { Button } from "../../components/main-button/components";

interface Teacher {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    joined_at: string;
}

const teachers1: Teacher[] = [
    {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        joined_at: "2023-01-01",
    },
    {
        id: 2,
        firstname: "Jane",
        lastname: "Doe",
        email: "jane.doe@example.com",
        joined_at: "2023-01-02",
    },
    {
        id: 3,
        firstname: "Bob",
        lastname: "Smith",
        email: "bob.smith@example.com",
        joined_at: "2023-01-03",
    },
];

const AdminHome = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [currentTeacherId, setCurrentTeacherId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);

    const { isLoggedIn, user } = useAuth();

    useEffect(() => {
        /* if (!isLoggedIn || user?.role !== "ADMIN") {
            window.location.href = "/";
        } */
        setTeachers(teachers1);
    }, [isLoggedIn, user?.role]);

    const handleTeacherAccept = () => {
        setTeachers(teachers.filter(teacher => teacher.id !== currentTeacherId));
        setIsPopupOpen(false);
    }

    const handleTeacherReject = (teacherId: number) => {
        setCurrentTeacherId(teacherId);
        setIsRejectPopupOpen(true);
    }

    const handleTeacherEnroll = (teacherId: number) => {
        setCurrentTeacherId(teacherId);
        setIsPopupOpen(true);
    } 

    const handleTeacherRejection = () => {
        setTeachers(teachers.filter(teacher => teacher.id !== currentTeacherId));
        setIsRejectPopupOpen(false);
    }

    const filteredTeachers = teachers.filter(teacher => 
        `${teacher.firstname} ${teacher.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {isPopupOpen && (
                <PopUpContainer>
                    <PopUp>
                        <h2>You are about to enroll this teacher to the app. Are you sure?</h2>
                        <p>This teacher will be able to create, and give classes to students.</p>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button onClick={handleTeacherAccept}>Accept</Button>
                            <Button secondary onClick={() => setIsPopupOpen(false)}>Close</Button>
                        </div>
                    </PopUp>
                </PopUpContainer>
            )}
            {isRejectPopupOpen && (
                <PopUpContainer>
                    <PopUp>
                        <h2>You are about to reject this teacher application. Are you sure?</h2>
                        <p>This teacher account will be deleted.</p>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button important onClick={handleTeacherRejection}>Reject</Button>
                            <Button secondary onClick={() => setIsPopupOpen(false)}>Close</Button>
                        </div>
                    </PopUp>
                </PopUpContainer>
            )}
            <MainContainer isPopupOpen={isPopupOpen}>
                <Logo />
                <Content>
                    <SearchBar 
                        type="text" 
                        placeholder="Search by name or surname" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    <CardsContainer>
                        {filteredTeachers.length > 0 ? (
                            filteredTeachers.map((teacher) => (
                                <TeacherCard key={teacher.id}>
                                    <TeacherName>{teacher.firstname} {teacher.lastname}</TeacherName>
                                    <TeacherInfo>
                                        <p>Email: {teacher.email}</p>
                                        <p style={{ paddingLeft: "15px" }}>Joined at: {teacher.joined_at}</p>
                                    </TeacherInfo>
                                    <ButtonContainer>
                                        <Button onClick={() => handleTeacherEnroll(teacher.id)}>Enroll</Button>
                                        <Button important onClick={() => handleTeacherReject(teacher.id)}>Reject</Button>
                                    </ButtonContainer>
                                </TeacherCard>
                            ))
                        ) : (
                            <h1>No teachers found.</h1>
                        )}
                    </CardsContainer>

                </Content>
            </MainContainer>
        </>
    );
}

export default AdminHome;
