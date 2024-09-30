import { useEffect, useState } from 'react';
import SideBar from '../../components/sidebar/sidebar';
import { MainContainer, Content, Card, Title, Instructor, BrowserWrapper, CardInfo, ButtonsContainer, LoadingSkeletonCard, StaticSkeletonCard, Select, InputsContainer, PaymentButton, CashFlowProLogo, CloseButton, LeftContainer, SlotButton, RightContainer, SummaryContainer } from './components';
import { Button } from '../../components/main-button/components';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { Message } from '../../components/message/components';
import { AnimatedLoadingLogo } from '../../components/animated-loading-logo/components';
import { InteractionBlocker } from '../profile/components';
import { SearchInput } from '../../components/search-input/components';
import Logo from '../../components/top-down-logo';
import { PopUp, PopUpContainer } from '../../components/payment-popup/components';
import Topbar from '../../components/topbar';
import SimplifiedLogo from "../../assets/Logo transparent.png";
import CashFlowLogo from '../../assets/Cash Flow Logo.jpeg';
import { RiCloseLargeFill } from "react-icons/ri";
import { GoPlus, GoDash  } from "react-icons/go";

interface Teacher {
    teacherid: string;
    firstname: string;
    lastname: string;
    email: string;
    subjectid: string;
}

interface Schedule {
    scheduleid: string;
    start_time: string;
    end_time: string;
    teacherid: string;
    dayofweek: string;
    Teacher: Teacher;
}

const ClassBrowser = () => {
    const [teachersDictatingSubject, setTeachersDictatingSubject] = useState<{ teacher: Teacher; schedule: Schedule[] }[]>([]);
    const [teacherSchedule, setTeacherSchedule] = useState<Schedule[]>([]);
    const [selectedSlots, setSelectedSlots] = useState<{ day: string, time: string }[]>([{ day: '', time: '' }]);
    const [clickedClass, setClickedClass] = useState<Teacher | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [isBooking, setIsBooking] = useState(false);
    const [isBookingTimeout, setIsBookingTimeout] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const { subjectId, subjectName } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

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
                    const teachers = await response.json();

                    const schedules = await Promise.all(
                        teachers.map(async (teacher: Teacher) => {
                            const scheduleResponse = await fetch(`http://localhost:3000/schedule/teacher/${teacher.teacherid}`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });
                            const teacherSchedule = await scheduleResponse.json();
                            return { teacher, schedule: teacherSchedule };
                        })
                    );

                    const filteredSchedules = schedules.filter(({ schedule }) => schedule.length > 0);

                    setTeachersDictatingSubject(filteredSchedules);
                    setIsLoading(false);
                    
                } catch (error) {
                    console.error('Error fetching teachers dictating subjects:', error);
                    setIsLoading(false);
                }
            }
        };
        getTeachersDictatingSubject();
    }, [subjectId]);

    const handleCardClick = (teacher: Teacher) => {
        const selectedTeacher = teachersDictatingSubject.find(t => t.teacher.teacherid === teacher.teacherid);
        if (selectedTeacher) {
            setClickedClass(selectedTeacher.teacher);
            setTeacherSchedule(selectedTeacher.schedule);
            setIsPopupOpen(true);
        }
    };

    const handlePopupClose = () => {
        setClickedClass(null);
        setIsPopupOpen(false);
    };

    const handleDayChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSlots = [...selectedSlots];
        newSlots[index].day = event.target.value;
        setSelectedSlots(newSlots);
    };

    const handleTimeChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSlots = [...selectedSlots];
        newSlots[index].time = event.target.value;
        setSelectedSlots(newSlots);
    };

    const addSlot = () => {
        if (selectedSlots.length < 5) {
            setSelectedSlots([...selectedSlots, { day: '', time: '' }]);
        }
    };

    const removeSlot = (index: number) => {
        const filteredSlots = selectedSlots.filter((_, i) => i !== index);
        setSelectedSlots(filteredSlots);
    }

    const handleGoBack = () => {
        navigate('/student-home');
    };

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };

    const handleBook = async () => {
        try {
            setIsBooking(true);
            for (const slot of selectedSlots) {
                const selectedSchedule = teacherSchedule.find(
                    (schedule) =>
                        schedule.teacherid === clickedClass?.teacherid &&
                        schedule.dayofweek === slot.day &&
                        formatTime(schedule.start_time) === slot.time
                );

                if (!selectedSchedule) {
                    setMessage('No matching schedule found for one or more slots');
                    throw new Error('No matching schedule found for one or more slots');
                }

                if (!slot.day || !slot.time) {
                    setMessage('Please select a day and time for all slots');
                    throw new Error('Please select a day and time for all slots');
                }

                const requestBody = {
                    student_id: user?.id,
                    subject_id: subjectId,
                    teacher_id: clickedClass?.teacherid,
                    dayofweek: parseInt(slot.day, 10),
                    start_time: `${slot.time}:00`,
                    schedule_id: selectedSchedule?.scheduleid,
                };

                console.log('Request body:', requestBody);

                const response = await fetch(`http://localhost:3000/reservation/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                if (!response.ok) {
                    setMessage('Failed to book class');
                    throw new Error('Failed to book class');
                }
            }

            setIsPopupOpen(false);
            setClickedClass(null);
            setMessage('Classes booked successfully');
            setIsBooking(false);
            setIsBookingTimeout(true);
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                setIsBookingTimeout(false);
                window.location.reload();
            }, 3000);

        } catch (error) {
            console.error(error);
            setShowErrorMessage(true);
            setIsBooking(false);
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000);
        }
    };

    const dayNames: { [key: string]: string } = {
        '1': 'Mon',
        '2': 'Tue',
        '3': 'Wed',
        '4': 'Thu',
        '5': 'Fri',
        '6': 'Sat',
        '7': 'Sun'
    };

    const formatTimeWithPadding = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    const getAvailableDays = (schedules: Schedule[]) => {
        const days = Array.from(new Set(schedules.map(schedule => schedule.dayofweek)));
        return days.map(day => dayNames[day] || 'Unknown').join(', ');
    };

    const dayOrder = ['1', '2', '3', '4', '5', '6', '7'];
    const filteredTeachers = teachersDictatingSubject.filter(teacher =>
       `${teacher.teacher.firstname} ${teacher.teacher.lastname}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const numStaticSkeletonCards = Math.max(0, 7 - filteredTeachers.length);
    const cardsToDisplay = [...filteredTeachers.map(item => item.teacher), ...Array(numStaticSkeletonCards).fill(null)];

    const handleBookWithCashFlow  = async () => {
        console.log('handleBookWithCashFlow called');
    }
    
    return (
            <>
                {isPopupOpen && clickedClass != null &&
                    <PopUpContainer>
                        <PopUp>
                        <CloseButton onClick={handlePopupClose}><RiCloseLargeFill/></CloseButton>
                            <LeftContainer>
                                <h3 style={{marginBottom: '0px'}}>Teacher: {clickedClass.firstname} {clickedClass.lastname}</h3>
                                <h2>Select a day and time for each slot</h2>
                                {selectedSlots.map((slot, index) => (
                                    <InputsContainer key={index}>
                                        <Select required onChange={(e) => handleDayChange(index, e)} value={slot.day}>
                                            <option value="">Select a day</option>
                                            {Array.from(new Set(teacherSchedule.map(schedule => schedule.dayofweek)))
                                                .sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b))
                                                .map(day => (
                                                    <option key={day} value={day}>
                                                        {dayNames[day] || 'Unknown'}
                                                    </option>
                                                ))}
                                        </Select>
                                        <Select required onChange={(e) => handleTimeChange(index, e)} value={slot.time}>
                                            <option value="">Select a time</option>
                                            {teacherSchedule
                                                .filter(schedule => schedule.dayofweek === slot.day)
                                                .map(schedule => (
                                                    <option key={schedule.scheduleid} value={formatTimeWithPadding(schedule.start_time)}>
                                                        {formatTimeWithPadding(schedule.start_time)}
                                                    </option>
                                                ))}
                                        </Select>
                                        {index === 0 && (
                                        <SlotButton onClick={addSlot} disabled={selectedSlots.length >= 5}><GoPlus /></SlotButton>)}
                                        {index !== 0 && (
                                        <SlotButton remove onClick={() => removeSlot(index)}><GoDash  /></SlotButton>)}
                                    </InputsContainer>
                                ))}
                            </LeftContainer>
                            <RightContainer>
                                <h2>Summary</h2>
                                <SummaryContainer>
                                    {selectedSlots
                                        .filter(slot => slot.day && slot.time)
                                        .map((slot, index) => (
                                            <div key={index}>
                                                <p>Day: {dayNames[slot.day]} - Time: {slot.time} - Price: $300</p>
                                            </div>
                                        ))}
                                </SummaryContainer>
                                <ButtonsContainer>
                                    <Button onClick={handleBook}>Book</Button>
                                    <PaymentButton onClick={handleBookWithCashFlow}>{isBooking ? <AnimatedLoadingLogo src={SimplifiedLogo}/> : "Book with Cash Flow"}<CashFlowProLogo src={CashFlowLogo}/></PaymentButton>
                                    <Button important onClick={() => setIsPopupOpen(false)}>Cancel</Button>
                                </ButtonsContainer>
                            </RightContainer>
                        </PopUp>
                    </PopUpContainer>
                }
                <Logo/>
                <Topbar/>
                <MainContainer isPopupOpen={isPopupOpen}>
                {showSuccessMessage && <Message>{message}</Message>}
                {showErrorMessage && <Message error>{message}</Message>}
                {isBookingTimeout && <InteractionBlocker><AnimatedLoadingLogo src={SimplifiedLogo}/></InteractionBlocker>}
                    <SideBar />
                    <Content>
                    <h2>Available teachers dictating {subjectName}:</h2>
                        <BrowserWrapper>
                            {isLoading ? (
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                                    {Array.from({ length: 7 }).map((_, index) => (
                                        <LoadingSkeletonCard key={index} />
                                    ))}
                                </div>
                            ) : (
                                (teachersDictatingSubject.length === 0) ? 
                                <>
                                <h1 style={{textAlign: "center"}}>No teachers available for this subject.</h1>
                                <Button secondary onClick={handleGoBack}>Go back</Button>
                                </> 
                                : (
                                <>
                                
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                    <SearchInput
                                        type="text"
                                        placeholder="Search by teacher name"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                                    {cardsToDisplay.map((teacher, index) => (
                                        teacher ? (
                                            <Card 
                                                key={teacher.teacherid}
                                                onClick={() => handleCardClick(teacher)} 
                                                role="button" 
                                                tabIndex={0}
                                                aria-label={`Teacher: ${teacher.firstname} ${teacher.lastname}`}
                                            >
                                                <CardInfo>
                                                    <Title>{teacher.firstname} {teacher.lastname}</Title>
                                                    <Instructor>{getAvailableDays(teachersDictatingSubject.find(t => t.teacher.teacherid === teacher.teacherid)?.schedule || [])}</Instructor>
                                                </CardInfo>
                                            </Card>
                                        ) : (
                                            <StaticSkeletonCard key={`skeleton-${index}`} />
                                        )
                                    ))}
                                </div>
                                </>
                                )
                            )}
                        </BrowserWrapper>
                    </Content>
                </MainContainer>
            </>
    );
};

export default ClassBrowser;
