import { PasskeyServer } from 'passkey-kit';

const PUBLIC_STELLAR_RPC_URL = process.env.PUBLIC_STELLAR_RPC_URL;
const PUBLIC_LAUNCHTUBE_URL = process.env.PUBLIC_LAUNCHTUBE_URL;
const PUBLIC_MERCURY_URL = process.env.PUBLIC_MERCURY_URL;

const PRIVATE_LAUNCHTUBE_JWT = process.env.PRIVATE_LAUNCHTUBE_JWT;
const PRIVATE_MERCURY_JWT = process.env.PRIVATE_MERCURY_JWT;

export const server = new PasskeyServer({
    rpcUrl: PUBLIC_STELLAR_RPC_URL,
    launchtubeUrl: PUBLIC_LAUNCHTUBE_URL,
    launchtubeJwt: PRIVATE_LAUNCHTUBE_JWT,
    mercuryUrl: PUBLIC_MERCURY_URL,
    mercuryJwt: PRIVATE_MERCURY_JWT,
});
