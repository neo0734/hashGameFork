import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Connect from '../Connect/Connect.tsx';
import Balance from '../Balance/Balance.tsx';
import Languge from './Languge.tsx';
import More from './More.tsx';
import ConnectMobile from '../ConnectMobile/ConnectMobile.tsx';
import Voice from './Voice.tsx';
import globalStore from '../../pages/globalStore';
import KehuService from './KehuService.tsx';
import { useCurrentAccount } from '@onelabs/dapp-kit';
import { getBalanceFetch } from '@/server/pay.ts';
import { get } from 'lodash';
import store from '@/store/index.ts';
import BalanceModal from '../BalanceModal/index.tsx';
import Recharge from '../Recharge/index.tsx';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  className?: string;
  showExplore?: boolean;
  isFixed?: boolean;
}

const Navbar: React.FC<NavbarProps> = observer(function Navbar({
  showExplore = true,
  isFixed = true,
}) {
  const currentAccount = useCurrentAccount();
  const navigate = useNavigate();
  const tabs = [
    { id: 'EXPLORE1', name: t('home.EXPLORE1') },
    { id: 'DESCRIPTION', name: t('home.DESCRIPTION') },
    { id: 'FAQ', name: t('home.FAQ') },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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

  // 组件加载时检测网络
  useEffect(() => {
    if (
      store.getState().zkLoginData?.zkloginUserAddress &&
      globalStore.isFirst
    ) {
      getBalacne();
      globalStore.setIsFirst();
    }
  }, [store.getState().zkLoginData?.zkloginUserAddress, globalStore.isFirst]);

  return (
    <div
      className={`${
        isFixed ? 'fixed' : ''
      } top-0 left-0 right-0 z-50 flex items-center justify-between text-white px-4 py-[12px] bg-primary`}
    >
      <div
        onClick={() => navigate('/')}
        className="w-[200px] h-[32px] cursor-pointer xs:w-[220px] xs:h-[36px] sm:w-[280px] sm:h-[45px] md:w-[350px] md:h-[56px] object-contain"
      >
        <img
          src="/home/logo.png"
          alt="logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* {showExplore && (
        <div
          onMouseEnter={() => globalStore.setlightBall(1)}
          onMouseLeave={() => globalStore.setlightBall(0)}
          className="hidden items-center md:flex bg-[#373636] p-[8px] gap-6 text-[16px] rounded-2xl object-contain border-l-2 border-r-2 border-[#4b4a4a] relative"
        >
          <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-[#4b4a4a] via-[#d3d3d3] to-[#4b4a4a]"></div>
          <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-[#4b4a4a] via-[#d3d3d3] to-[#4b4a4a]"></div>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className="cursor-pointer hover:bg-[#5b5a5a] px-[16px] py-[8px] rounded-xl"
            >
              {tab.name}
            </div>
          ))}
        </div>
      )} */}
      <BalanceModal />

      <Recharge
        open={globalStore.openRechargeModal}
        setOpenModal={() => {
          globalStore.setOpenRechargeModal(false);
        }}
      />

      {/* 语言切换 */}
      <div className="hidden md:flex items-center">
        <Balance direction="bottom" />
        <Connect direction="bottom" />
        <Languge />
        <KehuService />
        <Voice />
      </div>
      <div className="md:hidden flex items-center">
        <ConnectMobile direction="bottom" /> &nbsp; &nbsp;
        <More />
      </div>

      {/* 移动端语言选择器 */}
      {/* <div className="sm:hidden relative">
          <select
            value={i18n.language}
            onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'zh')}
            className="appearance-none bg-transparent text-white border border-white/30 rounded px-3 py-1 pr-8 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option value="en">EN</option>
            <option value="zh">中文</option>
          </select>
          <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div> */}
    </div>
  );
});

export default Navbar;
