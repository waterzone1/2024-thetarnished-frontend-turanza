import { useEffect, useState } from 'react';
import SideBar from '../../components/sidebar/sidebar';
import { MainContainer, Content, Card, CardHeader, CardBody, CardInfo, CardFooter, StaticSkeletonCard, LoadingSkeletonCard } from './components';
import { useAuth } from '../../auth/useAuth';
import Topbar from '../../components/topbar';
import Logo from '../../components/top-down-logo';
import { Button } from '../../components/main-button/components';
import { PopUp, PopUpContainer } from '../../components/popup/components';
import { Message } from '../../components/message/components';
import { AnimatedLoadingLogo } from '../../components/animated-loading-logo/components';
import SimplifiedLogo from "../../assets/Logo transparent.png";


interface Teacher {
    firstname: string;
    lastname: string;
}

interface Subject {
    subjectname: string;
}

interface Reservations {
    id: string;
    datetime: string;
    Teacher: Teacher;
    Subject: Subject;
}

const ManageClasses = () => {
    const { user } = useAuth();
    const [reservations, setReservations] = useState<Reservations[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
    const [isFinishing, setIsFinishing] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getReservationsForTeacher = async () => {
            try {
                const response = await fetch(`http://localhost:3000/reservation/teacher/${user?.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch student reservations');
                }
                const data = await response.json();
                setReservations(data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        getReservationsForTeacher();
    }, [user?.id]);

    const totalCards = 4;
    const skeletonCards = totalCards - reservations.length;

    const handleFinishedClass = async (reservationId: string) => {
        try {
            setIsFinishing(true);
            const response = await fetch(`http://localhost:3000/reservation/teacher/${user?.id}/${reservationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to update reservation');
            }
            const updatedReservation = await response.json();
            setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== updatedReservation.id));
            setIsFinishing(false);
            setMessage('Class finished successfully');
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }catch (error) {
            console.error(error);
            setMessage('Failed to finish class');
            setIsFinishing(false);
            setShowErrorMessage(true);
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000);
        }
    };

    const cancelClass = async () => {
        try {
            setIsCanceling(true);
            const response = await fetch(`http://localhost:3000/reservation/teacher/${user?.id}/${selectedClassId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to update reservation');
            }
            const updatedReservation = await response.json();
            setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== updatedReservation.id));
            setIsCanceling(false);
            setMessage('Class canceled successfully');
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }catch (error) {
            console.error(error);
            setMessage('Failed to cancel class');
            setShowErrorMessage(true);
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000);
        }
    };

    const handleClassCancelation = (reservationId: string) => {
        setSelectedClassId(reservationId);
        setIsPopupOpen(true);
    };

    return (
        <MainContainer>
            {showMessage && <Message>{message}</Message>}
            {showErrorMessage && <Message>{message}</Message>}
            <SideBar />
            <Logo/>
            <Topbar/>
            {isPopupOpen && (
            <PopUpContainer>
                <PopUp>
                    <h2>Are you sure you want to cancel this class?</h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button important onClick={cancelClass}>{isCanceling ?  <AnimatedLoadingLogo src={SimplifiedLogo}/> : "Yes"}</Button>
                        <Button secondary onClick={() => setIsPopupOpen(false)}>No</Button>
                    </div>
                </PopUp>
            </PopUpContainer>
            )}
            <Content>
                {isLoading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {Array.from({ length: totalCards }).map((_, index) => (
                            <LoadingSkeletonCard key={index} />
                        ))}
                    </div>
                ) : reservations.length > 0 ? (
                    <div>
                        {reservations.map((reservation) => (
                            <Card key={reservation.id}>
                                <CardHeader>
                                    <p>{reservation.Subject.subjectname}</p>
                                </CardHeader>
                                <CardBody>
                                    <CardInfo>
                                        <p>{new Date(reservation.datetime).toLocaleString()}</p>  
                                    </CardInfo>
                                </CardBody>
                                <CardFooter>
                                    <Button onClick={() => handleFinishedClass(reservation.id)}>{isFinishing ?  <AnimatedLoadingLogo src={SimplifiedLogo}/> : "Mark as finished"}</Button>
                                    <Button secondary onClick={() => handleClassCancelation(reservation.id)}>Cancel</Button>
                                </CardFooter>
                            </Card>
                        ))}
                        {skeletonCards > 0 && 
                            Array.from({ length: skeletonCards }).map((_, index) => (
                                <StaticSkeletonCard key={`skeleton-${index}`} />
                        ))}
                    </div>
                ) : (
                    <h2 style={{textAlign:"center"}}>You don't have any class to manage.</h2>
                )}
            </Content>
        </MainContainer>
    );
};

export default ManageClasses;