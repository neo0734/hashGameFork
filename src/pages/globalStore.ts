import { makeAutoObservable } from 'mobx';

class GlobalStore {
  // 选中的菜单项ID
  isMore = false;

  // 辉光小球显示
  lightBall = 0;
  // 语音开关
  isVoice = localStorage.getItem('musicSound') || 'close';

  amount = 0;

  balanceModalShow = false;
  openRechargeModal = false;
  isFirst = true;
  constructor() {
    makeAutoObservable(this);
  }

  // 更新items的方法，用于语言切换时重新获取翻译
  setIs_More(isMore: boolean) {
    this.isMore = isMore;
  }
  setBalanceModalShow(show: boolean) {
    this.balanceModalShow = show;
  }
  setIsFirst() {
    this.isFirst = false;
  }
  setOpenRechargeModal(show: boolean) {
    this.openRechargeModal = show;
  }
  setlightBall(show: number) {
    this.lightBall = show;
  }

  // 切换语音开关
  toggleVoice() {
    this.isVoice = this.isVoice === 'close' ? 'open' : 'close';
    localStorage.setItem('musicSound', this.isVoice);
  }
  setAmount(amount: number) {
    this.amount = amount;
  }
}

export default new GlobalStore();
