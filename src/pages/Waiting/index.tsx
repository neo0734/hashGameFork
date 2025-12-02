import './index.less';
import { useEffect, useState } from 'react';
import googleIcon from '@/assets/images/common/google.svg';
import { Ed25519Keypair } from '@onelabs/sui/keypairs/ed25519';
import {
  GET_SALT_URL,
  KEY_PAIR_SESSION_STORAGE_KEY,
  MAX_EPOCH_LOCAL_STORAGE_KEY,
  OCT_PROVER_ENDPOINT,
  RANDOMNESS_SESSION_STORAGE_KEY,
} from '@/assets/config/constant';
import {
  generateNonce,
  getExtendedEphemeralPublicKey,
  jwtToAddress,
} from '@onelabs/sui/zklogin';
import { PublicKey } from '@onelabs/sui/cryptography';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

interface CustomJwtPayload {
  email?: string;
  sub?: string;
  [key: string]: any;
}
import queryString from 'query-string';
import axios from 'axios';
import { setZkLoginData, setIsZkLogin } from '@/store';
import Loading from '@/components/Loading';
import LoadingApple from '@/components/Loading/apple';
import { useTranslation } from 'react-i18next';
import appleIcon from '@/assets/images/common/apple.svg';
import { message } from 'antd';
export default () => {
  const { t } = useTranslation();
  // 简化：移除未使用的本地状态
  const [decodedJwt, setDecodedJwt] = useState<CustomJwtPayload>();
  const [oauthParams, setOauthParams] = useState<any>();
  const [zkLoginUserAddress, setZkLoginUserAddress] = useState<string>('');
  const [secondCount, setSecondCount] = useState<number>(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // 解析回调参数（Apple 使用 fragment/hash，Google 可能使用 query/hash 取决于设置）
    const hashParams = queryString.parse(location.hash);
    const queryParams = queryString.parse(location.search);
    // 优先使用包含 id_token 的集合
    const combined: any = { ...queryParams, ...hashParams };
    setOauthParams(combined);
  }, [location]);
  useEffect(() => {
    const getZkProof = async () => {
      if (oauthParams && oauthParams.id_token) {
        try {
          const decodedJwt = jwtDecode(
            oauthParams.id_token as string
          ) as CustomJwtPayload;

          setDecodedJwt(decodedJwt);
          const {
            data: {
              data: { salt },
            },
          } = await axios.post(GET_SALT_URL, {
            idToken: oauthParams?.id_token as string,
            email: decodedJwt?.email,
            provider: oauthParams?.state === 'google' ? 'google' : 'apple',
          });
          // 写死盐值
          // const salt = "94278028273088080763198422997723828305";

          const zkLoginUserAddress = jwtToAddress(oauthParams.id_token, salt);

          localStorage.setItem('zkLoginUserAddress', zkLoginUserAddress);
          setZkLoginUserAddress(zkLoginUserAddress);

          const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(
            Ed25519Keypair.fromSecretKey(
              window.sessionStorage.getItem(
                KEY_PAIR_SESSION_STORAGE_KEY
              ) as string
            )?.getPublicKey() as PublicKey
          );

          const nonce = generateNonce(
            Ed25519Keypair.fromSecretKey(
              window.sessionStorage.getItem(
                KEY_PAIR_SESSION_STORAGE_KEY
              ) as string
            )?.getPublicKey() as PublicKey,
            Number(window.localStorage.getItem(MAX_EPOCH_LOCAL_STORAGE_KEY)),
            window.sessionStorage.getItem(
              RANDOMNESS_SESSION_STORAGE_KEY
            ) as string
          );

          const zkProofResult = await axios.post(
            OCT_PROVER_ENDPOINT,
            {
              jwt: oauthParams?.id_token as string,
              extendedEphemeralPublicKey: extendedEphemeralPublicKey,
              maxEpoch: window.localStorage.getItem(
                MAX_EPOCH_LOCAL_STORAGE_KEY
              ) as string,
              jwtRandomness: window.sessionStorage.getItem(
                RANDOMNESS_SESSION_STORAGE_KEY
              ) as string,
              salt: salt,
              keyClaimName: 'sub',
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          const zkloginData = {
            zkproof: zkProofResult.data,
            zkloginUserAddress: zkLoginUserAddress,
            email: decodedJwt?.email,
            sub: decodedJwt?.sub,
            aud: decodedJwt?.aud,
            salt: salt,
            jwt: oauthParams?.id_token as string,
            extendedEphemeralPublicKey: extendedEphemeralPublicKey,
            ephemeralKeyPairSecret: window.sessionStorage.getItem(
              KEY_PAIR_SESSION_STORAGE_KEY
            ) as string,
            maxEpoch: window.localStorage.getItem(
              MAX_EPOCH_LOCAL_STORAGE_KEY
            ) as string,
            jwtRandomness: window.sessionStorage.getItem(
              RANDOMNESS_SESSION_STORAGE_KEY
            ) as string,
            nonce: nonce,
            provider: (oauthParams?.state as string) || 'google',
          };
          dispatch(setZkLoginData(zkloginData));
          dispatch(setIsZkLogin(true));
          // window.close()
          // window.location.href =
          //     localStorage.getItem("user_stay_pathname") || "/";
          navigate('/');
        } catch (error) {
          message.error(t('登录异常', { ns: 'tables' }));
          // navigate('/login');
        } finally {
        }
      }
    };
    getZkProof();
  }, [oauthParams]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (secondCount <= 0) {
        setSecondCount(0);
      } else {
        setSecondCount((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [secondCount]);
  return (
    <div className="waiting-page">
      <div className="waiting-page-content">
        <div className="waiting-page-content-title  flex flex-center flex-middle w100">
          <span className="text-[18px] text-white w-full flex justify-center items-center flex-middle gap-2 flex-col">
            {oauthParams?.state === 'google' ? (
              <Loading
                type="spinner"
                text={secondCount ? secondCount + 'S' : '0S'}
              />
            ) : (
              <LoadingApple
                type="spinner"
                text={secondCount ? secondCount + 'S' : '0S'}
              />
            )}

            {oauthParams?.state === 'google' ? (
              <img src={googleIcon} alt="" className="w-[18px] h-[18px]" />
            ) : (
              <img src={appleIcon} alt="" className="w-[24px] h-[24px]" />
            )}
            {t('home.title', {
              name: oauthParams?.state === 'google' ? 'Google' : 'Apple',
            })}
          </span>
        </div>
        <div className="waiting-page-content-title text-center">
          <span className="text-[14px] text-[#fff] opacity-60">
            {t('home.subtitle', {
              name: oauthParams?.state === 'google' ? 'Google' : 'Apple',
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
