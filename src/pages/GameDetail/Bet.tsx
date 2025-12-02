import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import gameDetailStore from './GameDetailStore';
import {
  useCurrentAccount,
  useWallets,
  type WalletWithFeatures,
} from '@onelabs/dapp-kit';
import i18n from '../../i18n';
import { useDispatch, useSelector } from 'react-redux';
import store, { setOpenWalletModal } from '@/store';
import { message, Modal, InputNumber } from 'antd';
import { find, get } from 'lodash';
import { CheckCircleTwoTone } from '@ant-design/icons';
import Sound from '@/utils/sound';
import { SuiClient, getFullnodeUrl } from '@onelabs/sui/client';
import { getBalanceFetch } from '@/server/pay';
import globalStore from '../globalStore';

// 获取全局t函数
const t = i18n.t;
const Bet: React.FC<{
  cls?: string;
}> = observer(({ cls = '' }) => {
  // 保留钱包
  // const getWallets = useWallets();
  const [modal, contextHolder] = Modal.useModal();
  const isWalletLogin = useSelector((state: any) => state.isWalletLogin);
  const dispatch = useDispatch();
  // 初始化赌注金额为10,000，_前缀表示此变量可能暂时未使用但保留用于后续功能扩展
  const [_betAmount, setBetAmount] = useState<undefined | number>();
  // 管理向上箭头的hover状态
  const [isUpHovered, setIsUpHovered] = useState(false);
  const [selectedBetItem, setSelectedBetItem] = useState<string | null>(null);
  const [isDownHovered, setIsDownHovered] = useState(false);
  // 管理当前选中的赌注选项
  const [is_loading, setIsLoading] = useState(false);
  const suiClient = useRef<any>(null);
  const zkLoginData = useSelector((state: any) => state.zkLoginData);
  const currentAccount = useCurrentAccount();

  useEffect(() => {
    if (!suiClient.current) {
      suiClient.current = new SuiClient({
        url: process.env.UMI_APP_OCT_RPC_URL!,
      });
    }
  }, []);

  // 金额增加函数
  const increaseAmount = () => {
    setBetAmount((prev) => {
      // 如果当前金额不存在，从10开始
      if (prev === undefined || prev < 10) {
        return 10;
      }
      // 计算增加20%后的金额
      // const increasedAmount = prev * 1.2;
      const increasedAmount = prev + 1;
      // 确保不超过最大限制50000
      return Math.min(Math.round(increasedAmount), 50000);
    });
  };

  // 金额减少函数
  const decreaseAmount = () => {
    setBetAmount((prev) => {
      // 如果当前金额不存在或为0，保持不变
      if (prev === undefined || prev < 10) {
        return 0;
      }
      // 计算减少20%后的金额
      // const decreasedAmount = prev * 0.8;
      const decreasedAmount = prev - 1;
      // 确保不小于最小限制0
      return Math.round(Math.max(decreasedAmount, 0));
    });
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
  const go_transfer = () => {
    gameDetailStore.setIs_loading(true);
    if (zkLoginData || currentAccount) {
      if (!_betAmount) {
        message.error(t('gameDetail.hinttransferAmount'));
        gameDetailStore.setIs_loading(false);
        gameDetailStore.setGameResult('');
        return;
      }
      if (Number(_betAmount) > 50000 || Number(_betAmount) < 10) {
        message.error(t('gameDetail.TransferLimit'));
        gameDetailStore.setIs_loading(false);
        gameDetailStore.setGameResult('');
        return;
      }
      gameDetailStore.setGameResult('loading');
      Sound.play('bet');
      gameDetailStore
        .playGame(
          _betAmount,
          gameDetailStore.selectedItemId as string
          // getWallets as WalletWithFeatures<any>[]
        )
        .then((res: any) => {
          //console.log(res, 'xxcxvxcvxcvxcv');

          if (res.code === 0) {
            // ElMessage({
            //   message: t('hint.transferSuccess'),
            //   type: 'success',
            //   plain: true
            // })
            // const hash = 'Hash: ' + res.digest;
            setTimeout(() => {
              getBalacne();
            }, 500);
            gameDetailStore.setHashCode(res.digest);
            gameDetailStore.setPayoutAmount(res.payout_amount || 0);
            if (res.is_winner) {
              Sound.play('win');
              gameDetailStore.setGameResult('Win');
            } else {
              Sound.play('lose');
              gameDetailStore.setGameResult('Lose');
            }
            setBetAmount(undefined);
          } else {
            message.error(res.error || t('gameDetail.transferFailure'));
          }
        })
        .catch((err: any) => {
          gameDetailStore.setGameResult('');
          message.error(err.error || t('gameDetail.transferFailure'));
        })
        .finally(() => {
          gameDetailStore.setIs_loading(false);
        });
    } else {
      dispatch(setOpenWalletModal(true));
    }
  };

  const betList = [
    {
      name: '10',
      src: '/gameDetail/betNum/1.png',
      onClick: () => {
        setBetAmount((_betAmount || 0) + 10);
        setSelectedBetItem('10');
      },
    },
    {
      name: '20',
      src: '/gameDetail/betNum/5.png',
      onClick: () => {
        setBetAmount((_betAmount || 0) + 20);
        setSelectedBetItem('20');
      },
    },
    {
      name: '50',
      src: '/gameDetail/betNum/10.png',
      onClick: () => {
        setBetAmount((_betAmount || 0) + 50);
        setSelectedBetItem('50');
      },
    },
    {
      name: '100',
      src: '/gameDetail/betNum/50.png',
      onClick: () => {
        setBetAmount((_betAmount || 0) + 100);
        setSelectedBetItem('100');
      },
    },
    {
      name: '500',
      src: '/gameDetail/betNum/100.png',
      onClick: () => {
        setBetAmount((_betAmount || 0) + 500);
        setSelectedBetItem('500');
      },
    },
    {
      name: '1k',
      src: '/gameDetail/betNum/500.png',
      onClick: () => {
        setBetAmount((_betAmount || 0) + 1000);
        setSelectedBetItem('1k');
      },
    },
    {
      name: '2k',
      src: '/gameDetail/betNum/1k.png',
      onClick: () => {
        setBetAmount((_betAmount || 0) + 2000);
        setSelectedBetItem('2k');
      },
    },
    {
      name: '2x',
      src: '/gameDetail/betNum/2x.png',
      onClick: () => {
        setBetAmount((_betAmount || 0) * 2);
        setSelectedBetItem('2x');
      },
    },
  ];

  return (
    <div
      className={`relative w-[439px] h-fit p-4 rounded-lg bg-[#242223] border-2 border-[#F422FF] ${cls}`}
    >
      {/* 标题 */}
      <h2 className="text-white text-xl font-medium mb-4">
        {t('gameDetail.BetAmount')}
      </h2>

      <div
        className="grid grid-cols-4 gap-2 mb-4 px-4 justify-items-center content-center"
        onMouseOut={() => setSelectedBetItem('')}
      >
        {betList.map((item) => (
          <div
            key={item.name}
            onClick={item.onClick}
            className="w-[62px] h-[62px] cursor-pointer relative"
            onFocus={() => setSelectedBetItem(item.name)}
            tabIndex={0}
          >
            {selectedBetItem === item.name && (
              <img
                src={'/gameDetail/betNum/light.png'}
                className={`z-[0] w-[80px] h-[80px] object-cover absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2`}
              />
            )}
            <img
              src={item.src}
              className={`z-[1] w-full h-full object-contain absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2`}
            />
            <span
              className={`z-[1] absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-[12px] 
              ${item.name === '2x' ? 'text-[#110F10]' : 'text-white'} `}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* 金额显示区域 */}
      <div className="relative mb-6">
        <div className="bg-[#393839] rounded-lg  p-2">
          <InputNumber
            formatter={(value) => {
              if (value === null || value === undefined) return '';
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }}
            value={_betAmount}
            onChange={(e) => setBetAmount(Number(e))}
            controls={false}
            className="w-full bg-transparent  hover:bg-transparent focus:bg-transparent 
            border-transparent focus:border-transparent font-bold
            border-none box-shadow-none focus:box-shadow-none focus:outline-none"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              outline: 'none',
              color: '#fff',
              WebkitTextFillColor: '#fff',
              caretColor: '#fff',
              fontWeight: 'bold',
              fontSize: '32px',
            }}
          />
        </div>

        {/* 上下箭头按钮 */}
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
          <div
            onClick={increaseAmount}
            onMouseEnter={() => setIsUpHovered(true)}
            onMouseLeave={() => setIsUpHovered(false)}
            className="w-[24px] h-[24px] object-contain cursor-pointer"
          >
            <img
              src={
                isUpHovered ? `/gameDetail/up.png` : `/gameDetail/upHover.png`
              }
            />
          </div>
          <div
            onClick={decreaseAmount}
            onMouseEnter={() => setIsDownHovered(true)}
            onMouseLeave={() => setIsDownHovered(false)}
            className="w-[24px] h-[24px] object-contain cursor-pointer"
          >
            <img
              src={
                isDownHovered
                  ? `/gameDetail/down.png`
                  : `/gameDetail/downHover.png`
              }
            />
          </div>
        </div>
        {_betAmount && (
          <div
            onClick={() => setBetAmount(undefined)}
            className="absolute right-14 top-1/2 transform cursor-pointer -translate-y-1/2 w-[24px] h-[24px]"
          >
            <img src={`/gameDetail/clear.png`} />
          </div>
        )}
      </div>

      {/* Betting按钮 */}
      <div
        onClick={go_transfer}
        className="w-full cursor-pointer bg-[#F422FF] flex items-center justify-center text-white py-3 rounded-lg font-medium text-[16px] transition-colors mb-6"
      >
        <div className="w-[24px] h-[24px] object-contain">
          <img src={`/gameDetail/betIcon.png`} />
        </div>
        <span className="pl-[2px]">
          {gameDetailStore.gameResult &&
          gameDetailStore.gameResult !== 'loading'
            ? t('gameDetail.BetAgain')
            : t('gameDetail.Betting')}
          {gameDetailStore.is_loading && (
            <span className="inline-block ml-1 animate-pulse">
              <span className="opacity-0 animate-[dot_1.4s_infinite]">.</span>
              <span className="opacity-0 animate-[dot_1.4s_infinite_0.2s]">
                .
              </span>
              <span className="opacity-0 animate-[dot_1.4s_infinite_0.4s]">
                .
              </span>
            </span>
          )}
        </span>
      </div>
      {/* 赔率和交易限额信息 */}
      <div className="border border-dashed border-gray-600 rounded-lg p-4">
        <div className="mb-4">
          <p className="text-gray-400 text-sm mb-1">{t('gameDetail.Odd')}</p>
          <p className="text-white font-medium">
            1:
            {
              find(
                gameDetailStore.items,
                (item) => item.id === gameDetailStore.selectedItemId
              )?.betRate
            }
          </p>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <p className="text-gray-400 text-sm mb-1">
            {t('gameDetail.TransferLimit')}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-white font-medium">10 - 50000</p>
            <p className="text-gray-500">
              {' '}
              {
                find(
                  gameDetailStore.items,
                  (item) => item.id === gameDetailStore.selectedItemId
                )?.betUnit
              }
            </p>
          </div>
        </div>
      </div>
      {contextHolder}
    </div>
  );
});

export default Bet;
