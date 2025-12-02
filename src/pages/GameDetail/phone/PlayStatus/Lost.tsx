import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import gameDetailStore from '../../GameDetailStore';
import { addPoint } from '@/assets/util';
import { getLastNumber, getLastTwoChars } from '@/utils/utils';
import { get } from 'lodash';

const Lost: React.FC = observer(() => {
  return (
    <div className="bg-[#242223] py-4 px-[16px] flex flex-col items-center rounded-3xl justify-center border-2 border-[#F422FF] ">
      {/* 标题部分 */}
      <h1 className="text-[28px] font-bold text-[#F422FF] mb-4">
        {t('gameDetail.Missed!')}
      </h1>

      <p className="text-[14px] text-[#7D7C7F] mb-2">{t('gameDetail.Try')}</p>

      <div className="w-full h-[208px] bg-[#000] relative rounded-xl mt-4">
        <img
          src="/gameDetail/lose.gif"
          className="w-[144px] h-[144px] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        />
      </div>

      <div
        onClick={() => {
          gameDetailStore.setGameResult('');
        }}
        className="w-full cursor-pointer mt-[24px] pb-[12px] bg-[#F422FF] flex items-center justify-center text-white py-3 rounded-lg font-medium text-[16px] transition-colors mx-2"
      >
        <div className="w-[24px] h-[24px] object-contain">
          <img src={`/gameDetail/betIcon.png`} />
        </div>
        <div>{t('gameDetail.BetAgain')}</div>
      </div>
      {/* 动图部分 */}

      {/* 哈希值显示区域 */}
      <div className="w-full  mt-4 flex items-center justify-evenly">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#7D7C7F] text-[12px]">
              {t('gameDetail.Hash')}:
            </span>
          </div>
          <div
            onClick={() => {
              if (gameDetailStore.hashCode) {
                window.open(gameDetailStore.openThirdLink);
              }
            }}
            className="bg-[#4c0c50] rounded-3xl p-3 cursor-pointer
          
          border border-dashed border-[#f422ff] text-[#f422ff]"
          >
            <p className=" text-center">
              {addPoint(gameDetailStore.hashCode, 6)}
            </p>
          </div>
        </div>
        {gameDetailStore.selectedItemId === 'C' ? (
          <div className="w-[63px] h-[56px] flex items-center justify-center ml-4 mr-4 relative">
            <img
              src={'/gameDetail/doubleBox.png'}
              alt="Game Box"
              className="object-contain"
            />
            <span className="absolute   text-white font-Shuzi pl-[3px] text-[30px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
              {get(getLastTwoChars(gameDetailStore.hashCode), [0])}&nbsp;
              {get(getLastTwoChars(gameDetailStore.hashCode), [1])}
            </span>
          </div>
        ) : (
          <div className="w-[63px] h-[56px] flex items-center justify-center ml-4 mr-4 relative">
            <img
              src={'/gameDetail/boxBg.png'}
              alt="Game Box"
              className=" object-contain"
            />
            <span className="absolute text-[#110f10] font-Shuzi text-[40px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
              {getLastNumber(gameDetailStore.hashCode)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

export default Lost;
