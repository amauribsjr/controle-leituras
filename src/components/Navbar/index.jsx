import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #1a73e8;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: bold;
`;

const AddButton = styled(Link)`
  background-color: white;
  color: #1a73e8;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <Container>
        <Logo to="/">Controle de Leituras</Logo>
        <AddButton to="/add">Adicionar Livro</AddButton>
      </Container>
    </Nav>
  );
}
