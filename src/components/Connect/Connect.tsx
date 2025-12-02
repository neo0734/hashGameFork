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
import { addPoint, onCopyToText } from '@/assets/util';
import { rightNetwork } from '@/assets/config';
import Zklogin from '../Zklogin';
import { Modal } from 'antd';
import ConnectWallet from '../ConnectWallet';
import Loading from '../Loading';
import googleIcon from '@/assets/images/common/google.svg';
import { clearLoginData, setOpenWalletModal } from '@/store/index';
import { useDispatch, useSelector } from 'react-redux';
import appleIcon from '@/assets/images/common/apple.svg';
import dashboardIcon from '@/assets/images/common/dashboard.svg';

const Connect: React.FC<{
  direction: 'top' | 'bottom';
}> = ({ direction = 'bottom' }: { direction?: 'top' | 'bottom' }) => {
  const dispatch = useDispatch();
  const currentAccount = useCurrentAccount();
  const [openDown, setOpenDropdown] = useState(false);
  const [openLoading, setOpenLoading] = useState(true);
  const { mutate: disconnect } = useDisconnectWallet();
  const pathname = useLocation().pathname;
  const zkLoginData = useSelector((state: any) => state.zkLoginData);
  const openWalletModal = useSelector((state: any) => state.openWalletModal);
  useEffect(() => {
    if (zkLoginData || currentAccount) {
      dispatch(setOpenWalletModal(false));
      setOpenLoading(false);
    }
  }, [zkLoginData, currentAccount]);
  // 检测当前网络

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

  // let zkLoginData = {
  //   email: 'sdfsdfs@qqq.com',
  //   provider: 'google',
  //   zkloginUserAddress: 'gxccccccoogle',
  // };

  return (
    <div className={`signin-area `}>
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
            className="signin-btn trans-btn p-l-24 p-r-24 cf fwb pointer flex items-center gap-[10px]"
            onClick={() => {
              if (currentAccount) {
                handleCopyAddress();
              }
            }}
          >
            <img
              src={
                zkLoginData
                  ? zkLoginData?.provider === 'google'
                    ? googleIcon
                    : appleIcon
                  : '/home/ICON-Small.png'
              }
              alt=""
              className="w-[20px] h-[20px] m-w-16 m-h-16"
            />
            {zkLoginData && zkLoginData?.email
              ? addPoint(zkLoginData?.email, direction === 'top' ? 7 : 3)
              : addPoint(
                  currentAccount?.address ||
                    (zkLoginData?.zkloginUserAddress as string),
                  direction === 'top' ? 7 : 3
                )}
            {currentAccount && (
              <img
                className="wallet-copy w-[24px] h-[24px] cursor-pointer"
                src={'/home/copy.png'}
                title={t('wallet.copyAddress')}
              />
            )}
          </div>
          {openDown ? (
            <div className={`signin-dropdown-menu ${direction}`}>
              {zkLoginData ? (
                <div className="dropdown-menu-title gap-[16px]">
                  <div className="flex items-center">
                    <img
                      src={
                        zkLoginData?.provider === 'google'
                          ? googleIcon
                          : appleIcon
                      }
                      alt=""
                      className="w-[20px] h-[20px]"
                    />
                    {zkLoginData?.email ? (
                      <span className="pl-[8px] text-[12px] text-[#7D7C7F]  truncate whitespace-nowrap">
                        {zkLoginData?.email}
                      </span>
                    ) : (
                      <span className="pl-[8px] text-[12px] text-[#7D7C7F]  truncate whitespace-nowrap">
                        {addPoint(zkLoginData?.zkloginUserAddress, 3)}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col items-center gap-[5px] mt-[16px]">
                    <span className="text-[#BDBCBE]">{t('home.Wallet')}</span>
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        if (zkLoginData?.zkloginUserAddress) {
                          onCopyToText(zkLoginData?.zkloginUserAddress);
                        }
                      }}
                      className="flex items-center gap-[5px]"
                    >
                      {addPoint(zkLoginData?.zkloginUserAddress, 6)}
                      <img
                        src={'/home/copy.png'}
                        alt=""
                        className="w-[24px] h-[24px] cursor-pointer"
                      />
                    </span>
                  </div>
                </div>
              ) : (
                <div className="dropdown-menu-title  flex items-center flex-nowrap gap-2 p-[16px]">
                  <img
                    src={'/home/ICON-Small.png'}
                    alt=""
                    className="w-[20px] h-[20px]"
                  />
                  <div className="flex flex-col gap-[5px]">
                    {currentAccount?.address ? (
                      <span className="text-[14px]">Wallet address</span>
                    ) : (
                      ''
                    )}
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        if (currentAccount?.address) {
                          onCopyToText(currentAccount?.address);
                        }
                      }}
                      className="flex items-center text-[14px] gap-5px"
                    >
                      {addPoint(currentAccount?.address as string, 7)}
                      <img
                        src={'/home/copy.png'}
                        alt=""
                        className="w-[24px] h-[24px] cursor-pointer"
                      />
                    </span>
                  </div>
                </div>
              )}

              <div
                className="dropdown-menu-disconnect justify-center align-center flex flex-center flex-middle m-fz-12"
                onClick={() => {
                  if (zkLoginData) {
                    dispatch(clearLoginData());
                    disconnect();
                  } else {
                    disconnect();
                    dispatch(clearLoginData());
                  }
                }}
              >
                <img
                  src={disconnectIcon}
                  alt="disconnect"
                  className="w-[24px] h-[24px]"
                />
                &nbsp;
                <span className="blue">{t('common.disconnect')}</span>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        <div
          onClick={() => dispatch(setOpenWalletModal(true))}
          className="flex items-center bg-[#3c3a3b] cursor-pointer rounded-xl px-3 py-0.5 md:px-4 md:py-1"
        >
          <div className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] object-contain">
            <img
              src="/home/ICON-Small.png"
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="whitespace-nowrap px-1.5 text-sm md:px-2 md:text-base">
            {t('home.CONNECT')}
          </div>
        </div>
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
            <Zklogin
              onJump={() => {
                dispatch(setOpenWalletModal(false));
                setOpenLoading(true);
              }}
            />
            {/* <div className="signin-modal-content-body-line w100 flex flex-center flex-middle w100">
              <div className="signin-modal-content-body-line-text w100 flex flex-middle gap-10 cf w100">
                <span className="m-fz-12 cf ta">{t('signin.or')}</span>
              </div>
            </div> */}

            {/* <ConnectWallet /> */}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Connect;
