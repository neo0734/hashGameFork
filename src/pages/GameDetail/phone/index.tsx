import { useEffect, useState } from 'react';
import Bet from '../Bet';
import TopTitle from './TopTitle';
import gameDetailStore from '../GameDetailStore';
import { find, get } from 'lodash';
import OrangeBox from '../OrangeBox';
import YellowBox from '../YellowBox';
import Btm from '../Btm';
import BtmBar from './BtmBar';
import LoadingStatus from './PlayStatus/LoadingStatus';
import Winner from './PlayStatus/Winner';
import Lost from './PlayStatus/Lost';
import { observer } from 'mobx-react-lite';
import { getLastNumber, getLastTwoChars, usdhName } from '@/utils/utils';
import { formatNumber } from '@/assets/util';
import globalStore from '@/pages/globalStore';
import { useDispatch } from 'react-redux';
import { setOpenWalletModalMobile } from '@/store/index';

const BtmBar11: React.FC = observer(() => {
  const [boxImg, setBoxImg] = useState('/gameDetail/boxBg.png');
  const dispatch = useDispatch();

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
        setBoxImg('/gameDetail/even4.png');
        break;
      default:
        break;
    }
  }, [gameDetailStore.selectedItemId]);
  return (
    <>
      <TopTitle />

      <div className="px-[16px]">
        <div
          onClick={() => {
            dispatch(setOpenWalletModalMobile(false));
            globalStore.setBalanceModalShow(true);
            document.body.style.overflow = 'hidden';
          }}
          className="bg-[#3c363c] mt-[12px] mb-[24px] cursor-pointer px-[16px] py-[6px] rounded-xl text-[#BDBCBE] text-[12px] pointer flex items-center justify-between gap-[10px]"
        >
          <div className="flex items-center gap-[10px]">
            <span>{t('home.Balance')}:</span>
            <span className="text-white">
              {formatNumber(globalStore.amount / 1000000000, 2)}
            </span>
            <span>{usdhName}</span>
          </div>
          <img
            className="wallet-copy w-[24px] h-[24px] cursor-pointer"
            src={'/gameDetail/downHover.png'}
            title={t('wallet.copyAddress')}
          />
        </div>
        {!gameDetailStore.gameResult && (
          <div className="flex justify-center mt-4">
            <Bet cls="w-full h-[480px]" />
          </div>
        )}
        {gameDetailStore.gameResult === 'loading' && <LoadingStatus />}
        {gameDetailStore.gameResult === 'Win' && <Winner />}
        {gameDetailStore.gameResult === 'Lose' && <Lost />}
        <h1 className="text-2xl font-bold text-white mb-2 mt-4 text-[20px] leading-[22px]">
          {
            find(gameDetailStore.items, { id: gameDetailStore.selectedItemId })
              ?.desc1
          }
        </h1>
        <p className="text-[#BDBCBE] text-[12px]">
          {
            find(gameDetailStore.items, { id: gameDetailStore.selectedItemId })
              ?.desc2
          }
        </p>
        {/* How to Play 按钮 */}
        <button
          onClick={() => gameDetailStore.setModalDetailVisible(true)}
          className="p-2 bg-[#2E3033]  mt-3 text-[16px] text-[#F422FF] rounded-lg mb-4"
        >
          {t('gameDetail.HowtoPlay')}
        </button>
        <div className="bg-[#242223] p-4 rounded-lg mb-6 flex items-center justify-between">
          <div>
            <p className="text-[#7D7C7F] mb-2"> {t('gameDetail.Example')}:</p>
            <p className="text-white">7p7D6ghkWoq75...bx9</p>
          </div>
          {gameDetailStore.selectedItemId === 'C' ? (
            <div className="w-[90px] h-[90px]  flex items-center justify-center ml-4 relative">
              <img
                src={'/gameDetail/doubleBox.png'}
                alt="Game Box"
                className="object-contain"
              />
              <span className="absolute   text-white font-Shuzi pl-[3px] text-[30px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
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
        {/* 下注选项 */}
        {gameDetailStore.selectedItemId === 'A' && (
          <div className="space-y-3 ml-[12px]">
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
          <div className="space-y-3 ml-[12px]">
            {find(gameDetailStore.items, {
              id: gameDetailStore.selectedItemId,
            })?.desc4?.map((item, i) =>
              i === 0 ? (
                <OrangeBox
                  dt={item}
                  showDesc1={t('gameDetail.OddStr')}
                  key={item}
                />
              ) : (
                <YellowBox
                  dt={item}
                  showDesc1={t('gameDetail.Even')}
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
        <Btm />
        <BtmBar />
      </div>
    </>
  );
});

export default BtmBar11;
