import React from 'react';
import { t } from 'i18next';

const TopBg: React.FC = () => {
  const list = [
    {
      name: t('home.OneWallet'),
      to: '',
    },
    {
      name: t('home.startgame'),
      to: '',
    },
    {
      name: t('home.obtained'),
      to: '',
    },
    {
      name: t('home.safe'),
      to: '',
    },
  ];

  return (
    <div className="w-full flex mt-[40px] md:mt-[80px] justify-center relative pb-4">
      <img
        src="/home/Explore.png"
        alt=""
        className="w-[1320px] h-[142px] md:block hidden"
      />
      <img
        src="/home/Explore2.png"
        alt=""
        className="w-[292px] h-[107px] md:hidden"
      />
      <img
        src="/home/Vector.png"
        alt=""
        className="h-[274px] absolute bottom-[0px] left-[0px] w-full z-[-1]"
      />
    </div>
  );
};

export default TopBg;
