import styled from 'styled-components';
import PropTypes from 'prop-types';

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
  min-width: 200px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
  font-size: 1rem;
`;

export default function BookControls({ onFilterChange, onSortChange }) {
  return (
    <Controls>
      <SearchInput
        type="text"
        placeholder="Pesquisar por título ou autor..."
        onChange={(e) => onFilterChange('search', e.target.value)}
      />
      <Select onChange={(e) => onFilterChange('status', e.target.value)}>
        <option value="">Todos os status</option>
        <option value="não iniciado">Não iniciado</option>
        <option value="lendo">Lendo</option>
        <option value="concluído">Concluído</option>
      </Select>
      <Select onChange={(e) => onSortChange(e.target.value)}>
        <option value="title">Ordenar por título</option>
        <option value="author">Ordenar por autor</option>
        <option value="progress">Ordenar por progresso</option>
        <option value="status">Ordenar por status</option>
      </Select>
    </Controls>
  );
}

BookControls.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};
