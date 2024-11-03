import { SorobanRpc } from '@stellar/stellar-sdk';
import { PasskeyKit, SACClient } from 'passkey-kit';

const NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE = process.env.NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE
const NEXT_PUBLIC_STELLAR_RPC_URL = process.env.NEXT_PUBLIC_STELLAR_RPC_URL
const NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS
const NEXT_PUBLIC_NATIVE_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NATIVE_CONTRACT_ADDRESS

export const rpc = new SorobanRpc.Server(NEXT_PUBLIC_STELLAR_RPC_URL);

export const account = new PasskeyKit({
    rpcUrl: NEXT_PUBLIC_STELLAR_RPC_URL,
    networkPassphrase: NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE,
    factoryContractId: NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS,
});

export const sac = new SACClient({
    rpcUrl: NEXT_PUBLIC_STELLAR_RPC_URL,
    networkPassphrase: NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE,
});

export const native = sac.getSACClient(NEXT_PUBLIC_NATIVE_CONTRACT_ADDRESS);

export async function send(xdr: string) {
    return fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify({
            xdr,
        }),
    }).then(async (res) => {
        if (res.ok) return res.json();
        else throw await res.text();
    });
}

export async function getContractId(signer: string) {
    return fetch(`/api/contract-id/${signer}`).then(async (res) => {
        if (res.ok) return res.text();
        else throw await res.text();
    });
}

export async function fundContract(address: string) {
    return fetch(`/api/fund/${address}`).then(async (res) => {
        if (res.ok) return res.json();
        else throw await res.text();
    });
}
