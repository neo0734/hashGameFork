import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from '@onelabs/dapp-kit';
import { getFullnodeUrl } from '@onelabs/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@onelabs/dapp-kit/dist/index.css';
import { Provider } from 'react-redux';
import store from './store/index.ts';
import { post } from './http';
import { chainName } from './assets/config';
// 导入路由配置
import AppRouter from './routes/index.tsx';
// 导入并初始化i18n
// 导入响应式字体大小设置
import setupResponsiveFontSize from './utils/responsiveFontSize';
import './i18n';
import './assets/less/common.less';
import './assets/fonts/font.css';
import './index.css';

// Config options for the networks you want to connect to
const { networkConfig } = createNetworkConfig({
  // localnet: { url: getFullnodeUrl('localnet') },
  mainnet: {
    url: getFullnodeUrl('mainnet'),
    variables: {
      myMovePackageId: '0x456',
    },
  },
  testnet: {
    url: getFullnodeUrl('mainnet'),
    variables: {
      myMovePackageId: '0x123',
    },
  },
});
const queryClient = new QueryClient();

// 设置响应式字体大小
setupResponsiveFontSize();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider
          networks={networkConfig}
          defaultNetwork={
            Number(process.env.UMI_APP_IS_MAINNET) ? 'mainnet' : 'testnet'
          }
          onNetworkChange={(network) => {
            console.log('Network changed:', network);
          }}
        >
          <WalletProvider
            autoConnect={Number(store.getState().isWalletLogin) ? true : false}
          >
            <AppRouter />
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
