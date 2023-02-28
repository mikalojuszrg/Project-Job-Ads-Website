import styled from "styled-components";
import Modal from "react-modal";
import { useContext, ReactNode } from "react";
import { ModalContext } from "../../context/ModalContext";
import { borderRadius, mainBgColor, mediumGrey } from "../../const/styles";
import Button from "../Button/Button";

type StyledModalProps = {
  children: ReactNode;
  modalSize: string;
};

const StyledModal = ({ children, modalSize }: StyledModalProps) => {
  const { modalIsOpen, closeModal } = useContext(ModalContext);

  return (
    <Container
      modalSize={modalSize}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
    >
      {children}
      <Button greyVariant={true} onClick={closeModal} title="close" />
    </Container>
  );
};

export default StyledModal;

const Container = styled(Modal)<{ modalSize: string }>`
  min-height: 18rem;
  background-color: ${mainBgColor};
  color: ${mediumGrey};
  margin: 50px 15vw;
  border-radius: ${borderRadius};
  padding: 24px 10vw;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.25rem;

  ${({ modalSize }) => {
    if (modalSize === "large") {
      return `
        width: 500px;
        max-height: 90vh;
        overflow: auto;
      `;
    } else if (modalSize === "medium") {
      return `
        width: 400px;
        max-height: 90vh;
        overflow: auto;
      `;
    } else if (modalSize === "small") {
      return `
        width: 300px;
        max-height: 90vh;
        overflow: auto;
    `;
    }
  }}
`;
