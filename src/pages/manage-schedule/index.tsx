import { MainContainer, ScheduleContainer, Content, TableData, ButtonContainer } from './components';
import SideBar from '../../components/sidebar/sidebar';
import { useEffect, useState } from 'react';
import { AiOutlineCheck } from "react-icons/ai";
import { useAuth } from '../../auth/useAuth';
import { useMemo } from 'react';
import TransparentLogo from "../../assets/Logo transparent.png";
import { Message } from '../../components/message/components';
import { AnimatedLoadingLogo } from '../../components/animated-loading-logo/components';
import { Button } from '../../components/main-button/components';
import Topbar from '../../components/topbar';
import { PopUp, PopUpContainer } from '../class-browser/components';
import { ButtonsContainer } from '../login/components';
import Logo from '../../components/top-down-logo';

const ManageSchedule = () => {
    const [availableHours, setAvailableHours] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [message, setMessage] = useState('');
    const { user, updateUser } = useAuth();
    const [isPopupOpen, setIsPopupOpen] = useState((user?.schedule)?.length === 0);


    const daysOfWeek = useMemo(() => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], []);
    const daysOfWeekShort = useMemo(() => ['M', 'T', 'W', 'T', 'F', 'S', 'S'], []);
    const hours = Array.from({ length: 13 }, (_, i) => {
        const hour = String(i + 8).padStart(2, '0');
        return `${hour}:00:00`;
    });
    const teacherId = user?.id

    useEffect(() => {
        if (user?.schedule) {
            const savedSchedule = user.schedule.map(s => {
                const day = daysOfWeek[Number(s.dayofweek) - 1];
                return `${day} - ${s.start_time}`;
            });
            setAvailableHours(savedSchedule);
        }
    }, [user?.schedule, daysOfWeek]);

    const toggleHour = (day: string, hour: string) => {
        const hourString = `${day} - ${hour}`;
        if (availableHours.includes(hourString)) {
            setAvailableHours(availableHours.filter(h => h !== hourString));
        } else {
            setAvailableHours([...availableHours, hourString]);
        }
    };

    const handleSaveSchedule = async (availableHours: string[]) => {
        setIsSaving(true);
        const scheduleData = availableHours.map(hourString => {
            const [day, start_time] = hourString.split(' - ');
            const end_time = `${parseInt(start_time.split(':')[0]) + 1}:00:00`;

            const dayofweek = daysOfWeek.indexOf(day) + 1;

            return {
                start_time,
                end_time,
                dayofweek
            };
        });

        try {
            const response = await fetch(`http://localhost:3000/schedule/create/${teacherId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ schedule: scheduleData })
            });

            if (!response.ok) {   
                throw new Error('Error saving schedule');
            }
            const result = await response.json();
            updateUser({ schedule: result });
            setIsSaving(false);
            setMessage('Schedule saved successfully');
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
            
        } catch (error) {
            console.error('Error creating schedule', error);
            setIsSaving(false);
            setMessage('Error creating schedule');
            setShowErrorMessage(true)
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000);
        }
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
        {isPopupOpen && (
            <PopUpContainer>
                <PopUp>
                    <h2>Availability schedule.</h2>
                    <p>Here you can set your schedule.</p>
                    <p>Click on the grid cells to select your available spots, or click again to unselect.</p>
                    <p>Then press the save button.</p>
                    <ButtonsContainer>
                        <Button secondary onClick={handleClosePopup}>Close</Button>
                    </ButtonsContainer>
                </PopUp>
            </PopUpContainer>
        )}
        <MainContainer isPopupOpen={isPopupOpen}>
            {showSuccessMessage && <Message>{message}</Message>}
            {showErrorMessage && <Message error>{message}</Message>}
            <SideBar />
            <Logo/>
            <Topbar/>
            <Content>
                <ScheduleContainer>
                    <table style={{ color: 'black', paddingBottom: '20px' }}>
                        <thead>
                            <tr>
                                <th></th>
                                {daysOfWeekShort.map(day => (
                                    <th key={day}>{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {hours.map(hour => (
                                <tr key={hour}>
                                    <td style={{ paddingRight: '20px', textAlign: 'right' }}>{hour.slice(0, 5)}</td>
                                    {daysOfWeek.map(day => (
                                        <TableData
                                            key={day}
                                            onClick={() => toggleHour(day, hour)}
                                            style={{ backgroundColor: availableHours.includes(`${day} - ${hour}`) ? '#8b9a93' : '', }}
                                        >
                                            {availableHours.includes(`${day} - ${hour}`) ? <AiOutlineCheck /> : ''}
                                        </TableData>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ButtonContainer>
                        <Button onClick={() => handleSaveSchedule(availableHours)}>{isSaving ? <AnimatedLoadingLogo src={TransparentLogo}/> : "Save schedule"}</Button>
                    </ButtonContainer>
                </ScheduleContainer>
            </Content>
        </MainContainer>
        </>
    );
};

export default ManageSchedule;
