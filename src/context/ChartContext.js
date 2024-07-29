import React, { createContext, useContext, useState } from 'react';

export const ChartContext = createContext(null);

export const ChartProvider = ({ children }) => {
  const [chartData, setChartData] = useState(null);

  return <ChartContext.Provider value={{ chartData, setChartData }}>{children}</ChartContext.Provider>;
};
export const useData = () => useContext(ChartContext);
