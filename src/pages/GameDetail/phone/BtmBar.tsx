import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import gameDetailStore from '../GameDetailStore';
import { find } from 'lodash';

const BtmBar: React.FC = observer(() => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // 处理菜单项点击
  const handleItemClick = (id: string) => {
    navigate(`/gameDetail/${id}`);
    gameDetailStore.setSelectedItemId(id);
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-evenly w-full fixed h-[63px] left-0 bottom-0 bg-[#242223]">
      <div
        className="text-[#7D7C7F] flex flex-col justify-center items-center text-[14px]"
        onClick={() => {
          navigate('/');
        }}
      >
        <img className="w-[24px] h-[24px]" src={'/gameDetail/home.png'} />
        <div>{t('gameDetail.Home')}</div>
      </div>

      <div
        onClick={() => setOpen(true)}
        className="text-[#fff] text-[16px] flex bg-[#110f10] p-2 pl-6 pr-6 rounded-2xl"
      >
        <img
          className="w-[24px] h-[24px]"
          src={
            find(
              gameDetailStore.items,
              (item) => item.id === gameDetailStore.selectedItemId
            )?.src2
          }
        />
        &nbsp;
        {
          find(
            gameDetailStore.items,
            (item) => item.id === gameDetailStore.selectedItemId
          )?.name
        }
        &nbsp;
        <img className="w-[24px] h-[24px]" src={'/gameDetail/right.png'} />
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="absolute inset-0 " />
          <div
            className="bg-[#242223] w-full max-w-md rounded-t-2xl transform transition-transform duration-300 linear translate-y-0 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={'/home/close.png'}
              alt="Close"
              className="absolute w-[24px] h-[24px] top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            />
            <div className="signin-modal-content">
              <div className="signin-modal-title w100 flex flex-center">
                <span className="text-[16px] text-[#7D7C7F] font-bold  w100 pl-4 pt-5">
                  {t('gameDetail.SelectGame')}
                </span>
              </div>
              <div className="mt-[20px] pl-[18px] pb-4">
                {gameDetailStore.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`flex items-center py-[16px] cursor-pointer relative ${
                      gameDetailStore.selectedItemId === item.id
                        ? 'text-[#fff]'
                        : 'text-[#BDBCBE]'
                    }`}
                  >
                    <div className="w-[20px] h-[20px] object-contain mr-[12px]">
                      <img
                        src={
                          gameDetailStore.selectedItemId === item.id
                            ? item.src2
                            : item.src
                        }
                        alt={item.name}
                      />
                    </div>
                    {gameDetailStore.selectedItemId === item.id && (
                      <div className="absolute right-[0] top-[50%] translate-y-[-50%]">
                        <img src="/gameDetail/menuActive.png" alt="arrow" />
                      </div>
                    )}

                    <span className="text-[14px]">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default BtmBar;
