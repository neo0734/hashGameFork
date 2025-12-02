import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlayGame: React.FC = () => {
  const navigate = useNavigate();

  // 可以根据需要生成任意数量的div，这里生成8个作为示例
  const items = [
    { id: 'A', name: t('home.Big-or-Smaill'), src2: '/home/playgame/a1.gif' },
    { id: 'B', name: t('home.Hash-Odd-Even'), src2: '/home/playgame/a2.gif' },
    { id: 'C', name: t('home.Lucky-Hash'), src2: '/home/playgame/a3.gif' },
    { id: 'D', name: t('home.Hash-Number'), src2: '/home/playgame/a4.gif' },
  ];

  return (
    <div className="w-full pt-[24px] sm:pt-[40px] relative ">
      <img
        src="/home/wave.png"
        className="hidden md:block absolute w-full object-contain top-[-124px]"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {items.map(({ id, name, src2 }) => (
          <div
            key={id}
            onClick={() => {
              navigate(`/gameDetail/${id}`);
            }}
            className="cursor-pointer relative overflow-hidden transition-all duration-300 
                  rounded-tl-[4px] rounded-tr-[20px] 
                  rounded-br-[20px] rounded-bl-[20px]
                  md:rounded-tl-[8px] md:rounded-tr-[40px] 
                  md:rounded-br-[40px] md:rounded-bl-[40px]
            hover:shadow-[0_0_10px_3px_rgba(244,34,255,0.75)]"
          >
            <img
              src={src2}
              alt={name}
              className="w-full h-auto
                "
            />
            <div
              className="
                bg-[#110F10]/40
                md:bg-[#110F10]/50
                absolute inset-0  hover:bg-transparent
                hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[#110F10]/50
                transition-all 
                duration-500
                rounded-tl-[4px] rounded-tr-[20px] 
                rounded-br-[20px] rounded-bl-[20px]
                md:rounded-tl-[8px] md:rounded-tr-[40px] 
                md:rounded-br-[40px] md:rounded-bl-[40px]
                "
            ></div>
            <div className="absolute bottom-4 sm:bottom-8 left-2 right-0  text-white text-[16px] font-bold">
              <div className="text-[18px] sm:text-[24px]">{name}</div>
              <div
                className="flex mt-[4px] sm:mt-[8px] 
                   items-center px-[16px] py-[4px] bg-[#593753] 
                  rounded-t-[10px] 
                  rounded-b-[8px] 
                  text-[16px]
                  sm:text-[20px]
                  justify-center
                  w-fit
                   "
              >
                <span>{t('home.Play')}</span>
                <img
                  src="/home/playgame/right.png"
                  alt={t('home.Play')}
                  className="w-[24px] h-[24px] ml-[10px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayGame;
