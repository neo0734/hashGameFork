import React from 'react';

import Navbar from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import globalStore from '../globalStore';
import Languge from '@/components/Header/Languge';
import Voice from '@/components/Header/Voice';
import Service from '@/components/Header/KehuService';
import {
  useCurrentAccount,
  useCurrentWallet,
  useDisconnectWallet,
} from '@onelabs/dapp-kit';
import { formatNumber } from '@/assets/util';
import { usdhName } from '@/utils/utils';
import { useDispatch } from 'react-redux';
import { setOpenWalletModalMobile } from '@/store/index';
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  const dispatch = useDispatch();
  // const { isMobile, isTablet, isDesktop } = useResponsive();
  const tabs = [
    { id: 'EXPLORE1', name: t('home.EXPLORE1') },
    { id: 'DESCRIPTION', name: t('home.DESCRIPTION') },
    { id: 'FAQ', name: t('home.FAQ') },
  ];
  return (
    <div className="pt-[80px] flex flex-col items-center">
      <Navbar />
      <div className="w-[90vw] md:w-[42vw]">
        {tabs.map((item, index) => (
          <div
            key={index}
            className={`mb-[16px] p-[10px] border-b-2 border-white 
              cursor-pointer flex
               justify-between items-center py-[20px]`}
            onClick={() => {
              globalStore.setIs_More(false);
              navigate('/?goto=' + item.id);
            }}
          >
            <span className="text-white text-[14px]">{item.name}</span>
            <div className="w-[24px] h-[24px]  object-contain opacity-50">
              <img src="/home/right.png" />
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 text-white">
        <div
          onClick={() => {
            navigate('/');
            dispatch(setOpenWalletModalMobile(false));
            globalStore.setBalanceModalShow(true);
            globalStore.setIs_More(false);
          }}
          className="bg-[#3c363c] mb-[24px] cursor-pointer px-[16px] py-[6px] rounded-xl text-[#BDBCBE] text-[12px] pointer flex items-center justify-between gap-[10px]"
        >
          <div className="flex items-center gap-[10px]">
            <span>{t('home.Balance')}:</span>
            <span className="text-white">
              {formatNumber(globalStore.amount / 1000000000, 2)}
            </span>
            <span>{usdhName}</span>
          </div>
          <img
            className="wallet-copy w-[24px] h-[24px] cursor-pointer"
            src={'/gameDetail/downHover.png'}
            title={t('wallet.copyAddress')}
          />
        </div>

        <div className="bg-[#3c363c] flex justify-between items-center px-[20px] py-[10px] rounded-xl">
          <Languge />
          <Service />
          <Voice />
        </div>
        <div className="py-[20px]">
          <span className="text-[#7d7c7f] text-[12px]">By</span>&nbsp;
          <span className="text-white text-[12px]">OneLabs©2025</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
