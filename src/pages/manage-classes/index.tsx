import SideBar from '../../components/sidebar/sidebar'
import Logo from '../../components/top-down-logo';
import { MainContainer, Content } from './components';

const ManageClasses = () => {

    return (
        <MainContainer>
            <SideBar/>
            <Content>
                <h1>Manage your classes</h1>
            </Content>
            <Logo/>
        </MainContainer>
    )
}

export default ManageClasses