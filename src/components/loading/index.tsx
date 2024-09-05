import logo from '../../assets/Logo transparent.png';
import { Container, Logo } from './components';

const Loading = () => {
  return (
    <Container>
        <Logo src={logo} alt="Loading..." />
    </Container>
  )
}

export default Loading