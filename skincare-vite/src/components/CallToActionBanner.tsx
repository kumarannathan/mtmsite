import React from 'react';
import styled from 'styled-components';

interface CallToActionBannerProps {
  imageUrl: string;
  heading: string;
  subtext: string;
  buttonText: string;
  onClick: () => void;
}

const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 24px;
  overflow: hidden;
  min-height: 260px;
  display: flex;
  align-items: stretch;
  background: #222;
  box-shadow: 0 8px 32px rgba(27,77,62,0.10);
  @media (max-width: 700px) {
    flex-direction: column;
    min-height: 320px;
  }
`;

const BgImage = styled.div<{ imageUrl: string }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: url(${props => props.imageUrl}) center center/cover no-repeat;
  z-index: 1;
  filter: blur(0.5px) brightness(0.92);
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(20,30,20,0.72) 38%, rgba(20,30,20,0.18) 100%);
  z-index: 2;
`;

const Content = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 48px;
  min-width: 0;
  width: 60%;
  @media (max-width: 700px) {
    width: 100%;
    padding: 32px 20px;
    align-items: flex-start;
  }
`;

const Heading = styled.h2`
  color: #fff;
  font-family: 'Inter', 'Arial', sans-serif;
  font-size: 2.3rem;
  font-weight: 700;
  margin-bottom: 18px;
  line-height: 1.15;
  text-shadow: 0 2px 12px rgba(0,0,0,0.18);
  @media (max-width: 700px) {
    font-size: 1.5rem;
  }
`;

const Subtext = styled.p`
  color: #e6e6e6;
  font-size: 1.08rem;
  font-weight: 400;
  margin-bottom: 32px;
  line-height: 1.5;
  text-shadow: 0 1px 6px rgba(0,0,0,0.13);
  @media (max-width: 700px) {
    font-size: 1rem;
    margin-bottom: 24px;
  }
`;

const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #219150;
  color: #fff;
  font-size: 1.08rem;
  font-weight: 600;
  border: none;
  border-radius: 999px;
  padding: 12px 28px 12px 22px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(34, 197, 94, 0.10);
  transition: background 0.18s, transform 0.18s;
  outline: none;
  &:hover {
    background: #176c3a;
    transform: translateY(-2px) scale(1.03);
  }
`;

const ArrowIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" fill="#fff"/>
    <path d="M10 8l4 4-4 4" stroke="#219150" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CallToActionBanner: React.FC<CallToActionBannerProps> = ({
  imageUrl,
  heading,
  subtext,
  buttonText,
  onClick,
}) => {
  return (
    <BannerWrapper>
      <BgImage imageUrl={imageUrl} />
      <GradientOverlay />
      <Content>
        <Heading>{heading}</Heading>
        <Subtext>{subtext}</Subtext>
        <CTAButton onClick={onClick}>
          {buttonText}
          <ArrowIcon />
        </CTAButton>
      </Content>
    </BannerWrapper>
  );
};

export default CallToActionBanner; 