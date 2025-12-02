import { useState, useEffect, useCallback } from 'react';
import './index.less';
import walletIcon from '@/assets/images/common/walletIcon.svg';
import disconnectIcon from '@/assets/images/common/disconnect.png';
import copyIcon from '@/assets/images/common/link.svg';
import { NavLink, useLocation } from 'react-router-dom';
import {
  useCurrentAccount,
  useCurrentWallet,
  useDisconnectWallet,
} from '@onelabs/dapp-kit';
import { addPoint, formatNumber, onCopyToText } from '@/assets/util';
import { rightNetwork } from '@/assets/config';
import Zklogin from '../Zklogin';
import { Modal, Drawer } from 'antd';
import ConnectWallet from '../ConnectWallet';
import Loading from '../Loading';
import googleIcon from '@/assets/images/common/google.svg';
import store, { clearLoginData, setOpenWalletModal } from '@/store/index';
import { useDispatch, useSelector } from 'react-redux';
import appleIcon from '@/assets/images/common/apple.svg';
import { observer } from 'mobx-react-lite';
import globalStore from '../../pages/globalStore';
import { usdhName } from '@/utils/utils';
import Transfer from '../Transfer';
import Recharge from '../Recharge';
import { getBalanceFetch } from '@/server/pay';
import { get } from 'lodash';
const Balance: React.FC<{
  direction: 'top' | 'bottom';
}> = observer(({ direction = 'bottom' }: { direction?: 'top' | 'bottom' }) => {
  const dispatch = useDispatch();
  const currentAccount = useCurrentAccount();
  const [openDown, setOpenDropdown] = useState(false);
  const [openRechargeModal, setOpenRechargeModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openLoading, setOpenLoading] = useState(true);
  const { isConnecting } = useCurrentWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const pathname = useLocation().pathname;
  const zkLoginData = useSelector((state: any) => state.zkLoginData);
  const openWalletModal = useSelector((state: any) => state.openWalletModal);
  useEffect(() => {
    if (zkLoginData || currentAccount) {
      dispatch(setOpenWalletModal(false));
      setOpenLoading(false);
    }
  }, [zkLoginData, currentAccount]);

  useEffect(() => {
    if (zkLoginData) {
      setOpenDropdown(false);
    }
  }, [pathname]);

  const handleCopyAddress = () => {
    if (currentAccount?.address) {
      onCopyToText(currentAccount.address);
    }
  };

  const getBalacne = async () => {
    try {
      const balanceResult = await getBalanceFetch(
        store.getState().zkLoginData?.zkloginUserAddress,
        process.env.UMI_APP_COINTYPE || ''
      );

      globalStore.setAmount(get(balanceResult, 'data.result.totalBalance', 0));
    } catch (error) {}
  };

  // let zkLoginData = {
  //   email: 'sdfsdfs@qqq.com',
  //   provider: 'google',
  //   zkloginUserAddress: 'gxccccccoogle',
  // };

  return (
    <div className={`signin-area2 mr-4`}>
      {zkLoginData || currentAccount ? (
        <div
          onMouseEnter={() => {
            (currentAccount || zkLoginData) && setOpenDropdown(true);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setOpenDropdown(false);
            }, 200);
          }}
        >
          <div
            className="signin-btn trans-btn text-[#BDBCBE] pointer flex items-center gap-[10px]"
            onClick={() => {
              if (currentAccount) {
                handleCopyAddress();
              }
            }}
          >
            {t('home.Balance')}:
            <span className="text-white">
              {formatNumber(globalStore.amount / 1e9)}
            </span>
            <span>{usdhName}</span>
            <img
              className="wallet-copy w-[24px] h-[24px] cursor-pointer"
              src={'/gameDetail/downHover.png'}
              title={t('wallet.copyAddress')}
            />
          </div>
          {openDown ? (
            <div className={`signin-dropdown-menu ${direction}`}>
              <div className="dropdown-menu-title   gap-2 p-[16px]">
                <div className="flex justify-between">
                  <div className="flex gap-[5px]">
                    <img
                      src={'/home/usdh.png'}
                      alt=""
                      className="w-[20px] h-[20px]"
                    />
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        if (currentAccount?.address) {
                          onCopyToText(currentAccount?.address);
                        }
                      }}
                      className="flex items-center text-[14px] text-[#BDBCBE] gap-5px"
                    >
                      {t('home.Balance')} ：
                    </span>
                  </div>
                  <img
                    className="w-[24px] h-[24px] cursor-pointer"
                    src="/gameDetail/refresh.png"
                    onClick={(e) => {
                      e.stopPropagation();
                      const img = e.currentTarget;
                      // 添加旋转动画类
                      img.style.transform = 'rotateZ(720deg)';
                      img.style.transition = 'transform 1s ease';
                      getBalacne();
                      // 动画结束后重置样式
                      setTimeout(() => {
                        img.style.transform = '';
                        img.style.transition = '';
                      }, 1000);
                    }}
                  />
                </div>
                <div className="flex items-center justify-between mt-[12px] text-[14px]">
                  <span>{formatNumber(globalStore.amount / 1e9)}</span>
                  <span className="text-[#BDBCBE]">{usdhName}</span>
                </div>
              </div>

              <div
                className="dropdown-menu-disconnect2 justify-center align-center flex flex-center flex-middle m-fz-12"
                onClick={() => {
                  globalStore.setOpenRechargeModal(true);
                }}
              >
                <img
                  src={'/home/rechart.png'}
                  alt="disconnect"
                  className="w-[24px] h-[24px]"
                />
                &nbsp;
                <span className="blue">{t('Recharge')}</span>
              </div>

              <div
                className="dropdown-menu-disconnect justify-center align-center flex flex-center flex-middle m-fz-12"
                onClick={() => {
                  setDrawerOpen(true);
                }}
              >
                <img
                  src={'/home/transfer.png'}
                  alt="disconnect"
                  className="w-[24px] h-[24px]"
                />
                &nbsp;
                <span className="blue">{t('Transfer')}</span>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}

      <Modal
        open={openWalletModal}
        onCancel={() => dispatch(setOpenWalletModal(false))}
        footer={null}
        centered
        width={400}
      >
        <div className="signin-modal-content">
          <div className="signin-modal-title w100 flex flex-center">
            <span className="text-[24px] font-bold cf ta w100 flex flex-center">
              {t('signin.signIn')}
            </span>
          </div>
          <div className="signin-modal-desc w-full flex items-center mt-[10px]">
            <span className="text-[12px] cf06 ta w100 flex flex-center ">
              {t('signin.desc')}
            </span>
          </div>
          <div className="pt-[20px] pb-[20px] gap-[10px] flex items-center flex-col w-full">
            {/* <Zklogin
              onJump={() => {
                dispatch(setOpenWalletModal(false));
                setOpenLoading(true);
              }}
            /> */}
            {/* <div className="signin-modal-content-body-line w100 flex flex-center flex-middle w100">
              <div className="signin-modal-content-body-line-text w100 flex flex-middle gap-10 cf w100">
                <span className='m-fz-12 cf ta'>{t('signin.or')}</span>
              </div>
            </div> */}

            <ConnectWallet />
          </div>
        </div>
      </Modal>
      <Drawer
        title={t('home.Transfer')}
        onClose={() => {
          setDrawerOpen(false);
        }}
        width={517}
        styles={{
          header: {
            color: `#fff`,
            backgroundColor: '#242223',
          },
          body: {
            backgroundColor: '#242223',
          },
          content: {
            borderTopLeftRadius: '20px',
            borderBottomLeftRadius: '20px',
          },
        }}
        open={drawerOpen}
        className="bg-[#242223]"
        closeIcon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        <Transfer />
      </Drawer>
    </div>
  );
});

export default Balance;
