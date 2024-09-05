import { useState } from 'react';
import SideBar from '../../components/sidebar/sidebar'
import { MainContainer, Content, Card, Title, Instructor, Details, BrowserWrapper, CardLeftContainer, CardRightContainer, PopUp, PopUpContainer } from './components';
import { Button } from '../login/components';

const classData = [
    {
        title: 'Math',
        instructor: 'Dr. John Doe',
        schedule: 'Mondays y Wednesdays, 10:00 AM - 12:00 PM',
        level: 'College'
    },
    {
        title: 'Math',
        instructor: 'Eng. Andrew Smith',
        schedule: 'Tuesdays y Thursdays, 2:00 PM - 4:00 PM',
        level: 'Beginner'
    },
    {
        title: 'Physics',
        instructor: 'Prof. Mary Johnson',
        schedule: 'Mondays and Wednesdays, 1:00 PM - 3:00 PM',
        level: 'Intermediate'
    },
    {
        title: 'Chemestry',
        instructor: 'Dr. Alice Brown',
        schedule: 'Mondays, Wednesdays y Fridays, 9:00 AM - 11:00 AM',
        level: 'College'
    }
];

interface ClassCardProps {
    title: string;
    instructor: string;
    schedule: string;
    level: string;
    onClick?: () => void;
}


const ClassBrowser = () => {

    const [clickedClass, setClickedClass] = useState<ClassCardProps | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleCardClick = (classItem: ClassCardProps) => {
        setClickedClass(classItem);
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setClickedClass(null)
        setIsPopupOpen(false);
    };

    return(
        <>
        {clickedClass != null &&
            <PopUpContainer>
                <PopUp>
                    <h1>{clickedClass.title}</h1>
                    <p>{clickedClass.instructor}</p>
                    <p>{clickedClass.schedule}</p>
                    <p>{clickedClass.level}</p>
                    <Button>Book</Button>
                    <Button secondary onClick={handlePopupClose}>Close</Button>
                </PopUp>
            </PopUpContainer>
            
        }

        <MainContainer isPopupOpen={isPopupOpen}>
            <SideBar />
            <Content>
                <h1>Class browser</h1>
                <BrowserWrapper>
                    {classData.map((classItem, index) => (
                        <Card 
                            key={index}
                            onClick={() => handleCardClick(classItem)} 
                            role="button" 
                            tabIndex={0}
                            aria-label={`Subject: ${classItem.title} teacher: ${classItem.instructor}`}
                        >
                            <CardLeftContainer>
                                <Title>{classItem.title}</Title>
                                <Instructor>{classItem.instructor}</Instructor>
                            </CardLeftContainer>
                            <CardRightContainer>
                                <Details><strong>Hour:</strong> {classItem.schedule}</Details>
                                <Details><strong>Level:</strong> {classItem.level}</Details>
                            </CardRightContainer>
                        </Card>
                    ))}
                </BrowserWrapper>
            </Content>
        </MainContainer>
        </>
    )
}

export default ClassBrowser