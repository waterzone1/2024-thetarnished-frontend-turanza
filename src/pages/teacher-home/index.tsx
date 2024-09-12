import { useEffect, useState } from 'react';
import SideBar from '../../components/sidebar/sidebar';
import { MainContainer, Content, Card, CardHeader, CardBody, CardInfo, CardFooter, StaticSkeletonCard, LoadingSkeletonCard, CardsContainer } from './components';
import { useAuth } from '../../auth/useAuth';
import Topbar from '../../components/topbar';

interface Reservations {
    id: string;
    student_name: string;
    subject_name: string;
    datetime: string;
}

const TeacherHome = () => {
    const { user } = useAuth();
    const [reservations, setReservations] = useState<Reservations[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getReservationsForStudent = async () => {
            try {
                const response = await fetch(`http://localhost:3000/reservation/teacher/${user?.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch teacher reservations');
                }
                const data = await response.json();
                setTimeout(() => {
                  setReservations(data);
                  setIsLoading(false);
                }, 3000);
                
                
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        getReservationsForStudent();
    }, [user?.id]);

    const totalCards = 3;
    const skeletonCards = totalCards - reservations.length;

    return (
        <MainContainer>
            <SideBar />
            <Topbar/>
            <Content>
                {isLoading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {Array.from({ length: totalCards }).map((_, index) => (
                            <LoadingSkeletonCard key={index} />
                        ))}
                    </div>
                ) : (
                    <div>
                        <h1 style={{paddingTop:"30px", paddingLeft: "15px"}}>Hello, {user?.firstName}!</h1>
                        <h2 style={{paddingLeft: "15px"}}>Here are your upcoming classes:</h2>
                        {reservations.length > 0 ? (
                            <CardsContainer>
                                {reservations.map((reservation) => (
                                    <Card key={reservation.id}>
                                        <CardHeader>
                                            <p>{reservation.subject_name}</p>
                                        </CardHeader>
                                        <CardBody>
                                            <CardInfo>
                                                <p>Student: {reservation.student_name}</p>  
                                            </CardInfo>
                                        </CardBody>
                                        <CardFooter>
                                            <p>{new Date(reservation.datetime).toLocaleString()}</p>
                                        </CardFooter>
                                    </Card>
                                ))}
                                {skeletonCards > 0 && 
                                    Array.from({ length: skeletonCards }).map((_, index) => (
                                        <StaticSkeletonCard key={`skeleton-${index}`} />
                                ))}
                            </CardsContainer>
                        ) : (
                            <h1>You don’t have any pending classes.</h1>
                        )}
                    </div>
                )}
            </Content>
        </MainContainer>
    );
};

export default TeacherHome;
