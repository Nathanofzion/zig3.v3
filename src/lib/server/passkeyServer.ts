import { PasskeyServer } from 'passkey-kit';

const NEXT_PUBLIC_STELLAR_RPC_URL = process.env.NEXT_PUBLIC_STELLAR_RPC_URL;
const NEXT_PUBLIC_LAUNCHTUBE_URL = process.env.NEXT_PUBLIC_LAUNCHTUBE_URL;
const NEXT_PUBLIC_MERCURY_URL = process.env.NEXT_PUBLIC_MERCURY_URL;

const NEXT_PRIVATE_LAUNCHTUBE_JWT = process.env.NEXT_PRIVATE_LAUNCHTUBE_JWT;
const NEXT_PRIVATE_MERCURY_JWT = process.env.NEXT_PRIVATE_MERCURY_JWT;

export const server = new PasskeyServer({
    rpcUrl: NEXT_PUBLIC_STELLAR_RPC_URL,
    launchtubeUrl: NEXT_PUBLIC_LAUNCHTUBE_URL,
    launchtubeJwt: NEXT_PRIVATE_LAUNCHTUBE_JWT,
    mercuryUrl: NEXT_PUBLIC_MERCURY_URL,
    mercuryJwt: NEXT_PRIVATE_MERCURY_JWT,
});
