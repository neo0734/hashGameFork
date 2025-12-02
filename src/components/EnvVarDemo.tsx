import React from 'react';

/**
 * 环境变量演示组件
 * 展示如何在React组件中访问Vite环境变量
 */
const EnvVarDemo: React.FC = () => {
  // 从环境变量中获取配置
  const appName = import.meta.env.VITE_APP_NAME;
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const apiUrl = import.meta.env.VITE_API_URL;
  const debugMode = import.meta.env.VITE_DEBUG === 'true';
  const featureSound = import.meta.env.VITE_FEATURE_SOUND === 'true';
  const featureAnalytics = import.meta.env.VITE_FEATURE_ANALYTICS === 'true';

  // 获取所有以VITE_开头的环境变量
  const viteEnvVars = Object.entries(import.meta.env)
    .filter(([key]) => key.startsWith('VITE_'))
    .map(([key, value]) => ({ key, value }));

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      margin: '20px 0',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>环境变量配置</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '10px', color: '#555' }}>基本配置</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '8px' }}><strong>应用名称:</strong> {appName}</li>
          <li style={{ marginBottom: '8px' }}><strong>应用版本:</strong> {appVersion}</li>
          <li style={{ marginBottom: '8px' }}><strong>API URL:</strong> {apiUrl}</li>
          <li style={{ marginBottom: '8px' }}><strong>调试模式:</strong> {debugMode ? '开启' : '关闭'}</li>
        </ul>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '10px', color: '#555' }}>功能开关</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '8px' }}><strong>声音功能:</strong> {featureSound ? '开启' : '关闭'}</li>
          <li style={{ marginBottom: '8px' }}><strong>分析功能:</strong> {featureAnalytics ? '开启' : '关闭'}</li>
        </ul>
      </div>
      
      {debugMode && (
        <div>
          <h3 style={{ marginBottom: '10px', color: '#555' }}>所有环境变量 (调试模式)</h3>
          <pre style={{
            backgroundColor: '#333',
            color: '#fff',
            padding: '15px',
            borderRadius: '4px',
            overflowX: 'auto',
            fontSize: '12px'
          }}>
            {JSON.stringify(viteEnvVars, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default EnvVarDemo;