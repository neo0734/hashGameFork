import { useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { message, Input, Button } from 'antd';
import globalStore from '../../pages/globalStore';
import { formatNumber, handleTransactionError } from '@/assets/util';
import { observer } from 'mobx-react-lite';
import store from '../../store/index.ts';
import { ZkloginClient } from '@/txsdk/zklogin';
import { SuiClient, getFullnodeUrl } from '@onelabs/sui/client';
import { useCurrentAccount, useSuiClient } from '@onelabs/dapp-kit';
import { Transaction } from '@onelabs/sui/transactions';
import { get } from 'lodash';
import { getBalanceFetch } from '@/server/pay.ts';

const { TextArea } = Input;
export default observer(() => {
  const [payAddress, setPayAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const currentAccount = useCurrentAccount();
  const suiClient = useRef<any>(null);
  const [selectedTokenDecimals, setSelectedTokenDecimals] = useState<number>(9);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    // 验证输入是否为有效数字且不大于100
    if (isNaN(value)) {
      message.info(t('home.Pleaseentervalidnumbe'));
    } else if (value > (globalStore.amount as number) / 1000000000) {
      message.info(t('home.nsufficientbalance'));
    } else {
      setAmount(value);
    }
  };

  const getTokenDecimals = async (coinType: string) => {
    const tokenDecimals = await suiClient.current
      ?.getCoinMetadata({ coinType })
      .then((res: any) => res.decimals)
      .catch(() => 9);
    return tokenDecimals;
  };

  const getBalacne = async () => {
    try {
      const balanceResult = await getBalanceFetch(
        store.getState().zkLoginData?.zkloginUserAddress,
        process.env.UMI_APP_COINTYPE || ''
      );
      globalStore.setAmount(get(balanceResult, 'data.result.totalBalance', 0));
    } catch (error) {}
  };

  const onSubmit = async () => {
    console.log(suiClient.current, 'suiClient.current');

    try {
      setLoading(true);
      const zkLoginData = store.getState().zkLoginData;
      if (!zkLoginData) throw new Error('zkLogin data not found');
      if (!payAddress) throw new Error('Recipient is required');
      if (!amount || Number(amount) <= 0)
        throw new Error('Amount should be greater than 0');

      const toAtomic = (val: string, decimals: number): bigint => {
        const [i, f = ''] = String(val).split('.');
        const frac = (f + '0'.repeat(decimals)).slice(0, decimals);
        return BigInt(i + frac);
      };

      const decimals = selectedTokenDecimals || 0;
      const amountAtomic = toAtomic(amount as any, decimals);

      const tx = new Transaction();

      //2.查找并且分割代币
      const coins = await suiClient.current?.getCoins({
        owner: zkLoginData.zkloginUserAddress,
        coinType: process.env.UMI_APP_COINTYPE || '',
        limit: 10,
      });

      const coinIds = coins?.data?.map((c: any) => c.coinObjectId) || [];
      if (!coinIds.length) throw new Error('Insufficient balance');
      const primary = tx.object(coinIds[0]);
      if (coinIds.length > 1) {
        tx.mergeCoins(
          primary,
          coinIds.slice(1).map((id: string) => tx.object(id))
        );
      }
      const [split] = tx.splitCoins(primary, [tx.pure.u64(amountAtomic)]);
      tx.transferObjects([split], payAddress);
      const zkloginClient = new ZkloginClient(suiClient.current as any);
      const result = await zkloginClient.sendTransaction(
        tx,
        process.env.UMI_APP_COINTYPE!.toLowerCase() === '0x2::oct::oct'
      );
      console.log('transfer executed:', result);
      message.success(t('home.transfersent'));
      setLoading(false);
      setTimeout(() => {
        getBalacne();
      }, 1000);
    } catch (error) {
      setLoading(false);
      handleTransactionError(
        error,
        () => message.info(t('home.cancelledtransaction')),
        () =>
          message.error(
            t('home.sendFailed') +
              ':' +
              ((error as any)?.message || JSON.stringify(error))
          )
      );
      throw error;
    }
  };

  useEffect(() => {
    if (!suiClient.current) {
      suiClient.current = new SuiClient({
        url: process.env.UMI_APP_OCT_RPC_URL!,
      });
    }
  }, []);
  return (
    <div className="h-full">
      <div className="h-[calc(100%-76px)] overflow-y-auto">
        <div className="rounded-2xl  p-[16px] bg-[#F422FF33] text-[#F422FF] flex w-full mt-[24px] ">
          <img
            src="/home/gantan.png"
            alt="钱包"
            className="w-[20px] h-[20px] object-contain"
          />
          <span className=" text-[14px] font-bold pl-[8px]">
            {t('home.ConfirmThe')}
          </span>
        </div>
        <div className="flex items-center justify-between w-full pt-[32px]">
          <span className="text-lg font-bold text-white">
            {t('home.SelectToken')}
          </span>
        </div>
        <div className="rounded-3xl p-[16px] bg-[#414043] flex items-center justify-between w-full mt-[24px]">
          <div className="flex items-center">
            <div className="bg-[#e3e6ec] w-[24px] h-[24px] rounded-3xl flex items-center justify-center">
              <img
                src="/home/usdh.png"
                className="w-[36px] h-[36px] object-contain"
              />
            </div>
            <span className="text-[16px] pl-[8px] text-white">USDH</span>
          </div>
        </div>
        <div className="flex items-center justify-between w-full text-white pt-[24px]">
          <span className="text-lg font-bold">
            {t('home.ReceivingAddress')}
          </span>
        </div>
        <div className="rounded-3xl h-[160px] p-[16px] bg-[#414043]  w-full mt-[24px] ">
          <TextArea
            placeholder={t('home.EnterOneChain')}
            value={payAddress}
            rows={4}
            onChange={(e) => setPayAddress(e.target.value)}
            className="bg-gray-600 border border-gray-500 text-white resize-none placeholder:text-gray-300 focus:border-white focus:ring-1 focus:ring-white"
            style={{
              background: '#414043',
              border: '1px solid #414043',
              outline: 'none',
              resize: 'none',
              overflow: 'auto',
            }}
          />
        </div>
        <div className="flex items-center justify-between w-full pt-[24px]">
          <span className="text-lg font-bold text-white">
            {t('home.Amount')}
          </span>
          <div className="flex items-center text-[12px] rounded-2xl px-[8px] py-[3px]">
            <span className="text-[#BDBCBE]">{t('Balance')}:</span>
            <span className="text-[#fff] pl-[4px] font-bold pr-[4px]">
              {formatNumber(globalStore.amount / 1000000000, 2)}
            </span>
            <span className="text-[#BDBCBE]">USDH</span>
          </div>
        </div>
        <div className="w-full mt-[16px]">
          <div className="py-[8px] px-[16px] rounded-2xl p-[16px] bg-[#414043] flex justify-between items-center w-full">
            <Input
              placeholder="0"
              value={amount || ''}
              onChange={handleAmountChange}
              className="bg-gray-600 border border-gray-500 text-white placeholder:text-gray-300 focus:border-white focus:ring-1 focus:ring-white"
              style={{
                background: '#414043',
                border: '1px solid #414043',
                outline: 'none',
                resize: 'none',
                MozAppearance: 'textfield',
                WebkitAppearance: 'none',
              }}
            />
            <div
              className="text-[#fff] whitespace-nowrap text-[14px] font-bold bg-[#F422FF] py-[8px] px-[24px] rounded-xl cursor-pointer"
              onClick={() => {
                setAmount((globalStore.amount as number) / 1000000000);
              }}
            >
              {t('home.All')}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-[24px] pb-4">
        <Button
          loading={loading}
          className="w-full h-[53px] 
          !border-none 
          line-height-[53px] !rounded-xl !bg-[#F422FF] !text-white !text-[16px] text-center cursor-pointer flex items-center justify-center font-bold"
          onClick={() => {
            if (!amount || !payAddress) {
              message.error(t('home.Pleaseenter'));
              return;
            }
            onSubmit();
            //   navigate('/transferCheck');
          }}
        >
          {t('common.confirm')}
        </Button>
      </div>
    </div>
  );
});
