import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import BookForm from '../../components/BookForm';
import { getBooks, updateBook } from '../../utils/localStorage';

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

const ErrorMessage = styled.div`
  color: #d32f2f;
  text-align: center;
  padding: 1rem;
  background-color: #ffebee;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

export default function EditBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const books = getBooks();
    const foundBook = books.find((b) => b.id === id);
    if (foundBook) {
      setBook(foundBook);
    } else {
      setError('Livro não encontrado');
    }
  }, [id]);

  const handleSubmit = (bookData) => {
    updateBook(id, bookData);
    navigate('/');
  };

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <Container>
      <Title>Editar Livro</Title>
      <BookForm onSubmit={handleSubmit} initialData={book} />
    </Container>
  );
}
