import { SuiClient } from '@onelabs/sui/client';
import { Transaction } from '@onelabs/sui/transactions';
import { Ed25519Keypair } from '@onelabs/sui/keypairs/ed25519';
import { getZkLoginSignature, genAddressSeed } from '@onelabs/sui/zklogin';
import { jwtDecode } from 'jwt-decode';
import store from '@/store';
import { SuiHTTPTransport } from '@mysten/sui/client';
import { executeTx, gasReserve } from '@/server/pay';
import currentNetwork from '@/assets/config';
interface BudgetResult {
  gas_coins: { objectId: string; version: string | number; digest: string }[];
  reservation_id: string;
  sponsor_address: string;
}

export class ZkloginClient {
  private useSuiPool = currentNetwork.useGasPool;
  private budgetGas = currentNetwork.gasBudget;
  private reserveDurationSecs = currentNetwork.reserveDurationSecs;
  private transport: SuiHTTPTransport;
  public suiClient: SuiClient;
  constructor(suiClient: SuiClient) {
    this.suiClient = suiClient as any;
    this.transport = new SuiHTTPTransport({
      url: import.meta.env.UMI_APP_OCT_RPC_URL || '',
    });
  }
  async sendTransaction(
    tx: Transaction,
    donotuseGasPool: boolean = false,
    pureReturnParams: boolean = false
  ) {
    //init zklogindata
    const {
      zkProof,
      zkloginUserAddress,
      userSalt,
      decodedJwt,
      ephemeralKeyPairSecret,
      maxEpoch,
    } = await this.initZkliginData();

    const ephemeralKeyPair = Ed25519Keypair.fromSecretKey(
      ephemeralKeyPairSecret
    );
    if (this.useSuiPool && !donotuseGasPool) {
      //use sui pool
      const budgetResult: any = await this.reserveGas(15000000, 600);

      console.log(budgetResult, 'executeTxexecuteTx');

      const reservationId = budgetResult.reservation_id;
      if (!reservationId) {
        throw new Error('reserve gas failed: reservation_id not found');
      }
      tx.setGasOwner(budgetResult?.sponsor_address || '');
      tx.setGasPayment(budgetResult?.gas_coins || []);
      tx.setSender(zkloginUserAddress || '');
      const { bytes, signature: userSignature } = await this.signTransaction(
        tx,
        ephemeralKeyPair
      );

      console.log(ephemeralKeyPair, 'ephemeralKeyPairephemeralKeyPair');

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
      const txBytesBase64 =
        typeof bytes === 'string'
          ? bytes
          : btoa(String.fromCharCode(...Array.from(bytes as Uint8Array)));
      if (pureReturnParams) {
        return {
          reservation_id: reservationId,
          tx_bytes: txBytesBase64,
          user_sig: zkLoginSignature,
        };
      } else {
        const executeRes: any = await this.executeTransaction(
          reservationId,
          txBytesBase64,
          zkLoginSignature
        );
        return executeRes;
      }
    } else {
      tx.setSender(zkloginUserAddress || '');
      const { bytes, signature: userSignature } = await this.signTransaction(
        tx,
        ephemeralKeyPair
      );
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
      const result = await this.signAndExecuteTransaction(
        bytes,
        zkLoginSignature
      );
      return result;
    }
  }

  async initZkliginData() {
    const zkLoginData = store.getState().zkLoginData;
    if (!zkLoginData) {
      throw new Error('zkLogin data not found');
    }

    try {
      // 检查必要的 zkLogin 数据
      const {
        zkproof: zkProof,
        zkloginUserAddress,
        salt: userSalt,
        jwt,
        ephemeralKeyPairSecret,
        maxEpoch,
      } = zkLoginData;
      if (!zkProof || !zkloginUserAddress || !userSalt || !jwt || !maxEpoch) {
        throw new Error('Incomplete zkLogin data');
      }

      // 解码 JWT 获取必要信息
      const decodedJwt = jwtDecode(jwt) as any;
      if (!decodedJwt?.sub || !decodedJwt?.aud) {
        throw new Error('Invalid JWT data');
      }

      // 从 sessionStorage 获取 ephemeral key pair
      if (!ephemeralKeyPairSecret) {
        throw new Error('Ephemeral key pair not found');
      }
      return {
        zkProof,
        zkloginUserAddress,
        userSalt,
        decodedJwt,
        ephemeralKeyPairSecret,
        maxEpoch,
      };
    } catch (error) {
      throw new Error('Ephemeral key pair not found');
    }
  }

  async reserveGas(
    gasBudget: number,
    reserveDurationSecs: number
  ): Promise<BudgetResult> {
    let budgetResult: any = await gasReserve({
      gas_budget: gasBudget,
      reserve_duration_secs: reserveDurationSecs,
    });
    return budgetResult?.data?.data?.result as BudgetResult;
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
    console.log(executeRes, 'executeResexecuteRes');

    if (executeRes?.data?.error) {
      throw new Error(executeRes?.data?.error);
    }
    return executeRes?.data?.data;
  }
  async signAndExecuteTransaction(txBytes: string, zkLoginSignature: string) {
    const result = await this.suiClient.executeTransactionBlock({
      transactionBlock: txBytes,
      signature: zkLoginSignature,
    });
    return result;
  }

  async signTransaction(tx: Transaction, ephemeralKeyPair: Ed25519Keypair) {
    const { bytes, signature: userSignature } = await tx.sign({
      client: this.suiClient as any,
      signer: ephemeralKeyPair,
    });
    return { bytes, signature: userSignature };
  }
}
