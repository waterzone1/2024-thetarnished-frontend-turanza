import { useEffect, useState } from 'react';
import SideBar from '../../components/sidebar/sidebar';
import { MainContainer, Content, Card, Title, Instructor, BrowserWrapper, CardInfo, PopUp, PopUpContainer, ButtonsContainer, LoadingSkeletonCard, StaticSkeletonCard, Select, InputsContainer } from './components';
import { Button } from '../../components/main-button/components';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { Message } from '../../components/message/components';
import { AnimatedLoadingLogo } from '../../components/animated-loading-logo/components';
import SimplifiedLogo from "../../assets/Logo transparent.png";

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
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [clickedClass, setClickedClass] = useState<Teacher | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [isBooking, setIsBooking] = useState(false);

    const { subjectId } = useParams();
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

    const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDay(event.target.value);
        setSelectedTime('');
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTime(event.target.value);
    };

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
            const selectedSchedule = teacherSchedule.find(
                (schedule) =>
                    schedule.teacherid === clickedClass?.teacherid &&
                    schedule.dayofweek === selectedDay &&
                    formatTime(schedule.start_time) === selectedTime
            );
    
            if (!selectedSchedule) {
                setMessage('No matching schedule found');
                throw new Error('No matching schedule found');
            }
    
            if (!selectedDay || !selectedTime) {
                setMessage('Please select a day and time');
                throw new Error('Please select a day and time');
            }
    
            const response = await fetch(`http://localhost:3000/reservation/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    student_id: user?.id,
                    subject_id: subjectId,
                    teacher_id: clickedClass?.teacherid,
                    dayofweek: parseInt(selectedDay, 10),
                    start_time: `${selectedTime}:00`,
                    schedule_id: selectedSchedule?.scheduleid,
                })
            });
    
            if (!response.ok) {
                setMessage('Failed to book class');
                throw new Error('Failed to book class');
            }
    
            setIsPopupOpen(false);
            setClickedClass(null);
            setMessage('Class booked successfully');
            setShowSuccessMessage(true);
            setIsBooking(false);
            setTimeout(() => {
                setShowSuccessMessage(false);
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
    const filteredSchedule = Array.isArray(teacherSchedule) ? teacherSchedule.filter(schedule => schedule.dayofweek === selectedDay) : [];
    const uniqueDays = Array.from(new Set(teacherSchedule.map(schedule => schedule.dayofweek)))
    .sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
    
    const uniqueTimes = Array.from(new Set(filteredSchedule.map(schedule => schedule.start_time)))
        .sort((a, b) => a.localeCompare(b, undefined))
        .map(formatTimeWithPadding);

    const numStaticSkeletonCards = Math.max(0, 7 - teachersDictatingSubject.length);
    const cardsToDisplay = [...teachersDictatingSubject.map(item => item.teacher), ...Array(numStaticSkeletonCards).fill(null)];
    
    return (
        <>
            {clickedClass != null &&
                <PopUpContainer>
                    <PopUp>
                        <h2>{clickedClass.firstname} {clickedClass.lastname}</h2>
                        <InputsContainer>
                            <Select required onChange={handleDayChange} value={selectedDay}>
                                <option value="">Select a day</option>
                                {uniqueDays.map(day => (
                                    <option key={day} value={day}>
                                        {dayNames[day] || 'Unknown'}
                                    </option>
                                ))}
                            </Select>
                            {filteredSchedule.length > 0 && (
                                <Select required onChange={handleTimeChange} value={selectedTime}>
                                    <option value="">Select a time</option>
                                    {uniqueTimes.map(time => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </Select>
                            )}
                        </InputsContainer>
                        <ButtonsContainer>
                            <Button onClick={handleBook}>{isBooking ? <AnimatedLoadingLogo src={SimplifiedLogo}/> : "Book"}</Button>
                            <Button secondary onClick={handlePopupClose}>Close</Button>
                        </ButtonsContainer>
                    </PopUp>
                </PopUpContainer>
            }
            <MainContainer isPopupOpen={isPopupOpen}>
            {showSuccessMessage && <Message>{message}</Message>}
            {showErrorMessage && <Message error>{message}</Message>}
                <SideBar />
                <Content>
                    <BrowserWrapper>
                        {isLoading ? (
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                                {Array.from({ length: 7 }).map((_, index) => (
                                    <LoadingSkeletonCard key={index} />
                                ))}
                            </div>
                        ) : (
                            (numStaticSkeletonCards === 7) ? 
                            <>
                            <h1 style={{textAlign: "center"}}>No more teachers available for this subject.</h1>
                            <Button secondary onClick={handleGoBack}>Go back</Button>
                            </> 
                            : (
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
                            )
                        )}
                    </BrowserWrapper>
                </Content>
            </MainContainer>
        </>
    );
}
export default ClassBrowser;
