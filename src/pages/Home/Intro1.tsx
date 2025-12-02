import React from 'react';

const TopBg: React.FC = () => {
  return (
    <div
      id="DESCRIPTION"
      className="w-full flex flex-col md:flex-row justify-between  items-start md:items-center mt-[40px] md:mt-[80px]"
    >
      <div className="hidden md:block">
        <div
          className="flex items-end text-[88px] 
          bg-gradient-to-b from-[#FCC2FF] to-[#B222FF] bg-clip-text text-transparent 
          drop-shadow-[0_2px_10px_rgba(244,34,255,0.48)]
          leading-[86px]
          "
        >
          <div>
            <div className="">{t('home.Hash')}</div>
            <div className="">{t('home.Game')}</div>
          </div>
          <div className="w-[104px] h-[104px] object-contain vertical-bottom ml-[20px]">
            <img src="/home/btm.png" />
          </div>
        </div>
        <div className="mt-[10px] text-[64px] text-white whitespace-nowrap">
          {t('home.On-chain')}&nbsp;{t('home.Hash')}
        </div>
      </div>
      <div className="md:hidden flex justify-between items-center w-full">
        <div>
          <div
            className="flex text-[32px] 
          bg-gradient-to-b from-[#FCC2FF] to-[#B222FF] bg-clip-text text-transparent 
          drop-shadow-[0_2px_10px_rgba(244,34,255,0.48)]
          leading-[46px]
          "
          >
            {t('home.Hash')}
            {t('home.Game')}
          </div>
          <div className="mt-[10px] text-[20px] text-white whitespace-nowrap">
            {t('home.On-chain')}&nbsp;{t('home.Hash')}
          </div>
        </div>
        <div className="w-[40px] h-[40px] object-contain vertical-bottom">
          <img src="/home/btm.png" />
        </div>
      </div>

      <div className="w-[170px] h-[170px] md:w-[340px] md:h-[340px] object-contain">
        <img src="/home/Symbol.png" />
      </div>
    </div>
  );
};

export default TopBg;
