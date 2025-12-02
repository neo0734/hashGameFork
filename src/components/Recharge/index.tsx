import React from 'react';
import globalStore from '../../pages/globalStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import styles from './index.module.less';
import { QRCodeSVG } from 'qrcode.react';
import { useCurrentAccount } from '@onelabs/dapp-kit';
import { addPoint, onCopyToText } from '@/assets/util';
import store from '@/store';

const Recharge: React.FC<{
  open: boolean;
  setOpenModal: (open: boolean) => void;
}> = observer(({ open, setOpenModal }) => {
  return (
    <Modal
      open={open}
      onCancel={() => setOpenModal(false)}
      footer={null}
      centered
      title={t('home.Recharge')}
      className={styles.modal}
    >
      <div className="relative  p-[16px]">
        {/* 标题 */}
        <div className="text-[#626469]  flex flex-col items-center justify-center rounded-2xl text-[16px] text-center">
          <div className="bg-[#110F10] w-[184px] p-[8px]  rounded-2xl mt-[16px] mb-[16px] flex flex-col items-center justify-center ">
            <QRCodeSVG
              value={store.getState().zkLoginData?.zkloginUserAddress!}
              className="rounded-2xl w-full h-full"
            />
          </div>
          <div className="text-[14px] text-[#7D7C7F] pb-[16px]">
            {t('home.Onlysend')}
          </div>
        </div>

        <div>
          <div className="text-[#fff] pt-[16px] pb-[8px]">
            {t('home.Network')}
          </div>
          <div className="bg-[#414043] py-[10px] px-[19px] rounded-xl text-[#fff] flex items-center">
            <img
              className="w-[24px] h-[24px] object-contain"
              src="/gameDetail/network.png"
            />
            <span className="px-2">OneChain Network</span>
          </div>
        </div>
        <div>
          <div className="text-[#fff] pt-[16px] pb-[8px]">
            {t('home.Address')}
          </div>
          <div className="bg-[#414043] py-[10px] px-[19px] rounded-xl text-wrap word-break-all break-all text-[#fff] ">
            {store.getState().zkLoginData?.zkloginUserAddress}
          </div>
        </div>

        <div className="flex justify-center items-center mt-[24px] pb-4">
          <div
            className="w-full h-[53px] line-height-[53px] rounded-xl bg-[#F422FF] text-white text-[16px] text-center cursor-pointer flex items-center justify-center font-bold"
            onClick={() => {
              setOpenModal(false);
              onCopyToText(store.getState().zkLoginData?.zkloginUserAddress!);
            }}
          >
            {t('signin.copyAddress')}
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default Recharge;
