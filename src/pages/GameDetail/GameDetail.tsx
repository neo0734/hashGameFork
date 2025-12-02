import React from 'react';

import LeftMenu from './LeftMenu';
import Navbar from '../../components/Header/Header';
import TopTitle from './TopTitle';
import LeftLogo from './LeftLogo';
import Bet from './Bet';
import Intro from './Intro';
import Btm from './Btm';
import Mobile from './phone';
import ModalDetail from './ModalDetail';

const GameDetail: React.FC = () => {
  return (
    <>
      <div className="hidden md:flex items-center">
        <div className="flex ">
          <LeftMenu />
          <div className="flex-1">
            <Navbar showExplore={false} isFixed={false} />
            <div className="flex-1 px-[24px] h-fit">
              <TopTitle />
              <div className="flex  pt-[32px]">
                <LeftLogo />
                <Bet />
                <Intro />
              </div>
              <Btm />
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden mb-20">
        <Navbar showExplore={false} />
        <Mobile />
      </div>
      <ModalDetail />
    </>
  );
};

export default GameDetail;
