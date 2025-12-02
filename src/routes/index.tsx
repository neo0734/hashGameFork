import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../App';
import HomePage from '../pages/Home/Home';
import GameDetail from '../pages/GameDetail/GameDetail';
import NotFoundPage from '../pages/NotFoundPage';
import PhoneMorePage from '../pages/PhoneMorePage';
import EnvVarDemo from '../components/EnvVarDemo';
import TransferContainer from '@/pages/Transfer';
import Waiting from '@/pages/Waiting';

// 路由提供者组件
const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 外层布局路由，包含Header */}
        <Route path="/" element={<Layout />}>
          {/* 嵌套路由 */}
          <Route index element={<HomePage />} />
          <Route path="gameDetail/:id" element={<GameDetail />} />

          <Route path="phoneMorePage" element={<PhoneMorePage />} />
          <Route path="env-vars" element={<EnvVarDemo />} />
          <Route path="transfer" element={<TransferContainer />} />
          <Route path="waiting" element={<Waiting />} />
        </Route>
        {/* 404页面 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
