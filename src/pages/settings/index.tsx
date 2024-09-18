import SideBar from '../../components/sidebar/sidebar'
import Logo from '../../components/top-down-logo';
import { MainContainer, Content } from './components';

const Settings = () => {

    return (
        <MainContainer>
            <SideBar />
            <Content>
                <h1>Settings</h1>
            </Content>
            <Logo/>
        </MainContainer>
    )
}

export default Settings