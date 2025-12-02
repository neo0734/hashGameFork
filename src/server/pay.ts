import axios from 'axios';

let tempraryToken = {
  headers: {
    Authorization: 'Bearer DkT23hmupUdS6xZh8Eeq',
    'X-Chain-Network': 'mainnet',
  },
};
export const getBalanceFetch = (
  zkLoginUserAddress: string,
  tokenConfig: string
) => {
  return axios.post(process.env.UMI_APP_OCT_RPC_URL || '', {
    jsonrpc: '2.0',
    id: 1,
    method: 'suix_getBalance',
    params: [zkLoginUserAddress, tokenConfig],
  });
};

export const gasReserve = (params: any) => {
  return axios.post(
    'https://friend.onepoker.cc/gas/reserve',
    params,
    tempraryToken
  );
};
export const executeTx = (params: any) => {
  return axios.post(
    'https://friend.onepoker.cc/gas/executeTx',
    params,
    tempraryToken
  );
};
