import {
  ZKLOGIN_EXPIRE_DAY,
  ZKLOGIN_EXPIRE_END,
} from '@/assets/config/constant';
import {
  createAction,
  createReducer,
  configureStore,
  type PayloadAction,
} from '@reduxjs/toolkit';
export const connect = createAction<string>('connect');
export const disconnect = createAction('disconnect');
export const setZkLoginData = createAction<any>('setZkLoginData');
export const setIsZkLogin = createAction<boolean>('setIsZkLogin');
export const setIsWalletLogin = createAction<boolean>('setIsWalletLogin');
export const clearLoginData = createAction('clearLoginData');
export const setOpenWalletModal = createAction<boolean>('setOpenWalletModal');
export const setOpenWalletModalMobile = createAction<boolean>(
  'setOpenWalletModalMobile'
);
export const walletName = 'OneWallet';

const reducer = createReducer(
  {
    connect: false,
    openWalletModal: false,
    openWalletModalMobile: false,
    account: '',
    zkLoginData:
      JSON.parse(localStorage.getItem('zkloginData') as string) || null,
    isZkLogin: localStorage.getItem('isZkLogin') === '1' ? true : false,
    isWalletLogin: localStorage.getItem('isWalletLogin') === '1' ? true : false,
  },
  (builder) =>
    builder
      .addCase(connect, (state, action: PayloadAction<string>) => {
        return {
          ...state,
          connect: true,
          account: action.payload,
        };
      })
      .addCase(disconnect, (state, action) => {
        localStorage.removeItem('isWalletLogin');
        localStorage.removeItem('zkloginData');
        localStorage.removeItem('isZkLogin');
        return {
          ...state,
          connect: false,
          account: '',
        };
      })
      .addCase(setZkLoginData, (state, action: PayloadAction<any>) => {
        localStorage.setItem('zkloginData', JSON.stringify(action.payload));
        window.localStorage.setItem('connectedWallet', walletName);
        localStorage.setItem(
          ZKLOGIN_EXPIRE_END,
          (
            new Date().getTime() +
            ZKLOGIN_EXPIRE_DAY * 24 * 60 * 60 * 1000
          ).toString()
        );
        return {
          ...state,
          zkLoginData: action.payload,
        };
      })
      .addCase(setIsZkLogin, (state, action: PayloadAction<boolean>) => {
        localStorage.setItem('isZkLogin', action.payload ? '1' : '0');
        localStorage.removeItem('isWalletLogin');
        return {
          ...state,
          isZkLogin: action.payload,
        };
      })
      .addCase(setIsWalletLogin, (state, action: PayloadAction<boolean>) => {
        console.log(action, 'actionactionactionactionaction');

        localStorage.setItem('isWalletLogin', action.payload ? '1' : '0');
        localStorage.removeItem('zkloginData');
        localStorage.removeItem('isZkLogin');
        return {
          ...state,
          isWalletLogin: action.payload,
        };
      })
      .addCase(setOpenWalletModal, (state, action: PayloadAction<boolean>) => {
        return {
          ...state,
          openWalletModal: action.payload,
        };
      })
      .addCase(
        setOpenWalletModalMobile,
        (state, action: PayloadAction<boolean>) => {
          document.body.classList.toggle('overflow-hidden', action.payload);
          return {
            ...state,
            openWalletModalMobile: action.payload,
          };
        }
      )
      .addCase(clearLoginData, (state) => {
        localStorage.removeItem('zkloginData');
        localStorage.removeItem('isZkLogin');
        localStorage.removeItem('isWalletLogin');
        localStorage.removeItem(ZKLOGIN_EXPIRE_END);
        return {
          ...state,
          zkLoginData: null,
          connect: false,
          isZkLogin: false,
          isWalletLogin: false,
        };
      })
);
export default configureStore({
  reducer,
});
