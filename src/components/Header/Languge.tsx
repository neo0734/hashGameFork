import React from 'react';
import { useTranslation } from 'react-i18next';

const Connect: React.FC = () => {
  const { i18n } = useTranslation();
  // 处理语言切换
  const handleLanguageChange = (language: 'en' | 'zh'): void => {
    // 如果声音开启，播放点击音效
    i18n.changeLanguage(language);
    // 保存到localStorage
    localStorage.setItem('appLanguage', language);
  };
  return (
    <div
      className="flex items-center pl-3 md:pl-4 cursor-pointer"
      onClick={() => handleLanguageChange(i18n.language === 'en' ? 'zh' : 'en')}
    >
      <div className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] object-contain">
        <img src="/home/earth.png" alt="logo" className="w-full h-full " />
      </div>
      <div className="px-1.5 md:px-2 whitespace-nowrap text-sm md:text-base">
        {i18n.language === 'en' ? 'EN' : '中文'}
      </div>
    </div>
  );
};

export default Connect;
