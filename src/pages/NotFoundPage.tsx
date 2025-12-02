import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

export interface RouteError {
  statusText?: string;
  message?: string;
}

const NotFoundPage: React.FC = () => {
  const error = useRouteError() as RouteError;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="text-9xl font-bold text-primary mb-4">404</div>
        <h1 className="text-3xl font-bold text-dark mb-3">页面未找到</h1>
        <p className="text-gray-600 mb-6">
          您访问的页面不存在或已被移动
          {error?.statusText && `: ${error.statusText}`}
          {error?.message && `: ${error.message}`}
        </p>
        <Link to="/">
          <button className="bg-primary hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
            返回首页
          </button>
        </Link>
      </div>

      <div className="mt-8 text-center text-gray-500">
        <p>请检查您的链接是否正确，或使用顶部导航栏浏览网站</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
