import React, { createContext, useContext } from 'react';

// Create context for banner visibility
export const BannerContext = createContext({
  isBannerVisible: true,
  setIsBannerVisible: () => {},
});

export const useBanner = () => useContext(BannerContext);

