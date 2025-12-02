import React from 'react';
import { observer } from 'mobx-react-lite';
import { t } from 'i18next';
import { find } from 'lodash';
import gameDetailStore from './GameDetailStore';

const Btm: React.FC = observer(() => {
  const list = [
    t('gameDetail.Note'),
    t('gameDetail.platform'),
    t('gameDetail.below'),
    t('gameDetail.fluctuate'),
  ];
  return (
    <div className="pt-[16px] px-[2px] md:px[24px] text-[12px] ">
      <ul className="text-[#7D7C7F] text-[10px] space-y-[4px]">
        {find(gameDetailStore.items, {
          id: gameDetailStore.selectedItemId,
        })?.btms.map((item, index) => {
          const showDot = index > 0;
          return (
            <li
              key={index}
              className={`leading-[14px] ${
                showDot
                  ? 'relative pl-[10px] before:content-[""] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[4px] before:h-[4px] before:rounded-full before:bg-[#7D7C7F]'
                  : ''
              }`}
            >
              {item}
              {!showDot ? ' ：' : ''}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Btm;
