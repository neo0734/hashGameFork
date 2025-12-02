import React from 'react';
import useResponsive from '../../utils/useResponsive';

const Service: React.FC = () => {
  const { isMobile } = useResponsive();

  const handleClick = () => {
    const telegramUrl = 'https://t.me/hello_onechain/20';

    // PC端使用window.open，移动端使用location.href
    if (isMobile) {
      location.href = telegramUrl;
    } else {
      window.open(telegramUrl);
    }
  };

  return (
    <div
      className="w-[30px] h-[30px] cursor-pointer md:w-[25px] md:h-[25px]  mx-8"
      onClick={handleClick}
    >
      <img src={`/home/ear.png`} alt="logo" className="w-full h-full" />
    </div>
  );
};

export default Service;
