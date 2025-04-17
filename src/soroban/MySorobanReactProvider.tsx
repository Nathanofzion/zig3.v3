import { mainnet, standalone, testnet } from '@soroban-react/chains';
import { SorobanReactProvider } from '@soroban-react/core';
import { freighter } from '@soroban-react/freighter';
import { lobstr } from '@soroban-react/lobstr';
import { ChainMetadata, Connector, WalletChain } from '@soroban-react/types';
import { xbull } from '@soroban-react/xbull';
import useMounted from 'hooks/useMounted';
import passkey from 'lib/passkey';

// Set allowed chains:
const chains: ChainMetadata[] =
  process.env.NODE_ENV === 'production' ? [testnet, mainnet] : [standalone, testnet, mainnet];

// Set chain by default:
// Helper function
const findWalletChainByName = (name: string): WalletChain | undefined => {
  return chains.find((chain) => chain.id === name);
};

// Get the active chain based on the environment variable or default to testnet
const activeChainName = process.env.NEXT_PUBLIC_DEFAULT_NETWORK || 'testnet';
const activeChain: WalletChain = findWalletChainByName(activeChainName) || testnet;

// Set allowed connectors
const connectors: Connector[] = [freighter(), xbull(), lobstr(), passkey()];

export default function MySorobanReactProvider({ children }: { children: React.ReactNode }) {
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <SorobanReactProvider
      chains={chains}
      appName={'Soroswap'}
      connectors={connectors}
      activeChain={activeChain}
    >
      {children}
    </SorobanReactProvider>
  );
}
