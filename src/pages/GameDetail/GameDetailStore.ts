import { makeAutoObservable } from 'mobx';
import i18n from '../../i18n';
import { type WalletWithFeatures } from '@onelabs/dapp-kit';
import { Transaction } from '@onelabs/sui/transactions';
import { SuiClient, getFullnodeUrl } from '@onelabs/sui/client';
import { get, find } from 'lodash';
import { message } from 'antd';
import { post } from '@/http';
import { Ed25519Keypair } from '@onelabs/sui/keypairs/ed25519';
import { Tuple } from '@reduxjs/toolkit';
import store from '@/store';
import { getZkLoginSignature, genAddressSeed } from '@onelabs/sui/zklogin';
import { executeTx, gasReserve } from '@/server/pay';
import { jwtDecode } from 'jwt-decode';
interface BudgetResult {
  gas_coins: { objectId: string; version: string | number; digest: string }[];
  reservation_id: string;
  sponsor_address: string;
}

const suiClient = new SuiClient({
  url: process.env.UMI_APP_OCT_RPC_URL!,
});

// 定义获取翻译后的items的函数
const getTranslatedItems = () => {
  const t = i18n.t;

  return [
    {
      id: 'A',
      betRate: 1.95,
      betUnit: 'USDH',
      name: t('home.Big-or-Smaill'),
      src2: '/gameDetail/games/a1s.png',
      src: '/gameDetail/games/a1.png',
      logo: '/gameDetail/a1logo.png',
      logoMobile: '/gameDetail/s1Logo.png',
      desc1: t('gameDetail.transaction1'),
      desc2: t('gameDetail.result'),
      desc3: t('gameDetail.single'),
      desc4: ['0,1,2,3,4', '5,6,7,8,9'],
      btms: [
        t('gameDetail.Note'),
        t('gameDetail.Note11'),
        t('gameDetail.Note12'),
        t('gameDetail.Note13'),
      ],
    },
    {
      id: 'B',
      betRate: 1.95,
      betUnit: 'USDH',
      name: t('home.Hash-Odd-Even'),
      src2: '/gameDetail/games/a2s.png',
      src: '/gameDetail/games/a2.png',
      logo: '/gameDetail/a2logo.png',
      logoMobile: '/gameDetail/s2Logo.png',
      desc1: t('gameDetail.transaction2'),
      desc2: t('gameDetail.result'),
      desc3: t('gameDetail.single'),
      desc4: ['1,3,5,7,9', '0,2,4,6,8'],
      btms: [
        t('gameDetail.Note'),
        t('gameDetail.Note11'),
        t('gameDetail.Note12'),
        t('gameDetail.Note13'),
      ],
    },
    {
      id: 'C',
      betRate: 6.28,
      betUnit: 'USDH',
      name: t('home.Lucky-Hash'),
      src2: '/gameDetail/games/a3s.png',
      src: '/gameDetail/games/a3.png',
      logo: '/gameDetail/a3logo.png',
      logoMobile: '/gameDetail/s3Logo.png',
      desc1: t('gameDetail.transaction3'),
      desc2: t('gameDetail.result'),
      desc3: t('gameDetail.single1'),
      desc4: [
        t('gameDetail.Number') + ' + ' + t('gameDetail.Letter'),
        t('gameDetail.Letter') + ' + ' + t('gameDetail.Number'),
      ],
      btms: [
        t('gameDetail.Note'),
        t('gameDetail.Note31'),
        t('gameDetail.Note32'),
        t('gameDetail.Note33'),
        t('gameDetail.Note34'),
      ],
    },
    {
      id: 'D',
      betRate: 9.98,
      betUnit: 'USDH',
      name: t('home.Hash-Number'),
      src2: '/gameDetail/games/a4s.png',
      src: '/gameDetail/games/a4.png',
      logo: '/gameDetail/a4logo.png',
      logoMobile: '/gameDetail/s4Logo.png',
      desc1: t('gameDetail.transaction4'),
      desc2: t('gameDetail.result2'),
      desc3: t('gameDetail.single'),
      desc4: ['1,3,5,7,9', '0,2,4,6,8'],
      btms: [
        t('gameDetail.Note'),
        t('gameDetail.Note41'),
        t('gameDetail.Note42'),
        t('gameDetail.Note43'),
        t('gameDetail.Note44'),
      ],
    },
  ];
};

// 替换原有的 GAME_CONFIG_X 定义为一个映射对象
const GAME_CONFIG_MAP: Record<string, any> = {
  A: {
    GAME_PACKAGE:
      '0xbf1cf8df57037baf3ec4d9193b94b3f5941816b6b34ce9f58d2110af00382474',
    USDO_POOL:
      '0xf19570f60c284349e0db8ac01f7894e1530b8fdf6b95c52e5e33d1631499eb65',
    USDO_WITNESS:
      '0x824e536c838718f3612a10c090c304aaec0822b4b7a81f3ae58757897d542392',
    GAME_STATE:
      '0x9e30f17fd40acbee25001e2ec49ffd7b2f217bfda8bd188a30e00c241f67d1ab',
    MODULE_NAME: 'big_small_game',
    ODDS: '1 : 1.95',
  },
  B: {
    GAME_PACKAGE:
      '0x1bb94bd67ba4233eb89a593b70719a495f99937e47cc6d38c721d71dfda0a90a',
    USDO_POOL:
      '0x88ac4bd3530d87f182e83af9b40c921a92129d5d0ee8a087f06143d665a2bae8',
    USDO_WITNESS:
      '0xd8fb671e3025948467214307d18564f3905f5e1286c7d6eb2e4c8520ce22420c',
    GAME_STATE:
      '0x276f7c5a1f497710dcd43f2de35f9d00ab072876711edf397afe35b394086403',
    MODULE_NAME: 'odd_even_game',
    ODDS: '1 : 1.95',
  },
  C: {
    GAME_PACKAGE:
      '0x0df59687d057356cc00cca9e83d75783d00da22aa00c39add6e9bf79bd4077a6',
    USDO_POOL:
      '0xefb10723783a1ff6be0ed37b15d8dbc53d227f12694696b79f2146a8318b4204',
    USDO_WITNESS:
      '0x17123bde5a7d94bc5f2bfc1c04a12388e7f95471ec8d4439585e3f2d54c6212d',
    GAME_STATE:
      '0x78221c84e5aac3acd2a34cb387ca63b8735bf77af64f85dbca91d4a9127cf990',
    MODULE_NAME: 'lucky_hash_game',
    ODDS: '1 : 6.28',
  },
  D: {
    GAME_PACKAGE:
      '0x0e29fa2f8e00cec2196f3f6365a69664f0bdcb4e660fe8840e53897204e3dcb6',
    USDO_POOL:
      '0x91868c01596f5a12635b502a51520012dd792ca8f96de39cac15506a3e5ac7a2',
    USDO_WITNESS:
      '0xf64cabc7641645c0246a630dac60f14bcc97bc0930a96aab65faea1cf368e156',
    GAME_STATE:
      '0x6619f15aec0e370892066eabc5d7a3ffbb2c0c334645fc68a7690f871fe5933b',
    MODULE_NAME: 'hash_number_game',
    ODDS: '1 : 9.98',
  },
};

class GameDetailStore {
  // 选中的菜单项ID
  selectedItemId: string = 'A';
  gameResult: string = 'Win';
  hashCode: string = '';
  payout_amount: number = 0;
  items = getTranslatedItems();
  connectedWallet: string = localStorage.getItem('connectedWallet') || '';
  sui_net = 'sui:testnet';
  is_loading = false;
  modalDetailVisible = false;
  isGasPool = true;

  // 将openThirdLink改为getter方法，确保每次访问都使用最新的hashCode
  get openThirdLink() {
    return `https://onescan.cc/${process.env.OneScan_URL}/transactionBlocksDetail?digest=${this.hashCode}`;
  }
  get address() {
    return (
      get(
        JSON.parse(
          localStorage.getItem('sui-dapp-kit:wallet-connection-info') || '{}'
        ),
        'state.lastConnectedAccountAddress'
      ) || ''
    );
  }
  constructor() {
    makeAutoObservable(this);

    // 监听语言变化事件，在语言切换时更新items
    if (typeof window !== 'undefined') {
      window.addEventListener('languageChanged', () => {
        this.updateItems();
      });
    }
  }

  // 更新items的方法，用于语言切换时重新获取翻译
  updateItems() {
    this.items = getTranslatedItems();
  }

  async signTransaction(tx: Transaction, ephemeralKeyPair: Ed25519Keypair) {
    console.log('xxxxxxxxxxxxxxx', ephemeralKeyPair);

    const { bytes, signature: userSignature } = await tx.sign({
      client: suiClient,
      signer: ephemeralKeyPair,
    });

    console.log('next', ephemeralKeyPair);
    return { bytes, signature: userSignature };
  }

  async callContract(GAME_CONFIG: typeof GAME_CONFIG_MAP, amount: number) {
    try {
      // 保留钱包链接
      //  const wallet = find(wallets, (e) =>
      //    e.accounts.some((account) => account.address === this.address)
      //  );
      //  if (!wallet) {
      //    console.log(wallets, 'Connected wallet:', wallet);
      //    message.error('Please connect wallet');
      //    throw new Error('Wallet not found');
      //  }

      //  await wallet.features['standard:connect'].connect();
      const zkLoginData = store.getState().zkLoginData;

      const {
        zkproof: zkProof,
        zkloginUserAddress,
        salt: userSalt,
        jwt,
        maxEpoch,
        ephemeralKeyPairSecret,
      } = zkLoginData;
      // 1. 创建交易
      const tx = new Transaction();

      //2.查找并且分割代币
      const coins = await suiClient.getCoins({
        owner: zkLoginData.zkloginUserAddress,
        coinType: process.env.UMI_APP_COINTYPE || '',
        limit: 10,
      });

      const coinIds = coins?.data?.map((c: any) => c.coinObjectId) || [];
      if (!coinIds.length) throw new Error('Insufficient balance');
      const primary = tx.object(coinIds[0]);
      if (coinIds.length > 1) {
        tx.mergeCoins(
          primary,
          coinIds.slice(1).map((id: string) => tx.object(id))
        );
      }

      const [split] = tx.splitCoins(primary, [tx.pure.u64(amount * 1e9)]);

      // 3. 添加合约调用
      tx.moveCall({
        target: `${GAME_CONFIG.GAME_PACKAGE}::${GAME_CONFIG.MODULE_NAME}::place_bet_usdo`,
        arguments: [
          tx.object(GAME_CONFIG.USDO_POOL), // 池子
          tx.object(GAME_CONFIG.USDO_WITNESS), // 见证
          tx.object(GAME_CONFIG.GAME_STATE), // 游戏状态
          split, // 币对象（数组）
          tx.object('0x6'), // 时钟
        ],
      });

      tx.setGasBudget(15000000);

      // 3. 设置Gas预算
      //tx.setGasBudget(BigInt(Math.floor(gasBudget * Number(MIST_PER_SUI))));
      var reservationId = '';
      if (this.isGasPool) {
        //预留赞助交易gas
        const budgetResult = await this.reserveGas(15000000, 600);

        reservationId = budgetResult.reservation_id;
        if (!reservationId) {
          throw new Error('reserve gas failed: reservation_id not found');
        }
        tx.setGasOwner(budgetResult?.sponsor_address || '');
        tx.setGasPayment(budgetResult?.gas_coins || []);
        tx.setSender(zkLoginData.zkloginUserAddress || '');
      }
      // 4. 钱包签名交易保留
      //  const { bytes, signature } = await wallet!.features[
      //    'sui:signTransaction'
      //  ].signTransaction({
      //    transaction: tx,
      //    account: wallet!.accounts[0],
      //    chain: this.sui_net,
      //  });

      // 4. 签名交易
      const ephemeralKeyPair = Ed25519Keypair.fromSecretKey(
        ephemeralKeyPairSecret
      );

      const { bytes, signature: userSignature } = await this.signTransaction(
        tx,
        ephemeralKeyPair
      );

      // 解码 JWT 获取必要信息
      const decodedJwt = jwtDecode(jwt) as any;
      if (!decodedJwt?.sub || !decodedJwt?.aud) {
        throw new Error('Invalid JWT data');
      }

      const addressSeed: string = genAddressSeed(
        BigInt(userSalt),
        'sub',
        decodedJwt.sub,
        decodedJwt.aud as string
      ).toString();

      // 生成 zkLogin 签名
      const zkLoginSignature = getZkLoginSignature({
        inputs: {
          ...zkProof,
          addressSeed,
        },
        maxEpoch,
        userSignature,
      });

      var result = null;
      if (this.isGasPool) {
        /************赞助交易执行交易***************/
        const txBytesBase64 =
          typeof bytes === 'string'
            ? bytes
            : btoa(String.fromCharCode(...Array.from(bytes as Uint8Array)));
        //通过赞助交易执行交易
        const executeTxRes = await this.executeTransaction(
          reservationId,
          txBytesBase64,
          zkLoginSignature
        );
        result = executeTxRes;

        /************赞助交易执行交易***************/
      } else {
        /************钱包执行交易***************/

        //5. 执行交易
        result = await suiClient.executeTransactionBlock({
          transactionBlock: bytes,
          signature: zkLoginSignature,
          options: {
            showEffects: true,
            showEvents: true,
            showObjectChanges: true,
            showInput: true,
          },
        });
        console.log('Transaction result:', result);

        /************钱包执行交易***************/
      }

      console.log(result, 'resultresult');

      // 6. 检查交易状态
      if (result.effects?.status.status !== 'success') {
        throw new Error(`Transaction failed: ${result.effects?.status.error}`);
      }
      return result;
    } catch (error) {
      console.error('Contract call failed:', error);
      this.setGameResult('');
      return error;
    }
  }

  async playGame(
    amount: number,
    type: string
    // wallet: WalletWithFeatures<any>[]
  ) {
    const message: any = {};
    const GAME_CONFIG = GAME_CONFIG_MAP[type]; // 明确类型，不再报错

    const result: any = await this.callContract(
      GAME_CONFIG,
      amount // functionName
    );
    //console.log("Game result:", result);
    if (result.effects?.status.status == 'success') {
      message.code = 0;
      message.digest = get(
        result,
        'digest',
        get(result, 'effects.transactionDigest', '')
      );
      message.is_winner = get(result, 'events[0].parsedJson.is_winner');
      message.payout_amount =
        get(result, 'events[0].parsedJson.payout_amount', 0) / 1e9; // 转换为USDO
    } else {
      message.code = 1;
      if (result.message) {
        message.error = result.message;
      } else {
        message.error = result;
      }
    }
    //console.log("Game message:", message);
    return message;
  }

  async reserveGas(
    gasBudget: number,
    reserveDurationSecs: number
  ): Promise<BudgetResult> {
    let budgetResult: any = await gasReserve({
      gas_budget: gasBudget,
      reserve_duration_secs: reserveDurationSecs,
    });
    return budgetResult?.data.data.result as BudgetResult;
  }

  async executeTransaction(
    reservationId: string,
    txBytes: string,
    zkLoginSignature: string
  ) {
    const executeRes: any = await executeTx({
      reservation_id: reservationId,
      tx_bytes: txBytes,
      user_sig: zkLoginSignature,
    });
    if (executeRes?.data?.data?.error) {
      throw new Error(executeRes?.data?.error);
    }
    return executeRes?.data?.data;
  }

  // 设置选中的菜单项
  setSelectedItemId(id: string) {
    this.selectedItemId = id;
    this.setGameResult('');
  }
  setIs_loading(is_loading: boolean) {
    this.is_loading = is_loading;
  }
  setModalDetailVisible(visible: boolean) {
    this.modalDetailVisible = visible;
  }
  setGameResult(result: string) {
    this.gameResult = result;
  }
  setHashCode(result: string) {
    this.hashCode = result;
  }
  setPayoutAmount(result: number) {
    this.payout_amount = result;
  }
}

export default new GameDetailStore();
