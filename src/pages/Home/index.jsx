import { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import BookList from '../../components/BookList';
import BookControls from '../../components/BookControls';
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
  const [filters, setFilters] = useState({
    search: '',
    status: '',
  });
  const [sortBy, setSortBy] = useState('title');

  const loadBooks = useCallback(() => {
    console.log('Home - Loading books from storage'); // Debug log 1
    const loadedBooks = getBooks();
    console.log('Home - Loaded books:', loadedBooks); // Debug log 2
    setBooks(loadedBooks);
  }, []);

  useEffect(() => {
    console.log('Home - Component mounted'); // Debug log 3
    loadBooks();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Home - Page became visible, reloading books'); // Debug log 4
        loadBooks();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    window.addEventListener('focus', loadBooks);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', loadBooks);
    };
  }, [loadBooks]);

  const handleFilterChange = useCallback((filterType, value) => {
    console.log('Home - Filter changed:', filterType, value);
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  }, []);

  const handleSortChange = useCallback((value) => {
    console.log('Home - Sort changed:', value);
    setSortBy(value);
  }, []);

  const getProgress = useCallback((book) => {
    return (book.currentPage / book.totalPages) * 100;
  }, []);

  const sortBooks = useCallback(
    (a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'author') {
        return a.author.localeCompare(b.author);
      }
      if (sortBy === 'progress') {
        return getProgress(b) - getProgress(a);
      }
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    },
    [sortBy, getProgress]
  );

  const filteredAndSortedBooks = useMemo(() => {
    console.log('Home - Filtering and sorting books:', books.length, 'books');
    return books
      .filter((book) => {
        const matchesSearch =
          !filters.search ||
          book.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          book.author.toLowerCase().includes(filters.search.toLowerCase());

        const matchesStatus = !filters.status || book.status === filters.status;

        return matchesSearch && matchesStatus;
      })
      .sort(sortBooks);
  }, [books, filters, sortBooks]);

  return (
    <Container>
      <Title>Meus Livros</Title>
      <BookControls onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
      <BookList books={filteredAndSortedBooks} />
    </Container>
  );
}
