import { useCallback, useEffect, useState } from 'react';
import googleIcon from '@/assets/images/common/google.svg';
import { Ed25519Keypair } from '@onelabs/sui/keypairs/ed25519';
import {
  CLIENT_ID,
  KEY_PAIR_SESSION_STORAGE_KEY,
  MAX_EPOCH_LOCAL_STORAGE_KEY,
  RANDOMNESS_SESSION_STORAGE_KEY,
  REDIRECT_URI,
} from '@/assets/config/constant';
import { SuiClient } from '@onelabs/sui/client';
import { generateNonce, generateRandomness } from '@onelabs/sui/zklogin';
import { PublicKey } from '@onelabs/sui/cryptography';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import appleIcon from '@/assets/images/common/apple.svg';
import './index.less';

export default ({ onJump }: { onJump: () => void }) => {
  const suiClient = new SuiClient({
    url: process.env.UMI_APP_OCT_RPC_URL || '',
  });
  const [nonce, setNonce] = useState<string>('');
  useEffect(() => {
    const init = async () => {
      //保存app_lang
      let app_lang = localStorage.getItem('app_lang') || 'en-US';
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('app_lang', app_lang);
      const ephemeralKeyPair = Ed25519Keypair.generate();
      window.sessionStorage.setItem(
        KEY_PAIR_SESSION_STORAGE_KEY,
        ephemeralKeyPair.getSecretKey()
      );
      const { epoch } = await suiClient.getLatestSuiSystemState();
      window.localStorage.setItem(
        MAX_EPOCH_LOCAL_STORAGE_KEY,
        String(Number(epoch) + 10)
      );
      const randomness = generateRandomness();
      window.sessionStorage.setItem(RANDOMNESS_SESSION_STORAGE_KEY, randomness);
      if (!ephemeralKeyPair) {
        return;
      }
      const nonce = generateNonce(
        ephemeralKeyPair.getPublicKey() as PublicKey,
        Number(epoch) + 10,
        randomness
      );
      setNonce(nonce);
    };
    init();
  }, []);
  const handleGoogleLogin = useCallback(() => {
    if (!nonce) return;
    //插件钱包断开链接

    localStorage.setItem('user_stay_pathname', window.location.pathname);
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: 'id_token',
      scope: 'openid email',
      nonce: nonce,
      state: 'google',
    });
    const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    console.log(REDIRECT_URI);
    window.location.href = loginURL;
  }, [nonce]);
  const handleAppleLogin = useCallback(() => {
    if (!nonce) return;
    //插件钱包断开链接
    localStorage.setItem('user_stay_pathname', window.location.pathname);
    const params = new URLSearchParams({
      client_id: process.env.UMI_APP_APPLE_CLIENT_ID || '',
      // redirect_uri: 'https://rwa.deltax.online/waiting',
      redirect_uri: REDIRECT_URI,
      response_type: 'code id_token',
      response_mode: 'fragment',
      // scope: "email",
      nonce: nonce,
      state: 'apple',
    });
    // https://appleid.apple.com/auth/authorize?
    // client_id=$CLIENT_ID
    // &redirect_uri=$REDIRECT_URL
    // &scope=email
    // &response_mode=form_post
    // &response_type=code%20id_token
    // &nonce=$NONCE
    const loginURL = `https://appleid.apple.com/auth/authorize?${params}`;
    window.location.href = loginURL;
  }, [nonce]);
  return (
    <div className="flex flex-col gap-[12px] w-full">
      <div
        className={
          'flex items-center gap-[4px] google-login-btn w-full' +
          (nonce ? 'cursor-pointer' : 'cursor-not-allowed')
        }
        onClick={handleGoogleLogin}
        style={{ cursor: 'pointer' }}
      >
        <img src={googleIcon} alt="google" style={{ cursor: 'pointer' }} />
        <span className="fz-14 cf">{t('common.connectWithGoogle')}</span>
        {nonce ? (
          ''
        ) : (
          <Spin size="small" indicator={<LoadingOutlined spin />} />
        )}
      </div>
      <div
        className={
          'flex items-center gap-[4px] google-login-btn w-full' +
          (nonce ? 'cursor-pointer' : 'cursor-not-allowed')
        }
        onClick={handleAppleLogin}
        style={{ cursor: 'pointer' }}
      >
        <img src={appleIcon} alt="google" style={{ cursor: 'pointer' }} />
        <span className="fz-14 cf">{t('common.connectWithApple')}</span>
        {nonce ? (
          ''
        ) : (
          <Spin size="small" indicator={<LoadingOutlined spin />} />
        )}
      </div>
    </div>
  );
};
