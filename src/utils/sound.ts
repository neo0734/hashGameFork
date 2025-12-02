import { Howl } from 'howler';
import type { HowlOptions } from 'howler';

// 音频文件路径
export const AUDIO_PATHS = {
  bet: '/video/bet.mp3',
  lose: '/video/lose.mp3',
  win: '/video/win.mp3',
};

export type SoundKey = keyof typeof AUDIO_PATHS;

// 声音实例管理
let soundInstances: Record<string, Howl> = {};

// 初始化声音管理器
const initSoundManager = () => {
  // 创建所有音频的Howl实例
  Object.entries(AUDIO_PATHS).forEach(([key, path]) => {
    const soundOptions: HowlOptions = {
      src: [path],
      volume: 0.5, // 默认音量
      onload: () => {
        console.log(`音频 ${key} 加载完成`);
      },
      onloaderror: (_id, error) => {
        console.error(`音频 ${key} 加载失败:`, error);
      },
    };

    soundInstances[key] = new Howl(soundOptions);
  });
};

// 播放指定的声音
export const playSound = (soundKey: SoundKey) => {
  if (!soundInstances[soundKey]) {
    console.error(`声音 ${soundKey} 未初始化`);
    return;
  }

  try {
    if (
      !localStorage.getItem('musicSound') ||
      localStorage.getItem('musicSound') === 'close'
    ) {
      soundInstances[soundKey].play();
    }
    //console.log(`播放声音: ${soundKey}`);
  } catch (error) {
    console.error(`播放声音失败:`, error);
  }
};

// 提供简单的全局访问接口
const Sound = {
  play: playSound,
};

// 初始化声音管理器
initSoundManager();

export default Sound;
