import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import OrangeBox from './OrangeBox';
import YellowBox from './YellowBox';
import gameDetailStore from './GameDetailStore';
import { find } from 'lodash';
import i18n from '../../i18n';
import IntroDetail from './IntroDetail';
import LoadingStatus from './PlayStatus/LoadingStatus';
import Lost from './PlayStatus/Lost';
import Winner from './PlayStatus/Winner';
import ModalDetail from './ModalDetail';

const t = i18n.t;

const Intro: React.FC = observer(() => {
  return (
    <div className="w-[439px] pt-2 ml-[32px] text-white relative">
      <div className="right-[-10px] top-[-12px] absolute">
        <img src="/gameDetail/star.png" className="w-[40px] h-[32px] " />
      </div>
      <ModalDetail />
      {!gameDetailStore.gameResult && <IntroDetail />}
      {gameDetailStore.gameResult === 'loading' && <LoadingStatus />}
      {gameDetailStore.gameResult === 'Win' && <Winner />}
      {gameDetailStore.gameResult === 'Lose' && <Lost />}
    </div>
  );
});

export default Intro;
