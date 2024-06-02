// src/custom.d.ts
declare module '@rainbow-me/rainbowkit' {
    import { ReactNode } from 'react';
  
    export interface RainbowKitProviderProps {
      children: ReactNode;
      //chains: Chain[];
    }
  
    export const RainbowKitProvider: React.FC<RainbowKitProviderProps>;
  }
  