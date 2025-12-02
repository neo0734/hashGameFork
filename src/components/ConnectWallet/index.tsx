import { useState, useEffect, useCallback } from 'react';
import './index.less';
import {
  ConnectModal,
  useCurrentAccount,
  useCurrentWallet,
  useDisconnectWallet,
} from '@onelabs/dapp-kit';
import { onCopyToText } from '@/assets/util';
import { rightNetwork } from '@/assets/config';
import { useDispatch } from 'react-redux';
import { setIsWalletLogin } from '@/store';
export default () => {
  const dispatch = useDispatch();
  const currentAccount = useCurrentAccount();
  const [openDown, setOpenDropdown] = useState(false);
  const [open, setOpen] = useState(false);
  const { isConnecting } = useCurrentWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  // 检测当前网络
  const checkNetwork = useCallback(
    async (currentAccount: any) => {
      try {
        if (
          currentAccount.chains.length > 0 &&
          currentAccount.chains[0] !== rightNetwork
        ) {
          setIsWrongNetwork(true);
        } else {
          setIsWrongNetwork(false);
        }
      } catch (error) {
        console.error('Failed to get network info:', error);
      }
    },
    [currentAccount]
  );

  // 组件加载时检测网络
  useEffect(() => {
    if (currentAccount) {
      console.log('currentAccount', currentAccount);
      dispatch(setIsWalletLogin(true));
      checkNetwork(currentAccount);
    }
  }, [currentAccount?.chains]);
  const handleCopyAddress = () => {
    if (currentAccount?.address) {
      onCopyToText(currentAccount.address);
    }
  };
  return (
    <div className="connect-walletMobile-area">
      <ConnectModal
        open={open}
        trigger={
          <div className="signin-btn-mobile  pointer  w-full ">
            {t('common.connectWithExistingWallet')}
          </div>
        }
        onOpenChange={(isOpen) => setOpen(isOpen)}
      />
    </div>
  );
};
