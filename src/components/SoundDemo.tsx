import React from 'react';
import { useSoundStore } from '../store/RootStore.ts';
import { playDemoSound, playClickSound } from '../assets/sounds/demo-sound.ts';
import useResponsive from '../utils/useResponsive';

interface SoundDemoProps {
  className?: string;
}

const SoundDemo: React.FC<SoundDemoProps> = ({ className = '' }) => {
  const soundStore = useSoundStore();
  const { isMobile } = useResponsive();

  // 处理播放演示声音
  const handlePlayDemoSound = (): void => {
    // 如果声音开启，播放演示声音
    if (soundStore.canPlaySound()) {
      playDemoSound();
    } else {
      // 提示用户声音已关闭
      console.log('Sound is disabled. Please enable sound in settings.');
      // 可以选择播放一个视觉反馈，或者在UI中显示提示
    }
    // 无论声音是否开启，都播放点击音效的视觉反馈
    playClickSound(); // 这个音效会根据声音设置自动决定是否播放
  };

  // 检查声音设置的状态文本
  const getSoundStatusText = (): string => {
    if (!soundStore.isSoundEnabled) {
      return t('app.mute');
    } else if (soundStore.volume === 0) {
      return t('app.volume') + ': 0%';
    } else {
      return t('app.unmute');
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <h2 className="text-2xl font-bold mb-4 text-dark">
        {t('app.playDemoSound')}
      </h2>

      <div className="flex flex-col space-y-4">
        {/* 声音状态指示 */}
        <div className="flex items-center justify-between">
          <span className="text-secondary">
            {t('app.sound')}: {getSoundStatusText()}
          </span>
          <span className="text-sm text-secondary">
            {t('app.volume')}: {soundStore.volume}%
          </span>
        </div>

        {/* 演示按钮 */}
        <button
          onClick={handlePlayDemoSound}
          className={`w-full py-3 px-6 bg-primary text-white rounded-lg font-medium transition-all duration-300 transform hover:bg-primary/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
            isMobile ? 'text-lg' : 'text-base'
          }`}
          disabled={!soundStore.isSoundEnabled && soundStore.volume === 0}
        >
          {t('app.playDemoSound')}
        </button>

        {/* 声音设置提示 */}
        <div className="mt-4 p-4 bg-light rounded-lg">
          <p className="text-sm text-secondary">
            {soundStore.isSoundEnabled
              ? t('app.sound') +
                ' ' +
                t('app.unmute') +
                '. ' +
                t('app.volume') +
                ': ' +
                soundStore.volume +
                '%'
              : t('app.sound') + ' ' + t('app.mute') + '. '}
            {soundStore.isSoundEnabled && soundStore.volume > 0
              ? t('app.playSound')
              : 'Please enable sound in the top navigation bar to hear audio.'}
          </p>
        </div>
      </div>

      {/* 可视化声音动画（仅在播放时显示） */}
      <div className="mt-6 flex justify-center gap-1">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="w-2 h-12 bg-primary rounded-full animate-sound-wave"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SoundDemo;
