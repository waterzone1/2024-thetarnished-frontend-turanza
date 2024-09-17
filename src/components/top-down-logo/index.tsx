import { Image, ImageContainer } from './components'
import logo from '../../assets/Logo transparent.png'

const Logo = () => {
  return (
    <ImageContainer>
        <Image src={logo} alt="Logo" />
    </ImageContainer>
  )
}

export default Logo
