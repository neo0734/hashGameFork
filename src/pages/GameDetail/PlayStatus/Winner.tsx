import React from 'react';
import { observer } from 'mobx-react-lite';
import gameDetailStore from '../GameDetailStore';
import { addPoint } from '@/assets/util';
import { getLastNumber, getLastTwoChars } from '@/utils/utils';
import { get } from 'lodash';

const Winner: React.FC = observer(() => {
  return (
    <div className="bg-[#000] py-4 flex flex-col items-center justify-center rounded-2xl">
      {/* 标题部分 */}
      <h1
        className="text-[40px] font-bold bg-gradient-to-r from-[#FF227A] via-[#FFF422] to-[#FF227A] bg-clip-text text-transparent 
          drop-shadow-[0_2px_10px_rgba(244, 34, 255, 0.84)]"
      >
        {t('gameDetail.Winner!')}
      </h1>
      <h1
        className="text-[40px] font-bold bg-gradient-to-r from-[#FF227A] via-[#FFF422] to-[#FF227A] bg-clip-text text-transparent 
          drop-shadow-[0_2px_10px_rgba(244, 34, 255, 0.84)] mb-4"
      >
        {t('gameDetail.Winner!')}
      </h1>

      {/* 动图部分 */}
      <img src="/gameDetail/win.gif" className="w-[200px] h-[200px]" />

      <div className="flex justify-between items-center w-full px-4">
        <div className="flex gap-[10px] items-center text-[#7D7C7F]">
          <img src="/gameDetail/reward.png" className="w-[40px] h-[40px]" />
          <span className=" text-[14px]">{t('gameDetail.Reward')}</span>
          <span className=" text-[18px] text-[#FFEC25]">
            {gameDetailStore.payout_amount}
          </span>
        </div>
        <span>USDH</span>
      </div>
      <div className="text-[#7D7C7F] px-6 text-[14px] pt-2">
        {t('gameDetail.directly')}
      </div>

      {/* 哈希值显示区域 */}
      <div className="w-full  mt-4 flex items-center justify-evenly">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#7D7C7F]">{t('gameDetail.Hash')}:</span>
          </div>
          <div
            onClick={() => {
              if (gameDetailStore.hashCode) {
                window.open(gameDetailStore.openThirdLink);
              }
            }}
            className="bg-[#4c0c50] rounded-3xl p-3 cursor-pointer text-white border border-transparent
          
          hover:border hover:border-dashed hover:border-[#f422ff] hover:text-[#f422ff]"
          >
            <p className=" text-center">
              {addPoint(gameDetailStore.hashCode, 8)}
            </p>
          </div>
        </div>

        {gameDetailStore.selectedItemId === 'C' ? (
          <div className="w-[84px] h-[77px] flex items-center justify-center ml-4 mr-4 relative">
            <img
              src={'/gameDetail/doubleBox.png'}
              alt="Game Box"
              className="object-contain"
            />
            <span className="absolute text-[#110f10] pl-[3px] font-Shuzi text-[40px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
              {get(getLastTwoChars(gameDetailStore.hashCode), [0])}&nbsp;
              {get(getLastTwoChars(gameDetailStore.hashCode), [1])}
            </span>
          </div>
        ) : (
          <div className="w-[84px] h-[77px] flex items-center justify-center ml-4 mr-4 relative">
            <img
              src={'/gameDetail/boxBg.png'}
              alt="Game Box"
              className=" object-contain"
            />
            <span className="absolute text-[#110f10] font-Shuzi text-[50px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
              {getLastNumber(gameDetailStore.hashCode)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

export default Winner;
