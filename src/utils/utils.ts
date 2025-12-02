import testnet from './testnet.json';
import mainnet from './mainnet.json';
export const getLastNumber = (str: string) => {
  // 从字符串末尾开始遍历
  for (let i = str.length - 1; i >= 0; i--) {
    // 检查当前字符是否为数字
    if (!isNaN(Number(str[i])) && str[i] !== ' ') {
      return str[i];
    }
  }
  // 如果没有找到数字，返回 null
  return null;
};
export const getLastTwoChars = (str: string) => {
  // 从字符串末尾开始遍历
  return [str.slice(-2, -1), str.slice(-1)];
};

const onechain_testnet = testnet;
const onechain_mainnet = mainnet;

const isMainnet = String(process.env.UMI_APP_IS_MAINNET)
  .toLowerCase()
  .replace(/\s+/g, '')
  .replace(/"/g, '');

const currentNetwork =
  isMainnet === 'true' || isMainnet === '1'
    ? onechain_mainnet
    : onechain_testnet;

export const rightNetwork = currentNetwork.rightNetwork;

export const chainName = currentNetwork.chainName;

export const usdhName = 'USDH';

/**
 * 获取URL查询参数
 * @param paramName 参数名
 * @returns 参数值，如果不存在返回null
 */
export const getQueryParam = (paramName: string): string | null => {
  const params = new URLSearchParams(window.location.search);
  return params.get(paramName);
};

/**
 * 获取所有URL查询参数
 * @returns 包含所有查询参数的对象
 */
export const getAllQueryParams = (): Record<string, string> => {
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  
  params.forEach((value, key) => {
    result[key] = value;
  });
  
  return result;
};
