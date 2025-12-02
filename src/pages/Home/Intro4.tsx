import React, { useState } from 'react';
import { t } from 'i18next';

const TopBg: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const list = [
    {
      name: t('home.OneWallet'),
      to: [t('home.desc11'), t('home.desc12)')],
    },
    {
      name: t('home.startgame'),
      to: [
        t('home.desc21'),
        t('home.desc22'),
        t('home.desc23'),
        t('home.desc24'),
      ],
    },
    {
      name: t('home.obtained'),
      to: [
        t('home.desc31'),
        t('home.desc32'),
        t('home.desc33'),
        t('home.desc34'),
        t('home.desc35'),
      ],
    },
    {
      name: t('home.safe'),
      to: t('home.desc4'),
    },
    {
      name: t('home.diffent'),
      to: [t('home.desc51'), t('home.desc52')],
    },
  ];

  return (
    <div
      id="FAQ"
      className="w-full flex mt-[40px] md:mt-[80px] flex-col md:flex-row justify-center md:justify-between  items-center md:items-start "
    >
      <div className="hidden md:block text-center">
        <div className=" text-[#fff] text-[88px] leading-[80px]">
          <div> {t('home.FAQ')}</div>
        </div>
        <div className="w-[278px] h-[278px] md:w-[340px] md:h-[340px] object-contain">
          <img src="/home/twoCoine.png" />
        </div>
      </div>
      {/* 手机模式 */}
      <div className="md:hidden w-full relative h-[220px]">
        <div className=" text-[#fff] text-[32px] leading-[80px]">
          <div> {t('home.FAQ')}</div>
        </div>
        <div className="w-[170px] h-[170px] object-contain absolute top-6 right-10">
          <img src="/home/twoCoine.png" />
        </div>
      </div>
      <div className="w-[90vw] md:w-[42vw]">
        {list.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setActiveIndex(activeIndex === index ? -1 : index);
            }}
            className={`mb-[16px] p-[16px] md:p-[20px] rounded-[30px] border border-[#333] transition-all duration-300 hover:border-white cursor-pointer relative justify-between items-center bg-[#1A1A1A]`}
          >
            <span className="text-white text-[14px]">{item.name}</span>
            <div className="w-[24px] h-[24px]  object-contain absolute right-[16px] top-[22px]">
              <img
                src={`/gameDetail/${activeIndex === index ? 'up' : 'down'}.png`}
                alt=""
              />
            </div>
            {activeIndex === index && (
              <div className="pt-[10px] text-[14px] text-[#7D7C7F]">
                {Array.isArray(item.to) ? (
                  <div>
                    {item.to.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                ) : (
                  item.to
                )}
              </div>
            )}
            {activeIndex === 0 && activeIndex === index && (
              <div
                onClick={() => {
                  window.open(
                    'https://chromewebstore.google.com/detail/onewallet/gclmcgmpkgblaglfokkaclneihpnbkli'
                  );
                }}
                className="w-[141px] h-[52px] flex items-center mt-[22px] justify-center bg-[#F422FF] rounded-[16px] text-[#fff] text-[16px]"
              >
                OneWallet
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBg;
