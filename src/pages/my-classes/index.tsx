import SideBar from '../../components/sidebar/sidebar'
import { MainContainer, Content } from './components';

const MyClasses = () => {

    return (
        <MainContainer>
            <SideBar />
            <Content>
                <h1>You haven´t booked any class yet</h1>
            </Content>
        </MainContainer>
    )
}

export default MyClasses