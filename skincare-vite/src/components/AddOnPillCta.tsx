import React from 'react';
import styled from 'styled-components';

interface AddOnPillCTAProps {
  onClick: () => void;
}

const Pill = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8fff9;
  border-radius: 999px;
  box-shadow: 0 2px 12px rgba(27,77,62,0.08);
  padding: 8px 20px 8px 16px;
  max-width: 420px;
  font-weight: 500;
  font-family: 'Inter', Arial, sans-serif;
  gap: 12px;
  margin-top: -20px;
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 12px;
    max-width: 98vw;
    gap: 4px;
    margin: 1px auto;
  }
`;

const MainText = styled.span`
  color: #1B4D3E;
  font-size: 1.13rem;
  font-weight: 600;
  letter-spacing: 0.01em;
`;

const LearnMore = styled.button`
  text-decoration: underline;
  background: none;
  border: none;
  color: #19934c;
  font-size: 1rem;
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

const AddOnPillCTA: React.FC<AddOnPillCTAProps> = ({ onClick }) => (
  <Pill>
    <MainText>Therapy add ons available</MainText>
    <LearnMore onClick={onClick}>learn more</LearnMore>
  </Pill>
);

export default AddOnPillCTA; 