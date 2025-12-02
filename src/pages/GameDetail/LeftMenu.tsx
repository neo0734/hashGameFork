import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import gameDetailStore from './GameDetailStore';

const GameDetail: React.FC = observer(() => {
  // const { isMobile, isTablet, isDesktop } = useResponsive();
  const navigate = useNavigate();
  const params = useParams();
  const gameId = params.id || 'A';
  // 获取当前路由传递的id参数

  useEffect(() => {
    gameDetailStore.setSelectedItemId(gameId);
  }, [gameId]);

  // 处理菜单项点击
  const handleItemClick = (id: string) => {
    navigate(`/gameDetail/${id}`);
    gameDetailStore.setSelectedItemId(id);
    console.log(`选中了游戏项: ${id}`);
  };

  return (
    <div className="w-[260px] h-[100vh] bg-[#242223]  ">
      <div
        onClick={() => {
          navigate('/');
        }}
        className="bg-[#2e3033] w-fit rounded-[8px_16px_8px_16px] ml-[24px] mt-[32px] pl-[16px] pr-[16px] pb-[8px] pt-[8px] text-[#7D7C7F] text-[14px] flex items-center cursor-pointer"
      >
        <div className="w-[24px] h-[24px] object-contain mr-[8px]">
          <img src="/gameDetail/goHome.png" alt="Home" />
        </div>
        <span>{t('gameDetail.Home')}</span>
      </div>

      {/* 游戏菜单项列表 */}
      <div className="mt-[40px] pl-[24px]">
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
  );
});

export default GameDetail;
