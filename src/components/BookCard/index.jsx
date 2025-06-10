import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProgressDialog from '../ProgressDialog';

// Styled Components
const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Title = styled.h3`
  color: #333;
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
`;

const Author = styled.p`
  color: #666;
  margin: 0 0 1rem 0;
  font-style: italic;
`;

const ProgressContainer = styled.div`
  background: #f0f0f0;
  border-radius: 4px;
  height: 8px;
  margin: 1rem 0;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  background: #1a73e8;
  height: 100%;
  width: ${({ $percentage }) => $percentage}%;
  transition: width 0.3s ease;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 0.875rem;
`;

const getStatusStyles = (status) => {
  const styles = {
    'não iniciado': {
      background: '#f0f0f0',
      color: '#616161',
    },
    lendo: {
      background: '#e3f2fd',
      color: '#1565c0',
    },
    concluído: {
      background: '#e8f5e9',
      color: '#2e7d32',
    },
  };
  return styles[status] || styles['não iniciado'];
};

const Status = styled.span`
  background: ${({ $status }) => getStatusStyles($status).background};
  color: ${({ $status }) => getStatusStyles($status).color};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  text-transform: capitalize;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
  flex: 1;

  &:hover {
    opacity: 0.9;
  }
`;

const UpdateButton = styled(Button)`
  background-color: #1a73e8;
  color: white;
`;

const EditLink = styled(Link)`
  background-color: #34a853;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.875rem;
  flex: 1;
  text-align: center;

  &:hover {
    opacity: 0.9;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ea4335;
  color: white;
`;

const BookCard = memo(({ book, onProgressUpdate, onDeleteClick }) => {
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  const progressPercentage = (book.currentPage / book.totalPages) * 100;

  const handleProgressSave = (updatedBook) => {
    onProgressUpdate(updatedBook);
    setShowProgressDialog(false);
  };

  return (
    <>
      <Card>
        <Title>{book.title}</Title>
        <Author>{book.author}</Author>
        <ProgressContainer>
          <ProgressBar $percentage={progressPercentage} />
        </ProgressContainer>
        <Details>
          <span key="pages">
            {book.currentPage} / {book.totalPages} páginas
          </span>
          <Status key="status" $status={book.status}>
            {book.status}
          </Status>
        </Details>
        <ActionButtons>
          <UpdateButton key="update" onClick={() => setShowProgressDialog(true)}>
            Atualizar Progresso
          </UpdateButton>
          <EditLink key="edit" to={`/edit/${book.id}`}>
            Editar
          </EditLink>
          <DeleteButton key="delete" onClick={() => onDeleteClick(book)}>
            Excluir
          </DeleteButton>
        </ActionButtons>
      </Card>

      {showProgressDialog && (
        <ProgressDialog
          book={book}
          onSave={handleProgressSave}
          onCancel={() => setShowProgressDialog(false)}
        />
      )}
    </>
  );
});

BookCard.displayName = 'BookCard';

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onProgressUpdate: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default BookCard;
