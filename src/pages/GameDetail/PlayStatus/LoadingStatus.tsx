import React from 'react';
import { observer } from 'mobx-react-lite';

const LoadingStatus: React.FC = observer(() => {
  {
    /* 标题部分 */
  }
  return (
    <div className="bg-[#000] h-[502px] flex flex-col items-center justify-center">
      <h1
        className="font-bold text-[40px] text-center 
      bg-gradient-to-b from-[#FCC2FF] to-[#B222FF] bg-clip-text text-transparent 
          drop-shadow-[0_2px_10px_rgba(244,34,255,0.48)]
      "
      >
        {t('gameDetail.Drawing')}
        <span className="inline-block ml-1 animate-pulse text-[#B222FF]">
          <span className="opacity-0 animate-[dot_1.4s_infinite]">.</span>
          <span className="opacity-0 animate-[dot_1.4s_infinite_0.2s]">.</span>
          <span className="opacity-0 animate-[dot_1.4s_infinite_0.4s]">.</span>
        </span>
      </h1>
      <img src="/gameDetail/wait.gif" className="w-[250px] h-[250px] mt-4" />
    </div>
  );
});

export default LoadingStatus;
