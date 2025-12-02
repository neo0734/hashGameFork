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

import ConnectWallet from '../ConnectWallet';
import Loading from '../Loading';
import googleIcon from '@/assets/images/common/google.svg';
import { clearLoginData, setOpenWalletModalMobile } from '@/store/index';
import { useDispatch, useSelector } from 'react-redux';
import appleIcon from '@/assets/images/common/apple.svg';
import dashboardIcon from '@/assets/images/common/dashboard.svg';

const ConnectMobile: React.FC<{
  direction: 'top' | 'bottom';
  cls?: string;
}> = ({
  direction = 'bottom',
  cls = '',
}: {
  direction?: 'top' | 'bottom';
  cls?: string;
}) => {
  const dispatch = useDispatch();
  const currentAccount = useCurrentAccount();
  const [openDown, setOpenDropdown] = useState(false);
  const [openLoading, setOpenLoading] = useState(true);
  const { mutate: disconnect } = useDisconnectWallet();
  const pathname = useLocation().pathname;
  const zkLoginData = useSelector((state: any) => state.zkLoginData);
  const openWalletModalMobile = useSelector(
    (state: any) => state.openWalletModalMobile
  );
  useEffect(() => {
    if (zkLoginData || currentAccount) {
      dispatch(setOpenWalletModalMobile(false));
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

  // let zkLoginData = {
  //   email: 'sdfsdfs@qqq.com',
  //   provider: 'google',
  //   zkloginUserAddress: 'gxccccccoogle',
  // };

  return (
    <div className={`signin-area-mobile ${cls}`}>
      {zkLoginData || currentAccount ? (
        <div
          onClick={() => {
            currentAccount || zkLoginData;
          }}
        >
          <div
            className="signin-btn  pointer flex items-center"
            onClick={() => {
              setOpenDropdown(true);
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
            &nbsp;
            {zkLoginData && zkLoginData?.email
              ? addPoint(zkLoginData?.email, direction === 'top' ? 7 : 3)
              : addPoint(
                  currentAccount?.address ||
                    (zkLoginData?.zkloginUserAddress as string),
                  3
                )}
          </div>
          {openDown ? (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50"
              onClick={() => {
                setOpenDropdown(false);
              }}
            >
              <div
                className="bg-[#242223] w-full max-w-md rounded-t-2xl p-6 transform transition-transform duration-300 linear translate-y-0 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div>{t('home.Account')}</div>
                <img
                  src={'/home/close.png'}
                  alt="Close"
                  className="absolute w-[24px] h-[24px] top-4 right-4 cursor-pointer"
                  onClick={() => {
                    setOpenDropdown(false);
                  }}
                />
                {zkLoginData ? (
                  <div className=" mt-6 items-center">
                    <div className="bg-[#414043] rounded-xl px-[16px] py-[8px] w-full mb-[32px]">
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
                          <span className="flex-1 pl-[8px] text-[#7D7C7F] text-[12px] truncate whitespace-nowrap">
                            {zkLoginData?.email}
                          </span>
                        ) : (
                          <span className="flex-1 pl-[8px] text-[#7D7C7F] text-[12px] truncate whitespace-nowrap">
                            {addPoint(zkLoginData?.zkloginUserAddress, 3)}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col items-center gap-[5px] mt-[16px]">
                        <span className="text-[14px] text-[#BDBCBE]">
                          {t('home.Wallet')}
                        </span>
                        <span
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            if (zkLoginData?.zkloginUserAddress) {
                              onCopyToText(zkLoginData?.zkloginUserAddress);
                            }
                          }}
                          className="flex items-center gap-[5px] text-[14px]"
                        >
                          {addPoint(zkLoginData?.zkloginUserAddress, 8)}
                          <img
                            src={'/home/copy.png'}
                            alt=""
                            className="w-[24px] h-[24px] cursor-pointer"
                          />
                        </span>
                      </div>
                    </div>
                    <div
                      className="dropdown-menu-disconnect justify-center align-center flex flex-center   mb-[32px]  "
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
                  <>
                    <div className="flex flex-col gap-[5px] pt-2 items-center mt-6 p-6 bg-[#414043] rounded-xl">
                      <div className="flex justify-center gap-4 pt-2">
                        <img
                          src={'/home/ICON-Small.png'}
                          alt=""
                          className="w-[20px] h-[20px]"
                        />
                        {currentAccount?.address ? (
                          <span className="text-[14px]">Wallet address</span>
                        ) : (
                          ''
                        )}
                      </div>
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          if (currentAccount?.address) {
                            onCopyToText(currentAccount?.address);
                          }
                        }}
                        className="flex items-center text-[14px] gap-5px pt-2"
                      >
                        {addPoint(currentAccount?.address as string, 12)}
                        <img
                          src={'/home/copy.png'}
                          alt=""
                          className="w-[24px] h-[24px] cursor-pointer"
                        />
                      </span>
                    </div>
                    &nbsp;
                    <div
                      className="dropdown-menu-disconnect justify-center align-center flex flex-center flex-middle mb-[16px]"
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
                  </>
                )}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        <div
          className="flex items-center  cursor-pointer mr-3"
          onClick={() => dispatch(setOpenWalletModalMobile(true))}
        >
          <div className="w-[24px] h-[24px] md:w-[24px] md:h-[24px] object-contain">
            <img
              src="/home/ICON-Small.png"
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {openWalletModalMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50"
          onClick={() => {
            console.log(1111);
            dispatch(setOpenWalletModalMobile(false));
          }}
        >
          <div
            className="bg-[#242223] w-full max-w-md rounded-t-2xl p-6 transform transition-transform duration-300 linear translate-y-0 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={'/home/close.png'}
              alt="Close"
              className="absolute w-[24px] h-[24px] top-4 right-4 cursor-pointer"
              onClick={() => dispatch(setOpenWalletModalMobile(false))}
            />
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
                    dispatch(setOpenWalletModalMobile(false));
                    setOpenLoading(true);
                  }}
                />
                {/* <div className="signin-modal-content-body-line w100 flex flex-center flex-middle w100">
                  <div className="signin-modal-content-body-line-text w100 flex flex-middle gap-10 cf w100">
                    <span className='m-fz-12 cf ta'>{t('signin.or')}</span>
                  </div>
                </div> */}

                {/* <ConnectWallet /> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectMobile;
