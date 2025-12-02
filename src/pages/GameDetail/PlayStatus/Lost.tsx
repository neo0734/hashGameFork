import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import gameDetailStore from '../GameDetailStore';
import { addPoint } from '@/assets/util';
import { getLastNumber, getLastTwoChars } from '@/utils/utils';
import { get } from 'lodash';

const Lost: React.FC = observer(() => {
  const [boxImg, setBoxImg] = useState('/gameDetail/boxBg.png');

  useEffect(() => {
    switch (gameDetailStore.selectedItemId) {
      case 'A':
        setBoxImg('/gameDetail/even1.png');
        break;
      case 'B':
        setBoxImg('/gameDetail/even2.png');
        break;
      case 'C':
        setBoxImg('/gameDetail/even3.png');
        break;
      case 'D':
        setBoxImg('/gameDetail/even4.png');
        break;
      default:
        break;
    }
  }, [gameDetailStore.selectedItemId]);
  return (
    <div className="bg-[#000] h-[502px] flex flex-col items-center justify-center">
      {/* 标题部分 */}
      <h1 className="text-[48px] font-bold text-[#F422FF] mb-4">
        {t('gameDetail.Missed!')}
      </h1>
      <p className="text-[16px] text-[#7D7C7F] mb-2">{t('gameDetail.Try')}</p>

      {/* 动图部分 */}
      <img src="/gameDetail/lose.gif" className="w-[200px] h-[200px]" />

      {/* 哈希值显示区域 */}
      <div className="w-full  mt-4 flex items-center justify-evenly">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#7D7C7F]">Hash:</span>
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

export default Lost;
