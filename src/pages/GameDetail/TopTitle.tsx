import React from 'react';
import { find } from 'lodash';
import gameDetailStore from './GameDetailStore';
import { observer } from 'mobx-react-lite';

const TopTitle: React.FC = observer(() => {
  // 创建图标数组，从a1到a10
  const icons = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-evenly  py-[16px] px-[24px]">
      {/* 左侧图标：a1到a4 */}
      {icons.slice(0, 4).map((num) => (
        <div key={`left-${num}`} className="w-[54px] h-[32px] object-contain">
          <img src={`/gameDetail/top/a${num}.png`} />
        </div>
      ))}

      {/* 中间的游戏名称 */}
      <div className="flex items-center mx-[16px]">
        <div className="w-[40px] h-[40px] object-contain">
          <img src={`/gameDetail/top/a5.png`} />
        </div>

        <span className="text-[#fff] text-[32px] font-medium px-[28px]">
          {
            find(
              gameDetailStore.items,
              (item) => item.id === gameDetailStore.selectedItemId
            )?.name
          }
        </span>
        <div className="w-[40px] h-[40px] object-contain">
          <img src={`/gameDetail/top/a6.png`} />
        </div>
      </div>

      {/* 右侧图标：a7到a10 */}
      {icons.slice(6).map((num) => (
        <div key={`left-${num}`} className="w-[54px] h-[32px] object-contain">
          <img src={`/gameDetail/top/a${num}.png`} />
        </div>
      ))}
    </div>
  );
});

export default TopTitle;
