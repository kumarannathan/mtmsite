import React from "react";
import styled, { keyframes } from "styled-components";

// Fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(24px);}
  to { opacity: 1; transform: translateY(0);}
`;

const CardWrapper = styled.section<{ bg: string }>`
  width: 100%;
  min-height: 270px;
  border-radius: 28px;
  box-shadow: 0 8px 32px rgba(44,44,84,0.10);
  background: 
    linear-gradient(120deg, rgba(245, 236, 225, 0.92) 60%, rgba(210, 225, 210, 0.7) 100%),
    ${({ bg }) => `url(${bg}) center center/cover no-repeat`};
  display: flex;
  align-items: center;
  padding: 3.5rem 2.5rem;
  margin: 0 auto 2.5rem auto;
  position: relative;
  overflow: hidden;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem 1rem;
    min-height: 180px;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, rgba(255,255,255,0.55) 60%, rgba(210, 225, 210, 0.18) 100%);
    z-index: 0;
    border-radius: 28px;
    pointer-events: none;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  color: #25332a;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${fadeIn} 1.1s cubic-bezier(.4,0,.2,1);
`;

const Heading = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2.3rem;
  font-weight: 800;
  margin: 0;
  line-height: 1.13;
  color: #25332a;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 12px rgba(245,236,225,0.12);
  @media (max-width: 700px) {
    font-size: 1.35rem;
  }
`;

const Subtext = styled.p`
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  font-size: 1.13rem;
  font-weight: 400;
  margin: 0;
  color: #4d5c51;
  @media (max-width: 700px) {
    font-size: 0.99rem;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(90deg, #b7eac7 0%, #a3d9a5 100%);
  color: #234c2e;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  font-weight: 700;
  font-size: 1.08rem;
  border: none;
  border-radius: 999px;
  padding: 0.82rem 2.4rem;
  margin-top: 0.5rem;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(34,197,94,0.10);
  transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
  animation: ${fadeIn} 1.5s cubic-bezier(.4,0,.2,1);

  &:hover {
    background: linear-gradient(90deg, #a3d9a5 0%, #b7eac7 100%);
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 4px 18px rgba(34,197,94,0.18);
  }
`;

type RelaxationHeroCardProps = {
  backgroundImage: string;
  heading?: string;
  subtext?: string;
  ctaText?: string;
  onCtaClick?: () => void;
};

const RelaxationHeroCard: React.FC<RelaxationHeroCardProps> = ({
  backgroundImage,
  heading = "Experience Relaxation Like Never Before",
  subtext = "Join us today to book your perfect massage session and unwind in style.",
  ctaText = "Get Started",
  onCtaClick,
}) => (
  <CardWrapper bg={backgroundImage}>
    <Content>
      <Heading>{heading}</Heading>
      <Subtext>{subtext}</Subtext>
      <CTAButton onClick={onCtaClick}>{ctaText}</CTAButton>
    </Content>
  </CardWrapper>
);

export default RelaxationHeroCard;