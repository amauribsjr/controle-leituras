import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BookCard from '../BookCard';
import ConfirmDialog from '../ConfirmDialog';
import { updateBook, deleteBook } from '../../utils/localStorage';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin: 2rem 0;
`;

export default function BookList({ books: initialBooks }) {
  const [books, setBooks] = useState(initialBooks);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    setBooks(initialBooks);
  }, [initialBooks]);

  if (!books.length) {
    return <EmptyMessage>Nenhum livro cadastrado ainda.</EmptyMessage>;
  }

  const handleProgressUpdate = (updatedBook) => {
    updateBook(updatedBook.id, updatedBook);
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
  };

  const handleDeleteClick = (book) => {
    setBookToDelete(book);
  };

  const handleConfirmDelete = () => {
    if (bookToDelete) {
      deleteBook(bookToDelete.id);
      setBooks(books.filter((book) => book.id !== bookToDelete.id));
      setBookToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setBookToDelete(null);
  };

  return (
    <>
      <Grid>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onProgressUpdate={handleProgressUpdate}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </Grid>

      {bookToDelete && (
        <ConfirmDialog
          title="Confirmar exclusão"
          message={`Tem certeza que deseja excluir o livro "${bookToDelete.title}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      totalPages: PropTypes.number.isRequired,
      currentPage: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};
