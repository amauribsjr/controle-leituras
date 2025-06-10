import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { addBook, updateBook } from '../../utils/localStorage';
import { searchBookSuggestions } from '../../utils/bookApi';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

const Label = styled.label`
  color: #333;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const SuggestionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
`;

const SuggestionItem = styled.div`
  padding: 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  color: #333;

  &:hover {
    background-color: #f5f5f5;
  }

  .author {
    font-size: 0.9rem;
    color: #666;
    margin-top: 4px;
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1557b0;
  }
`;

const ErrorMessage = styled.span`
  color: #d32f2f;
  font-size: 0.875rem;
`;

export default function BookForm({ editBook }) {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    title: editBook?.title || '',
    author: editBook?.author || '',
    totalPages: editBook?.totalPages || '',
    currentPage: editBook?.currentPage || 0,
    status: editBook?.status || 'não iniciado',
  });
  const [error, setError] = useState('');

  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({ ...prev, title: newTitle }));

    if (newTitle.length >= 3) {
      try {
        const suggestions = await searchBookSuggestions(newTitle);
        setSuggestions(suggestions);
      } catch {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setFormData((prev) => ({
      ...prev,
      title: suggestion.title,
      author: suggestion.author || '',
      totalPages: suggestion.totalPages || prev.totalPages,
    }));
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalPagesNum = parseInt(formData.totalPages, 10);
    if (isNaN(totalPagesNum) || totalPagesNum <= 0) {
      setError('O número de páginas deve ser maior que zero');
      return;
    }

    const bookData = {
      ...formData,
      id: editBook?.id || uuidv4(),
      totalPages: totalPagesNum,
      currentPage: parseInt(formData.currentPage, 10) || 0,
    };

    try {
      if (editBook) {
        updateBook(bookData.id, bookData);
      } else {
        addBook(bookData);
      }
      navigate('/');
    } catch {
      setError('Erro ao salvar o livro. Por favor, tente novamente.');
    }
  };

  return (
    <FormContainer>
      <Title>{editBook ? 'Editar Livro' : 'Adicionar Novo Livro'}</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Título</Label>
          <Input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleTitleChange}
            required
          />
          {suggestions.length > 0 && (
            <SuggestionsContainer>
              {suggestions.map((suggestion, index) => (
                <SuggestionItem key={index} onClick={() => handleSuggestionSelect(suggestion)}>
                  <div>{suggestion.title}</div>
                  <div className="author">by {suggestion.author}</div>
                </SuggestionItem>
              ))}
            </SuggestionsContainer>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="author">Autor</Label>
          <Input
            type="text"
            id="author"
            value={formData.author}
            onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="totalPages">Número de Páginas</Label>
          <Input
            type="number"
            id="totalPages"
            min="1"
            value={formData.totalPages}
            onChange={(e) => setFormData((prev) => ({ ...prev, totalPages: e.target.value }))}
            required
          />
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit">{editBook ? 'Salvar Alterações' : 'Adicionar Livro'}</Button>
      </Form>
    </FormContainer>
  );
}

BookForm.propTypes = {
  editBook: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }),
};
