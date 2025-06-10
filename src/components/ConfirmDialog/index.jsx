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
`;

const Message = styled.p`
  margin: 0 0 1.5rem;
  color: #666;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
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

const ConfirmButton = styled(Button)`
  background-color: #d32f2f;
  color: white;
`;

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <Overlay onClick={onCancel}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ButtonGroup>
          <CancelButton onClick={onCancel}>Cancelar</CancelButton>
          <ConfirmButton onClick={onConfirm}>Confirmar</ConfirmButton>
        </ButtonGroup>
      </Dialog>
    </Overlay>
  );
}

ConfirmDialog.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
