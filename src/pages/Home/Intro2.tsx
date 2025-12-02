import React from 'react';

const Intro2: React.FC = () => {
  return (
    <div className="w-full  mt-[40px] md:mt-[80px]">
      <div>
        <div className="flex items-center text-[#fff]">
          <div className="w-[40px] h-[40px] object-contain">
            <img src="/home/Verification.png" />
          </div>
          <span className="text-[22px] md:text-[32px] pl-[16px]">
            {t('home.On-chain')}&nbsp;
            {t('home.Verification')}
          </span>
        </div>
        <div className="text-[#7D7C7F] text-[14px] md:text-[24px]">
          {t('home.explorer')}
        </div>
      </div>
      <div className="text-right mt-[24px]">
        <div className="flex items-center text-[#fff] justify-end">
          <div className="w-[40px] h-[40px] object-contain">
            <img src="/home/elect.png" />
          </div>
          <span className="text-[22px] md:text-[32px] pl-[16px]">
            {t('home.Paced')}
          </span>
        </div>
        <div className="text-[#7D7C7F] text-[14px] md:text-[24px]">
          {t('home.automated')}
        </div>
      </div>
      <div className="mt-[24px]">
        <div className="flex items-center text-[#fff]">
          <div className="w-[40px] h-[40px] object-contain">
            <img src="/home/clock.png" />
          </div>
          <span className="text-[22px] md:text-[32px] pl-[16px]">
            {t('home.On-chain')}&nbsp;
            {t('home.Anytime')}
          </span>
        </div>
        <div className="text-[#7D7C7F] text-[14px] md:text-[24px]">
          {t('home.restrictions')}
        </div>
      </div>
      <div className="text-right mt-[24px]">
        <div className="flex items-center text-[#fff] justify-end">
          <div className="w-[40px] h-[40px] object-contain">
            <img src="/home/coin.png" />
          </div>
          <span className="text-[22px] md:text-[32px] pl-[16px]">
            {t('home.USDH')}
          </span>
        </div>
        <div className="text-[#7D7C7F] text-[14px] md:text-[24px]">
          {t('home.participate')}
        </div>
      </div>
    </div>
  );
};

export default Intro2;
