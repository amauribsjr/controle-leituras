import styled from 'styled-components';
import PropTypes from 'prop-types';

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

function BookSuggestions({ suggestions, onSelect }) {
  if (!suggestions.length) return null;

  return (
    <SuggestionsContainer>
      {suggestions.map((suggestion, index) => (
        <SuggestionItem key={index} onClick={() => onSelect(suggestion)}>
          <div>{suggestion.title}</div>
          <div className="author">by {suggestion.author}</div>
        </SuggestionItem>
      ))}
    </SuggestionsContainer>
  );
}

BookSuggestions.propTypes = {
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string,
      totalPages: PropTypes.number,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default BookSuggestions;
