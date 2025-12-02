import testnet from './testnet.json';
import mainnet from './mainnet.json';
import { tokenList } from './token';



const onechain_testnet = testnet
const onechain_mainnet = mainnet

const isMainnet = String(process.env.UMI_APP_IS_MAINNET).toLowerCase()
  .replace(/\s+/g, '')
  .replace(/"/g, '')
const currentNetwork = (isMainnet === 'true' || isMainnet === '1') ? onechain_mainnet : onechain_testnet
export default currentNetwork
export const rightNetwork = currentNetwork.rightNetwork
export const chainName = currentNetwork.chainName