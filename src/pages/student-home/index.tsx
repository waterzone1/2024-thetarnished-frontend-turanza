import { Content, MainContainer, CardsWrapper, Card, CardSubject, Image, ImageContainer, SkeletonCard, SubjectSearchInput } from "./components";
import Logo from "../../assets/Logo transparent.png";
import SideBar from "../../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../../components/main-button/components";

interface Subject {
  subjectid: number;
  subjectname: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const ITEMS_PER_PAGE = 9;

  const handleSubjectSearch = (subjectId: number) => {
    navigate(`/class-browser/${subjectId}`);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
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
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchSubjects();
  }, []);

  const filteredSubjects = subjects.filter(subject =>
    subject.subjectname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSubjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSubjects = filteredSubjects.slice(startIndex, endIndex);
  const skeletonCount = ITEMS_PER_PAGE - currentSubjects.length;

  return (
    <MainContainer>
      <SideBar />
      <Content>
        {isLoading ? (
          <>
            <h2>Loading subjects...</h2>
            <CardsWrapper>
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </CardsWrapper>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <SubjectSearchInput
                type="text"
                placeholder="Search by subject name"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <CardsWrapper>
              {currentSubjects.map(subject => (
                <Card key={subject.subjectid} onClick={() => handleSubjectSearch(subject.subjectid)}>
                  <CardSubject>{subject.subjectname}</CardSubject>
                </Card>
              ))}

              {Array.from({ length: skeletonCount }).map((_, index) => (
                <Card key={`skeleton-${index}`} isSkeleton={true} />
              ))}
            </CardsWrapper>

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100px' }}>
              {currentPage > 1 && <Button onClick={handlePrevPage}>Previous</Button>}
              {currentPage < totalPages && <Button onClick={handleNextPage}>Next</Button>}
            </div>
          </>
        )}
      </Content>
      <ImageContainer>
        <Image src={Logo} />
      </ImageContainer>
    </MainContainer>
  );
};

export default Home;
