import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = React.useState<string>('');
  const { i18n } = useTranslation();

  // 组件挂载时设置当前语言并添加事件监听器
  React.useEffect(() => {
    // 初始化当前语言
    const initialLang = localStorage.getItem('appLanguage') || 'en';
    setCurrentLanguage(initialLang);

    // 监听语言变化事件
    const handleLanguageChange = () => {
      const newLang = i18n.language || 'en';
      setCurrentLanguage(newLang);
    };

    window.addEventListener('languageChanged', handleLanguageChange);

    // 清理函数
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  return (
    <div key={currentLanguage} className="min-h-screen flex flex-col">
      {/* 顶部导航栏 */}
      {/* <Navbar /> */}

      {/* 主内容区域 - 路由出口 */}
      <main className="flex-grow">
        {/* max-w-[1440px] */}
        <div className="mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default App;
