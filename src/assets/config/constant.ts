export const CLIENT_ID = process.env.UMI_APP_CLIENT_ID || '';

// export const REDIRECT_URI = "https://sui-zklogin.vercel.app/";
// export const REDIRECT_URI = "https://rwa.deltax.online/waiting";
export const REDIRECT_URI =
  import.meta.env.MODE === 'test'
    ? 'http://localhost:8003/waiting'
    : window.location.origin.replace('www.', '') + '/waiting'; //根据环境变量切换 本地开发环境 线上环境 测试环境
// export const REDIRECT_URI = process.env.NODE_ENV === 'development' ?"http://localhost:8000/waiting": window.location.origin + "/waiting"; //根据环境变量切换 本地开发环境 线上环境 测试环境

export const GET_SALT_URL = process.env.UMI_APP_GET_SALT_URL || '';

export const KEY_PAIR_SESSION_STORAGE_KEY = 'hash_ephemeral_key_pair';

export const USER_SALT_LOCAL_STORAGE_KEY = 'hash_user_salt_key_pair';

export const RANDOMNESS_SESSION_STORAGE_KEY = 'hash_randomness_key_pair';

export const MAX_EPOCH_LOCAL_STORAGE_KEY = 'hash_max_epoch_key_pair';

export const ZKLOGIN_EXPIRE_END = 'hash_zklogin_expire_end';

export const ZKLOGIN_EXPIRE_DAY = 10;

//OCT
export const OCT_RPC_URL = process.env.UMI_APP_OCT_RPC_URL || '';

export const OCT_PROVER_ENDPOINT =
  process.env.UMI_APP_OCT_PROVER_ENDPOINT || '';

export const ZERO_ADDRESS =
  '0x0000000000000000000000000000000000000000000000000000000000000000';
