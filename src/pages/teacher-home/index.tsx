import { Content, MainContainer, ContentTitle, CardsWrapper, CardsTitle, Card, CardSubject, CardStudent, CardDate, Image, ImageContainer} from "./components"
import Logo from "../../assets/Logo transparent.png"
import SideBar from "../../components/sidebar/sidebar";

const Home = () => {

  return (
    <MainContainer>
      <SideBar/>
      <Content>
      <ContentTitle>Here you can find information about your upcoming classes:</ContentTitle>
        <CardsTitle>Next 7 Days</CardsTitle>
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
        </CardsWrapper>
        <CardsTitle>All Classes</CardsTitle>
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
        </CardsWrapper>
      </Content>
      <ImageContainer>
        <Image src={Logo}></Image>
      </ImageContainer>
    </MainContainer>
  )
}

export default Home