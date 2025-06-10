import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Dialog = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
`;

const Title = styled.h2`
  margin: 0 0 1rem;
  color: #333;
  font-size: 1.25rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #666;
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

const CancelButton = styled(Button)`
  background-color: #e0e0e0;
  color: #333;
`;

const SaveButton = styled(Button)`
  background-color: #1a73e8;
  color: white;
`;

const ErrorMessage = styled.span`
  color: #d32f2f;
  font-size: 0.875rem;
`;

export default function ProgressDialog({ book, onSave, onCancel }) {
  const [currentPage, setCurrentPage] = useState(book.currentPage);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPage = parseInt(currentPage, 10);

    if (isNaN(newPage)) {
      setError('Por favor, insira um número válido');
      return;
    }

    if (newPage < 0) {
      setError('A página atual não pode ser negativa');
      return;
    }

    if (newPage > book.totalPages) {
      setError(`O livro tem apenas ${book.totalPages} páginas`);
      return;
    }

    const newStatus =
      newPage === 0 ? 'não iniciado' : newPage === book.totalPages ? 'concluído' : 'lendo';

    onSave({
      ...book,
      currentPage: newPage,
      status: newStatus,
    });
  };

  return (
    <Overlay onClick={onCancel}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <Title>Atualizar Progresso</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="currentPage">Página atual</Label>
            <Input
              id="currentPage"
              type="number"
              min="0"
              max={book.totalPages}
              value={currentPage}
              onChange={(e) => setCurrentPage(e.target.value)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </InputGroup>
          <ButtonGroup>
            <CancelButton type="button" onClick={onCancel}>
              Cancelar
            </CancelButton>
            <SaveButton type="submit">Salvar</SaveButton>
          </ButtonGroup>
        </Form>
      </Dialog>
    </Overlay>
  );
}

ProgressDialog.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
