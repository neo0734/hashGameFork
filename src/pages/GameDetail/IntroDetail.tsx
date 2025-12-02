import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import OrangeBox from './OrangeBox';
import YellowBox from './YellowBox';
import gameDetailStore from './GameDetailStore';
import { find, get } from 'lodash';
import i18n from '../../i18n';
import { getLastNumber, getLastTwoChars } from '@/utils/utils';

const t = i18n.t;

const IntroDetail: React.FC = observer(() => {
  const [boxImg, setBoxImg] = useState('/gameDetail/boxBg.png');

  useEffect(() => {
    switch (gameDetailStore.selectedItemId) {
      case 'A':
        setBoxImg('/gameDetail/even1.png');
        break;
      case 'B':
        setBoxImg('/gameDetail/even1.png');
        break;
      case 'C':
        setBoxImg('/gameDetail/even3.png');
        break;
      case 'D':
        setBoxImg('/gameDetail/even1.png');
        break;
      default:
        break;
    }
  }, [gameDetailStore.selectedItemId]);

  return (
    <>
      {/* 标题部分 */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-white mb-2 text-[20px] leading-[22px]">
          {
            find(gameDetailStore.items, { id: gameDetailStore.selectedItemId })
              ?.desc1
          }
          {gameDetailStore.selectedItemId === 'D' && (
            <span className=" text-[#fff]">
              <span className="text-[#FFCC02] font-bold">&nbsp;9.98x</span>!
            </span>
          )}
        </h1>
        <p className="text-[#BDBCBE]">
          {
            find(gameDetailStore.items, { id: gameDetailStore.selectedItemId })
              ?.desc2
          }
        </p>
      </div>

      {/* How to Play 按钮 */}
      <button
        onClick={() => gameDetailStore.setModalDetailVisible(true)}
        className="p-2 bg-[#2E3033] text-[16px] text-[#F422FF] rounded-lg mb-4"
      >
        {t('gameDetail.HowtoPlay')}
      </button>

      <div className="bg-[#242223] p-4 rounded-lg mb-6 flex items-center justify-between">
        <div>
          <p className="text-[#7D7C7F] mb-2"> {t('gameDetail.Example')}:</p>
          <p className="text-white">7p7D6ghkWoq75c5...bx9</p>
        </div>
        {gameDetailStore.selectedItemId === 'C' ? (
          <div className="w-[90px] h-[90px]  flex items-center justify-center ml-4 relative">
            <img
              src={'/gameDetail/doubleBox.png'}
              alt="Game Box"
              className="object-contain"
            />
            <span className="absolute text-white font-Shuzi pl-[3px] text-[40px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
              {get(getLastTwoChars('x9'), [0])}&nbsp;
              {get(getLastTwoChars('x9'), [1])}
            </span>
          </div>
        ) : (
          <div className="w-[90px] h-[90px] flex items-center ml-[4px] justify-center relative object-contain">
            <img
              src={'/gameDetail/boxBg.png'}
              alt="Game Box"
              className="object-contain"
            />
            <span className="absolute text-[#110f10] font-Shuzi text-[40px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
              {getLastNumber('9')}
            </span>
          </div>
        )}
      </div>

      {/* 下注说明 */}
      {gameDetailStore.selectedItemId === 'D' ? (
        ''
      ) : (
        <p className="text-white mb-4 text-[12px]">
          <span className="mb-4 text-[#BDBCBE]">
            {t('gameDetail.Betting')}:{' '}
          </span>
          {
            find(gameDetailStore.items, { id: gameDetailStore.selectedItemId })
              ?.desc3
          }
        </p>
      )}

      {/* 下注选项 */}
      {gameDetailStore.selectedItemId === 'A' && (
        <div className="space-y-3">
          {find(gameDetailStore.items, {
            id: gameDetailStore.selectedItemId,
          })?.desc4?.map((item, i) =>
            i === 0 ? (
              <OrangeBox
                dt={item}
                showDesc1={t('gameDetail.Small')}
                showDesc2={t('gameDetail.mortgageSmall')}
                key={item}
              />
            ) : (
              <YellowBox
                dt={item}
                showDesc1={t('gameDetail.Big')}
                showDesc2={t('gameDetail.mortgageBig')}
                key={item}
              />
            )
          )}
        </div>
      )}
      {gameDetailStore.selectedItemId === 'B' && (
        <div className="space-y-3">
          {find(gameDetailStore.items, {
            id: gameDetailStore.selectedItemId,
          })?.desc4?.map((item, i) =>
            i === 0 ? (
              <OrangeBox
                dt={item}
                showDesc1={t('gameDetail.OddStr')}
                showDesc2={t('gameDetail.mortgageBig')}
                key={item}
              />
            ) : (
              <YellowBox
                dt={item}
                showDesc1={t('gameDetail.Even')}
                showDesc2={t('gameDetail.mortgageBig')}
                key={item}
              />
            )
          )}
        </div>
      )}
      {gameDetailStore.selectedItemId === 'C' && (
        <div className="flex justify-center gap-10">
          {find(gameDetailStore.items, {
            id: gameDetailStore.selectedItemId,
          })?.desc4?.map((item, i) =>
            i === 0 ? (
              <OrangeBox dt={item} key={item} />
            ) : (
              <YellowBox dt={item} key={item} />
            )
          )}
        </div>
      )}
    </>
  );
});

export default IntroDetail;
