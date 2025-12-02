import React from 'react';

const TopBgText: React.FC = () => {
  // const { isMobile, isTablet, isDesktop } = useResponsive();
  return (
    <div className="w-full flex justify-center pt-4">
      <span className="hidden md:flex bg-clip-text text-transparent bg-gradient-to-r from-[#B222FF] via-[#F422FF] to-[#B222FF] text-[56px] font-bold leading-[56px]">
        {t('home.Explore')} {t('home.Hash')} {t('home.Game')}
      </span>
      <div className="text-center md:hidden bg-clip-text text-transparent bg-gradient-to-r from-[#B222FF] via-[#F422FF] to-[#B222FF] text-[32px] font-bold leading-[32px]">
        <div>
          {t('home.Explore')} {t('home.Hash')}
        </div>
        <div>{t('home.Game')}</div>
      </div>
    </div>
  );
};

export default TopBgText;
