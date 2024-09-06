import { useState } from 'react';
import SideBar from '../../components/sidebar/sidebar'
import { MainContainer, Content, Card, Title, Instructor, BrowserWrapper, CardInfo, PopUp, PopUpContainer, ButtonsContainer } from './components';
import { Button } from '../../components/main-button/components';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const classData = [
    {
        instructor: 'Dr. John Doe',
        days: 'Monday, Wednesday, Friday',
    },
    {
        instructor: 'Eng. Andrew Smith',
        days: 'Tuesday, Thursday',
    },
    {
        instructor: 'Dr. Jane Smith',
        days: 'Monday, Wednesday, Friday',
    },
    {
        instructor: 'Eng. Andrew Smith',
        days: 'Tuesday, Thursday',
    },
    {
        instructor: 'Dr. John Doe',
        days: 'Monday, Wednesday, Friday',
    },
    {
        instructor: 'Eng. Andrew Smith',
        days: 'Tuesday, Thursday',
    },
];

interface ClassCardProps {
    instructor: string;
    days: string;
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

    const handlePreviousPage = () => {
        console.log('Previous page');
    };

    const handleNextPage = () => {
        console.log('Next page');
    };

    return(
        <>
        {clickedClass != null &&
            <PopUpContainer>
                <PopUp>
                    <h1>{clickedClass.instructor}</h1>
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
                    {classData.map((classItem, index) => (
                        <Card 
                            key={index}
                            onClick={() => handleCardClick(classItem)} 
                            role="button" 
                            tabIndex={0}
                            aria-label={`Schedule: ${classItem.days} teacher: ${classItem.instructor}`}
                        >
                            <CardInfo>
                                <Title>{classItem.instructor}</Title>
                                <Instructor>{classItem.days}</Instructor>
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
    )
}

export default ClassBrowser