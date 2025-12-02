import React from 'react';
import { observer } from 'mobx-react-lite';

const LoadingStatus: React.FC = observer(() => {
  {
    /* 标题部分 */
  }
  return (
    <div className="bg-[#242223] px-[16px]  flex flex-col rounded-3xl items-center justify-center border-2 border-[#F422FF] ">
      <h1
        className="font-bold text-[24px] text-center pt-[24px]
      bg-gradient-to-b from-[#B222FF] to-[#F422FF] bg-clip-text text-transparent 
          drop-shadow-[0_2px_10px_rgba(244,34,255,0.48)]
      "
      >
        {t('gameDetail.Drawing')}
        <span
          className="inline-block ml-1 animate-pulse text-[#B222FF] 
          "
        >
          <span className="opacity-0 animate-[dot_1.4s_infinite]">.</span>
          <span className="opacity-0 animate-[dot_1.4s_infinite_0.2s]">.</span>
          <span className="opacity-0 animate-[dot_1.4s_infinite_0.4s]">.</span>
        </span>
      </h1>
      <div className="w-full mt-[24px] h-[373px] bg-[#000] relative rounded-xl">
        <img
          src="/gameDetail/wait.gif"
          className="w-[226px] h-[226px]  absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        />
      </div>
    </div>
  );
});

export default LoadingStatus;
