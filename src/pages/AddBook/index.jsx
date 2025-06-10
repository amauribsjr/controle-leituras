import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BookForm from '../../components/BookForm';
import { addBook } from '../../utils/localStorage';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

export default function AddBook() {
  const navigate = useNavigate();

  const handleSubmit = (bookData) => {
    console.log('AddBook - Received form data:', bookData); // Debug log 1

    const newBook = {
      ...bookData,
      id: crypto.randomUUID(),
      currentPage: 0,
      status: 'não iniciado',
    };

    console.log('AddBook - Created new book object:', newBook); // Debug log 2

    addBook(newBook);

    const booksAfterAdd = JSON.parse(localStorage.getItem('reading-progress-books') || '[]');
    console.log('AddBook - Books in storage after adding:', booksAfterAdd); // Debug log 3

    navigate('/');
  };

  return (
    <Container>
      <Title>Adicionar Novo Livro</Title>
      <BookForm onSubmit={handleSubmit} />
    </Container>
  );
}
