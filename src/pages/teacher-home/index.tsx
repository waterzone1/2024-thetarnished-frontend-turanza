import { Content, MainContainer, ContentTitle, CardsWrapper, CardsTitle, Card, CardSubject, CardStudent, CardDate, Image, ImageContainer} from "./components"
import Logo from "../../assets/Logo transparent.png"
import SideBar from "../../components/sidebar/sidebar";
import { useAuth } from "../../auth/useAuth";

const Home = () => {

  const {user} = useAuth();

  return (
    <MainContainer>
      <SideBar/>
      <Content>
      <ContentTitle>Welcome {user?.firstName}!</ContentTitle>
        <CardsTitle>Upcoming classes:</CardsTitle>
        <CardsWrapper>
          <Card>
            <CardSubject>Subject: Physics</CardSubject>
            <CardStudent>Student: John Smith</CardStudent>
            <CardDate>10/09/2024 10:00</CardDate>
          </Card>
          <Card>
            <CardSubject>Subject: Chemistry</CardSubject>
            <CardStudent>Student: Mary Johnson</CardStudent>
            <CardDate>12/09/2024 12:00</CardDate>
          </Card>
          <Card>
            <CardSubject>Subject: Chemistry</CardSubject>
            <CardStudent>Student: Mary Johnson</CardStudent>
            <CardDate>12/09/2024 12:00</CardDate>
          </Card>
        </CardsWrapper>
      </Content>
      <ImageContainer>
        <Image src={Logo}></Image>
      </ImageContainer>
    </MainContainer>
  )
}

export default Home