import React from 'react';
import { find } from 'lodash';
import gameDetailStore from './GameDetailStore';
import { observer } from 'mobx-react-lite';

const LeftLogo: React.FC = observer(() => {
  return (
    <div className="w-[222px] h-[544px] flex items-center justify-center ">
      <div className="object-contain">
        <img
          src={
            find(
              gameDetailStore.items,
              (item) => item.id === gameDetailStore.selectedItemId
            )?.logo
          }
        />
      </div>
    </div>
  );
});

export default LeftLogo;
