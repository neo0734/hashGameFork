import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// 主语言包
import enTranslation from './locales/en.json';
import zhTranslation from './locales/zh.json';
// 模块化语言包 - home
import homeEnTranslation from './locales/home/en.json';
import homeZhTranslation from './locales/home/zh.json';
// 模块化语言包 - login
import gameDetailEnTranslation from './locales/gameDetail/en.json';
import gameDetailZhTranslation from './locales/gameDetail/zh.json';

// 在浏览器环境中初始化 i18next
if (typeof window !== 'undefined') {
  // 从 localStorage 获取保存的语言设置
  const savedLang = localStorage.getItem('appLanguage') || 'en';

  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: {
          ...enTranslation,
          ...homeEnTranslation,
          ...gameDetailEnTranslation,
        },
      },
      zh: {
        translation: {
          ...zhTranslation,
          ...homeZhTranslation,
          ...gameDetailZhTranslation,
        },
      },
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

  // 创建响应式的t函数，确保语言切换时能正确反映当前语言的翻译
  (window as any).t = function (key: string, options?: any) {
    return i18n.t(key, options);
  };

  // 监听语言变化事件，当语言改变时更新window.t函数的引用
  i18n.on('languageChanged', () => {
    // 重新绑定window.t函数，确保它使用最新的语言环境
    const newT = function (key: string, options?: any) {
      return i18n.t(key, options);
    };
    (window as any).t = newT;

    // 可选：触发一个全局事件，让应用知道语言已改变
    const event = new Event('languageChanged');
    window.dispatchEvent(event);
  });
}

// 导出 i18n 实例
export default i18n;
