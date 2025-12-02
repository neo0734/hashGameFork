import React from 'react';

const Intro3: React.FC = () => {
  return (
    <div className="w-full  mt-[40px] md:mt-[80px] flex items-center flex-col ">
      <div
        className="hidden md:block 
        text-center
      text-[56px] 
          bg-gradient-to-b from-[#FCF8FF] to-[#FBB1FF] bg-clip-text text-transparent 
          drop-shadow-[0_2px_10px_rgba(244,34,255,0.48)]
      "
      >
        {t('home.Unique')}&nbsp;
        {t('home.Minimalist')}&nbsp;
        {t('home.Gameplay')}&nbsp;
      </div>
      <div
        className="md:hidden 
        text-center
        text-[32px] 
        leading-[36px]
          bg-gradient-to-b from-[#FCF8FF] to-[#FBB1FF] bg-clip-text text-transparent 
          drop-shadow-[0_2px_10px_rgba(244,34,255,0.48)]
      "
      >
        <div>{t('home.Unique')}</div>
        <div>{t('home.Minimalist')}</div>
        <div>{t('home.Gameplay')}</div>
      </div>
      <div className="w-[343px] md:w-[920px] md:h-[383px] mt-[20px] md:mt-[40px] object-contain">
        <img src="/home/Banner.png" />
      </div>
    </div>
  );
};

export default Intro3;
