import { useEffect, useState } from 'react';
import SideBar from '../../components/sidebar/sidebar'
import { MainContainer, Content, Card, Title, Instructor, BrowserWrapper, CardInfo, PopUp, PopUpContainer, ButtonsContainer } from './components';
import { Button } from '../../components/main-button/components';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useParams } from 'react-router-dom';

interface Teacher {
    teacherid: string;
    firstname: string;
    lastname: string;
    email: string;
    subjectid: string;
}

const ClassBrowser = () => {

    const [teachersDictatingSubject, setTeachersDictatingSubject] = useState<Teacher[]>([]);

    const { subjectId } = useParams();
    console.log(subjectId);

    useEffect(() => {
        const getTeachersDictatingSubject = async () => {
            if (subjectId) {
                try {
                    const response = await fetch(`http://localhost:3000/teachers/all-dictating/${subjectId}`, {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });
                    const data = await response.json();
                    setTeachersDictatingSubject(data);
                } catch (error) {
                    console.error('Error fetching teachers dictating subjects:', error);
                }
            }
        };

        getTeachersDictatingSubject();

    }, [subjectId]);

    const [clickedClass, setClickedClass] = useState<Teacher | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleCardClick = (teacher: Teacher) => {
        setClickedClass(teacher);
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setClickedClass(null);
        setIsPopupOpen(false);
    };

    const handlePreviousPage = () => {
        console.log('Previous page');
    };

    const handleNextPage = () => {
        console.log('Next page');
    };

    return (
        <>
            {clickedClass != null &&
                <PopUpContainer>
                    <PopUp>
                        <h1>{clickedClass.firstname} {clickedClass.lastname}</h1>
                        <ButtonsContainer>
                            <Button>Book</Button>
                            <Button secondary onClick={handlePopupClose}>Close</Button>
                        </ButtonsContainer>
                    </PopUp>
                </PopUpContainer>
            }
            <MainContainer isPopupOpen={isPopupOpen}>
                <SideBar />
                <Content>
                    <BrowserWrapper>
                        {teachersDictatingSubject.map((teacher) => (
                            <Card 
                                key={teacher.teacherid}
                                onClick={() => handleCardClick(teacher)} 
                                role="button" 
                                tabIndex={0}
                                aria-label={`Teacher: ${teacher.firstname} ${teacher.lastname}`}
                            >
                                <CardInfo>
                                    <Title>{teacher.firstname} {teacher.lastname}</Title>
                                    <Instructor>{teacher.email}</Instructor>
                                </CardInfo>
                            </Card>
                        ))}
                        <ButtonsContainer>
                            <Button secondary onClick={handlePreviousPage}><MdOutlineKeyboardArrowLeft /> Previous</Button>
                            <Button secondary onClick={handleNextPage}>Next<MdOutlineKeyboardArrowRight /></Button>
                        </ButtonsContainer>
                    </BrowserWrapper>
                </Content>
            </MainContainer>
        </>
    );
}

export default ClassBrowser;
