import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Content, MainContainer } from './components';
import { InteractionBlocker } from '../../components/interaction-blocker/components';
import { AnimatedLoadingLogo } from '../../components/animated-loading-logo/components';
import SimplifiedLogo from "../../assets/Logo transparent.png";

const ClassConfirm = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const URL = import.meta.env.VITE_API_URL;
    const { reservationId, teacherId } = useParams();
    const [message, setMessage] = React.useState('');

    useEffect(() => {
        setIsLoading(true);
        const confirmClass = async () => {
            try{
                const reponse = await fetch(`${URL}reservation/confirm-reservation/${reservationId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        teacher_id: teacherId,
                    })
                });

                if (!reponse.ok) {
                    throw new Error('Failed to fetch teacher reservations');
                }
                setMessage('Class confirmed!');
                setIsLoading(false);
            }catch(error){
                setMessage('Failed to confirm class.');
                setIsLoading(false);
                console.error(error);
            }
        }
        confirmClass();
    }, [URL, reservationId, teacherId]);
    
    return (
        <MainContainer>
            <Content>
                {isLoading ? (
                    <InteractionBlocker><AnimatedLoadingLogo src={SimplifiedLogo}/></InteractionBlocker>
                ) : (
                    <h2>{message}</h2>
                )}
            </Content>
        </MainContainer>
    )
}

export default ClassConfirm