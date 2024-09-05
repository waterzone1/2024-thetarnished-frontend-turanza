import { Content, MainContainer, ContentTitle, CardsWrapper, Card, CardSubject, Image, ImageContainer, CardIcon} from "./components"
import Logo from "../../assets/Logo transparent.png"
import SideBar from "../../components/sidebar/sidebar";
import { SlChemistry } from "react-icons/sl";
import { GiAtom } from "react-icons/gi";
import { PiMathOperationsLight, PiBookOpenTextLight  } from "react-icons/pi";
import { FaLaptopCode } from "react-icons/fa6";
import { BiWorld } from "react-icons/bi";
import { RiPlantLine } from "react-icons/ri";
import { IoStatsChartOutline } from "react-icons/io5";
import { ImStatsDots } from "react-icons/im";

const Home = () => {

  return (
    <MainContainer>
      <SideBar/>
      <Content>
      <ContentTitle>What do you want to learn today?</ContentTitle>
        <CardsWrapper>
          <Card><CardIcon><PiMathOperationsLight  /></CardIcon><CardSubject>Math</CardSubject></Card>
          <Card><CardIcon><GiAtom /></CardIcon><CardSubject>Physics</CardSubject></Card>
          <Card><CardIcon><SlChemistry /></CardIcon><CardSubject>Chemistry</CardSubject></Card>
          <Card><CardIcon><FaLaptopCode /></CardIcon><CardSubject>Programming</CardSubject></Card>
          <Card><CardIcon><RiPlantLine /></CardIcon><CardSubject>Biology</CardSubject></Card>
          <Card><CardIcon><BiWorld  /></CardIcon><CardSubject>Geography</CardSubject></Card>
          <Card><CardIcon><ImStatsDots  /></CardIcon><CardSubject>Economics</CardSubject></Card>
          <Card><CardIcon><IoStatsChartOutline  /></CardIcon><CardSubject>Statistics</CardSubject></Card>
          <Card><CardIcon><PiBookOpenTextLight  /></CardIcon><CardSubject>Literature</CardSubject></Card>
        </CardsWrapper>
      </Content>
      <ImageContainer>
        <Image src={Logo}></Image>
      </ImageContainer>
    </MainContainer>
  )
}

export default Home