import Transfer from '@/components/Transfer';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import globalStore from '../../pages/globalStore';
import { useDispatch, useSelector } from 'react-redux';
import appleIcon from '@/assets/images/common/apple.svg';
import googleIcon from '@/assets/images/common/google.svg';
import { addPoint, formatNumber, onCopyToText } from '@/assets/util';
import { useCurrentAccount } from '@onelabs/dapp-kit';
import { usdhName } from '@/utils/utils';
import { observer } from 'mobx-react-lite';
import { getBalanceFetch } from '@/server/pay';
import store from '@/store';
import { get } from 'lodash';
const BalanceModal: React.FC<{}> = observer(() => {
  const navigate = useNavigate();

  const zkLoginData = useSelector((state: any) => state.zkLoginData);
  const currentAccount = useCurrentAccount();

  const getBalacne = async () => {
    try {
      const balanceResult = await getBalanceFetch(
        store.getState().zkLoginData?.zkloginUserAddress,
        process.env.UMI_APP_COINTYPE || ''
      );

      globalStore.setAmount(get(balanceResult, 'data.result.totalBalance', 0));
    } catch (error) {}
  };
  return (
    <>
      {globalStore.balanceModalShow && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 cursor-pointer"
          onClick={() => {
            console.log(1111);
            globalStore.setBalanceModalShow(false);
          }}
        >
          <div className="absolute inset-0" />

          <div
            className="bg-[#242223] w-full max-w-md rounded-t-2xl p-6 transform transition-transform duration-300 linear translate-y-0 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div>{t('home.Balance')}</div>
            <img
              src={'/home/close.png'}
              alt="Close"
              className="absolute w-[24px] h-[24px] top-4 right-4 cursor-pointer"
              onClick={() => {
                globalStore.setBalanceModalShow(false);
              }}
            />
            <div className={``}>
              <div className="bg-[#414043] rounded-xl mt-[22px]  mb-[32px] p-[16px]">
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
                  <span>
                    {formatNumber(globalStore.amount / 1000000000, 2)}
                  </span>
                  <span className="text-[#BDBCBE]">{usdhName}</span>
                </div>
              </div>

              <div
                className="bg-white py-[12px] rounded-xl text-[#110F10] text-[14px] justify-center align-center flex flex-center flex-middle m-fz-12"
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
                <span className="blue">{t('home.Recharge')}</span>
              </div>

              <div
                className="bg-[#F422FF33] mt-[16px] py-[12px] rounded-xl text-[#F422FF] text-[14px]  justify-center align-center flex flex-center flex-middle "
                onClick={() => {
                  navigate(
                    `/transfer?back=${encodeURIComponent(
                      window.location.pathname
                    )}`
                  );
                }}
              >
                <img
                  src={'/home/transfer.png'}
                  alt="disconnect"
                  className="w-[24px] h-[24px]"
                />
                &nbsp;
                <span className="blue">{t('home.Transfer')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default BalanceModal;
