import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface AddOnPillCTAProps {
  onClick: () => void;
}

const Pill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8fff9;
  border-radius: 999px;
  box-shadow: 0 2px 12px rgba(27,77,62,0.08);
  padding: 12px 20px;
  max-width: 420px;
  font-weight: 500;
  font-family: 'Inter', Arial, sans-serif;
  gap: 8px;
  margin-top: -20px;
  overflow: hidden;
  text-align: center;
  @media (max-width: 500px) {
    padding: 8px 12px;
    width: 100%;
    max-width: 100vw;
    box-sizing: border-box;
    gap: 4px;
    margin: 0;
  }
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

const MainText = styled.span`
  color: #1B4D3E;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;
`;

const LearnMore = styled.button`
  text-decoration: underline;
  background: none;
  border: none;
  color: #19934c;
  font-size: 0.9rem;
  font-weight: 400;
  text-transform: lowercase;
  cursor: pointer;
  padding: 0 0 0 0px;
  transition: color 0.18s;
  outline: none;
  &:hover {
    color: #0F3D1F;
    text-decoration: underline;
  }
`;

const AddOnPillCTA: React.FC<AddOnPillCTAProps> = ({ onClick }) => {
  const { t } = useTranslation();
  
  return (
    <Pill>
      <MainText>learn more about our add-ons</MainText>
      <LearnMore onClick={onClick}>learn more</LearnMore>
    </Pill>
  );
};

export default AddOnPillCTA; 