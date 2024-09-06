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
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const handleSubjectSearch = (subjectId: number) => {
    console.log(`Searching for ${subjectId}`);
    navigate(`/browse-available-classes`);
  };

  const subjects = [
    {
      name: 'Math',
      icon: <PiMathOperationsLight />,
      id: 1,
    },
    {
      name: 'Physics',
      icon: <GiAtom />,
      id: 2,
    },
    {
      name: 'Chemistry',
      icon: <SlChemistry />,
      id: 3,
    },
    {
      name: 'Programming',
      icon: <FaLaptopCode />,
      id: 4,
    },
    {
      name: 'Biology',
      icon: <RiPlantLine />,
      id: 5,
    },
    {
      name: 'History',
      icon: <PiBookOpenTextLight />,
      id: 6,
    },
    {
      name: 'Geography',
      icon: <BiWorld />,
      id: 7,
    },
    {
      name: 'Statistics',
      icon: <IoStatsChartOutline />,
      id: 8,
    },
    {
      name: 'Economics',
      icon: <ImStatsDots />,
      id: 9,
    },
  ];

  return (
    <MainContainer>
      <SideBar/>
      <Content>
      <ContentTitle>What do you want to learn today?</ContentTitle>
        <CardsWrapper>
          {subjects.map((subject, index) => (
            <Card key={index} onClick={() => handleSubjectSearch(subject.id)}>
              <CardIcon>{subject.icon}</CardIcon>
              <CardSubject>{subject.name}</CardSubject>
            </Card>
          ))}
        </CardsWrapper>
      </Content>
      <ImageContainer>
        <Image src={Logo}></Image>
      </ImageContainer>
    </MainContainer>
  )
}

export default Home