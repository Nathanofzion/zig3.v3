import { Connector } from '@soroban-react/types';
import { StrKey } from '@stellar/stellar-sdk';
import { PasskeyKit } from 'passkey-kit';

import passkeyImage from '/src/assets/images/passkey.png';

const STELLAR_RPC_URL = process.env.NEXT_PUBLIC_STELLAR_RPC_URL;
const STELLAR_NETWORK_PASSPHRASE = process.env.NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE;
const FACTORY_CONTRACT_ID = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS;

const passkey = (): Connector => {
    const passkeyKit = new PasskeyKit({
        rpcUrl: STELLAR_RPC_URL,
        networkPassphrase: STELLAR_NETWORK_PASSPHRASE,
        factoryContractId: FACTORY_CONTRACT_ID
    });

    let connected = false;
    let publicKey: string | null = null;

    return {
        id: 'passkey',
        name: "PasskeyID",
        shortName: "Passkey",
        iconUrl: passkeyImage.src,
        iconBackground: '',
        installed: true,

        isConnected: async () => connected,

        getNetworkDetails: async () => {
            return {
                network: 'TESTNET',
                networkPassphrase: STELLAR_NETWORK_PASSPHRASE,
                networkUrl: STELLAR_RPC_URL
            };
        },

        getPublicKey: async () => {
            if (!connected || !publicKey) {
                const wallet = await passkeyKit.createWallet("Zafegard", "Zafegard Admin");
                const contractBytes = StrKey.decodeContract(wallet.contractId);
                connected = true;
                publicKey = StrKey.encodeEd25519PublicKey(contractBytes.slice(0, 32));
            }
            return publicKey;
        },

        signTransaction: async (xdr: string, _opts?: {
            network?: string;
            networkPassphrase?: string;
            accountToSign?: string;
        }) => {
            if (!connected)
                throw new Error('Not connected');

            const result = await passkeyKit.sign(xdr);
            return result.signedTxXdr;
        }
    }
}

export default passkey;
