import { MainContainer, ScheduleContainer, Content, TableData, ButtonContainer } from './components';
import SideBar from '../../components/sidebar/sidebar';
import { useState } from 'react';
import { Button } from '../login/components';
import { handleSaveSchedule } from './methods';
import { AiOutlineCheck } from "react-icons/ai";

const ManageSchedule = () => {
    const [availableHours, setAvailableHours] = useState<string[]>([]);

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const hours = Array.from({ length: 11 }, (_, i) => `${i + 9}:00`);

    const toggleHour = (day: string, hour: string) => {
        const hourString = `${day} - ${hour}`;
        if (availableHours.includes(hourString)) {
            setAvailableHours(availableHours.filter(h => h !== hourString));
        } else {
            setAvailableHours([...availableHours, hourString]);
        }
    };

    return (
        <MainContainer>
            <SideBar/>
            <Content>
                <h1>Manage your schedule</h1>
                <ScheduleContainer>
                    <table style={{color: 'black', paddingBottom: '20px'}}>
                        <thead>
                            <tr>
                                <th></th>
                                {daysOfWeek.map(day => (
                                    <th key={day}>{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {hours.map(hour => (
                                <tr key={hour}>
                                    <td style={{paddingRight: '20px', textAlign: 'right'}}>{hour}</td>
                                    {daysOfWeek.map(day => (
                                        <TableData 
                                            key={day}
                                            onClick={() => toggleHour(day, hour)}
                                            style={{backgroundColor: availableHours.includes(`${day} - ${hour}`) ? '#8b9a93' : '',}}
                                        >
                                            {availableHours.includes(`${day} - ${hour}`) ? <AiOutlineCheck /> : ''}
                                        </TableData>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                <ButtonContainer>
                    <Button onClick={() => handleSaveSchedule(availableHours)}>Save schedule</Button>
                </ButtonContainer>
                </ScheduleContainer>
            </Content>
        </MainContainer>
    );
};

export default ManageSchedule;
