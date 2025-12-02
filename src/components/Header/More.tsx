import React from 'react';
import globalStore from '../../pages/globalStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const More: React.FC = observer(() => {
  const navigate = useNavigate();
  return (
    <>
      {globalStore.isMore ? (
        <div
          className={`w-[24px] h-[24px] object-contain cursor-pointer`}
          onClick={() => {
            globalStore.setIs_More(!globalStore.isMore);
            navigate('/');
          }}
        >
          <img
            src="/home/close.png"
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        <div
          className={`w-[24px] h-[24px] object-contain cursor-pointer`}
          onClick={() => {
            globalStore.setIs_More(!globalStore.isMore);
            navigate('/phoneMorePage');
          }}
        >
          <img
            src="/home/more.png"
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </>
  );
});

export default More;
