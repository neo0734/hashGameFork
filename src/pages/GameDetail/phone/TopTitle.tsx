import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import gameDetailStore from '../GameDetailStore';
import { find } from 'lodash';

const TopTitle: React.FC = observer(() => {
  // const { isMobile, isTablet, isDesktop } = useResponsive();
  const [boxImg, setBoxImg] = useState('/gameDetail/boxBg.png');

  useEffect(() => {
    if (gameDetailStore.selectedItemId) {
      const item = find(
        gameDetailStore.items,
        (item) => item.id === gameDetailStore.selectedItemId
      )?.logoMobile!;
      setBoxImg(item);
    }
  }, [gameDetailStore.selectedItemId]);
  // 获取当前路由传递的id参数

  // 处理菜单项点击
  const handleItemClick = (id: string) => {
    gameDetailStore.setSelectedItemId(id);
    console.log(`选中了游戏项: ${id}`);
  };

  return (
    <div className="mt-16 relative flex items-center justify-between w-full px-2">
      <img src={boxImg} />
      <div className="absolute right-[0px] top-[50%] translate-y-[-50%]">
        <img src="/gameDetail/menuActive.png" alt="arrow" />
      </div>
      <span className="text-[#fff] text-[16px] font-medium px-[28px]">
        {
          find(
            gameDetailStore.items,
            (item) => item.id === gameDetailStore.selectedItemId
          )?.name
        }
      </span>
    </div>
  );
});

export default TopTitle;
