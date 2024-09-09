import { Content, MainContainer, ContentTitle, CardsWrapper, Card, CardSubject, Image, ImageContainer} from "./components"
import Logo from "../../assets/Logo transparent.png"
import SideBar from "../../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Subject {
  subjectid: number;
  subjectname: string;
}

const Home = () => {

  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const handleSubjectSearch = (subjectId: number) => {
    navigate(`/class-browser/${subjectId}`);
  };

  useEffect(() => {
    const fetchSubjects = async () => {
    try{
      const response = await fetch('http://localhost:3000/subject/all-subjects-dictated', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSubjects(data.results);
      console.log(data.results);

    }catch(error){
      console.error('Error:', error);
    };
  }
  fetchSubjects();
  }, []);

  return (
    <MainContainer>
      <SideBar/>
      <Content>
      <ContentTitle>What do you want to learn today?</ContentTitle>
        <CardsWrapper>
          {subjects.map((subject, index) => (
            <Card key={index} onClick={() => handleSubjectSearch(subject.subjectid)}>
              <CardSubject>{subject.subjectname}</CardSubject>
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