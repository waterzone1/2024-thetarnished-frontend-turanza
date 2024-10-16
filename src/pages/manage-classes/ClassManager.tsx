import { useEffect, useState } from 'react';
import SideBar from '../../components/sidebar/sidebar';
import { MainContainer, Content, Card, CardHeader, CardBody, CardInfo, CardFooter, StaticSkeletonCard, LoadingSkeletonCard, CardsContainer } from './components';
import { useAuth } from '../../auth/useAuth';
import Topbar from '../../components/topbar';
import Logo from '../../components/top-down-logo';
import { Button } from '../../components/main-button/components';
import { PopUp, PopUpContainer } from '../../components/popup/components';
import { Message } from '../../components/message/components';
import { AnimatedLoadingLogo } from '../../components/animated-loading-logo/components';
import SimplifiedLogo from "../../assets/Logo transparent.png";
import CreateExamForm from '../../components/create-exam-form';


interface Reservation {
    id: string;
    student_name: string;
    subject_name: string;
    datetime: string;
    group: boolean;
}

const ClassManager = () => {
    const { user } = useAuth();
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [currentReservation, setCurrentReservation] = useState<Reservation | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
    const [isFinishing, setIsFinishing] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [isCreateExamPopupOpen, setIsCreateExamPopupOpen] = useState(false);
    const URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const getReservationsForTeacher = async () => {
            try {
                const response = await fetch(`${URL}reservation/teacher/${user?.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user?.token}`,
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
    }, [URL, user?.id, user?.token]);

    const totalCards = 4;
    const skeletonCards = totalCards - reservations.length;

    const handleFinishedClass = async (reservationId: string) => {
        setSelectedClassId(reservationId);
        try {
            setIsFinishing(true);
            const response = await fetch(`${URL}reservation/terminate/${reservationId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`,
                },
                body: JSON.stringify({
                    valor: 300,
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update reservation');
            }
            setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== reservationId));
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
            const response = await fetch(`${URL}reservation/cancel/${selectedClassId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to update reservation');
            }
            setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== selectedClassId));
            setIsCanceling(false);
            setMessage('Class canceled successfully');
            setIsPopupOpen(false);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }catch (error) {
            console.error(error);
            setMessage('Failed to cancel class');
            setIsCanceling(false);
            setIsPopupOpen(false);
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

    const handleCreateNewExam = (reservation: Reservation) => {
        setCurrentReservation(reservation)
        setIsCreateExamPopupOpen(true);
    };

  return (
    <MainContainer isCreateExamPopupOpen={isCreateExamPopupOpen} isPopupOpen={isPopupOpen}>
        {showMessage && <Message>{message}</Message>}
        {showErrorMessage && <Message error>{message}</Message>}
        <SideBar />
        <Logo/>
        <Topbar/>
        {isPopupOpen && (
        <PopUpContainer>
            <PopUp>
                <h2>Are you sure you want to cancel this class?</h2>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button important onClick={cancelClass}>{isCanceling ?  <AnimatedLoadingLogo src={SimplifiedLogo}/> : "Cancel class"}</Button>
                    <Button secondary onClick={() => setIsPopupOpen(false)}>Keep class</Button>
                </div>
            </PopUp>
        </PopUpContainer>
        )}
        {isCreateExamPopupOpen && currentReservation && (
        <CreateExamForm reservation={currentReservation} closePopup={() => setIsCreateExamPopupOpen(false)} />
        )}
        <Content>
            {isLoading ? (
                <CardsContainer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {Array.from({ length: totalCards }).map((_, index) => (
                        <LoadingSkeletonCard key={index} />
                    ))}
                </CardsContainer>
            ) : reservations.length > 0 ? (
                <CardsContainer>
                    {reservations.map((reservation) => (
                        <Card key={reservation.id}>
                            <CardHeader style={{ backgroundColor: reservation.group ? '#f2b36f' : '#3e7d44' }}>
                                <p>{reservation.subject_name}</p>
                            </CardHeader>
                            <CardBody>
                                <CardInfo>
                                    <p>{reservation.student_name}</p>
                                    <p style={{fontSize:"15px", fontWeight:"normal"}}>{new Date(reservation.datetime).toLocaleString()}</p>  
                                </CardInfo>
                            </CardBody>
                            <CardFooter>
                                {new Date(reservation.datetime) < new Date() && (
                                <Button onClick={() => handleFinishedClass(reservation.id)}>
                                    {isFinishing && selectedClassId === reservation.id ? (
                                        <AnimatedLoadingLogo src={SimplifiedLogo} />
                                    ) : (
                                        "Mark as finished"
                                    )}
                                </Button>
                                )}
                                {new Date(reservation.datetime) > new Date() && (
                                    <Button onClick={() => handleCreateNewExam(reservation)}>Create exam</Button>
                                )}
                                <Button secondary onClick={() => handleClassCancelation(reservation.id)}>Cancel</Button>
                            </CardFooter>
                        </Card>
                    ))}
                    {skeletonCards > 0 && 
                        Array.from({ length: skeletonCards }).map((_, index) => (
                            <StaticSkeletonCard key={`skeleton-${index}`} />
                    ))}
                </CardsContainer>
            ) : (
                <h2 style={{textAlign:"center"}}>You don't have any class to manage.</h2>
            )}
        </Content>
    </MainContainer>
  )
};

export default ClassManager;
