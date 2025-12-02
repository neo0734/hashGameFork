import React from 'react';
import { observer } from 'mobx-react-lite';
import globalStore from '../../pages/globalStore';

const Voice: React.FC = observer(() => {
  return (
    <div
      className="w-[25px] h-[25px] md:w-[25px] md:h-[25px] cursor-pointer object-contain"
      onClick={() => globalStore.toggleVoice()}
    >
      <img
        src={`/home/${
          globalStore.isVoice === 'close' ? 'music.png' : 'noear.png'
        }`}
        alt="logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
});

export default Voice;
