import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

type PoliceLocation = {
  police_id: number;
  name: string;
  latitude: number;
  longitude: number;
};

type PoliceLocationContextType = {
  policeLocations: PoliceLocation[];
  setPoliceLocations: (locations: PoliceLocation[]) => void;
};

const PoliceLocationContext = createContext<PoliceLocationContextType | undefined>(undefined);

export const usePoliceLocation = () => {
  const context = useContext(PoliceLocationContext);
  if (context === undefined) {
    throw new Error('usePoliceLocation must be used within a PoliceLocationProvider');
  }
  return context;
};

type PoliceLocationProviderProps = {
  children: ReactNode;
};

export const PoliceLocationProvider: React.FC<PoliceLocationProviderProps> = ({ children }) => {
  const [policeLocations, setPoliceLocations] = useState<PoliceLocation[]>([]);

  const value = useMemo(() => ({ policeLocations, setPoliceLocations }), [policeLocations]);

  return (
    <PoliceLocationContext.Provider value={value}>
      {children}
    </PoliceLocationContext.Provider>
  );
}; 