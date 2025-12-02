import React from 'react';
import { observer } from 'mobx-react-lite';
import { t } from 'i18next';

const OrangeBox: React.FC<{
  dt: string;
  showDesc1?: string;
  showDesc2?: string;
}> = ({ dt, showDesc1, showDesc2 }) => {
  return (
    <div className="h-[36px] w-fit bg-[#FA8B20] border-t-4 border-b-4 text-black font-medium pr-[8px] pl-[8px] relative text-[12px] md:text-[14px] items-center flex">
      <div className="w-[16px] h-[32px] object-contain absolute left-[-16px] top-0 ">
        <img src={`/gameDetail/oranl.png`} />
      </div>
      <div className="w-[16px] h-[32px] object-contain absolute right-[-16px] top-0 ">
        <img src={`/gameDetail/oranr.png`} />
      </div>
      <span>
        {showDesc1 ? showDesc1 + ' : ' : ''}
        {dt} {showDesc2 ? showDesc2 : ''}
      </span>
    </div>
  );
};

export default OrangeBox;
