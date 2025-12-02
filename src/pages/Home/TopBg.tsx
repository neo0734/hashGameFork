import React from 'react';

const TopBg: React.FC = () => {
  return (
    <div className="w-full flex justify-center">
      <div
        className={`md:mt-6 w-[370px] h-[240px] sm:w-[590px] sm:h-[390px] md:w-[1144px] md:h-[606px] object-contain`}
      >
        <img
          src="/home/topBg.png"
          alt="logo"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default TopBg;
