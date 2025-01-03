// next-env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_STELLAR_RPC_URL: string;
        NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE: string;
        NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS: string;
        NEXT_PUBLIC_NATIVE_CONTRACT_ADDRESS: string;

        NEXT_PUBLIC_LAUNCHTUBE_URL: string;
        NEXT_PUBLIC_MERCURY_URL: string;

        NEXT_PRIVATE_LAUNCHTUBE_JWT: string;
        NEXT_PRIVATE_MERCURY_JWT: string;
    }
}