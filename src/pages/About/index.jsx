import { useState, useEffect } from 'react';
import styled from 'styled-components';
import BookList from '../../components/BookList';
import { getBooks } from '../../utils/localStorage';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadedBooks = getBooks();
    setBooks(loadedBooks);
  }, []);

  return (
    <Container>
      <Title>Meus Livros</Title>
      <BookList books={books} />
    </Container>
  );
}
