// 动态生成简单的音效

export function playDemoSound(): void {
  try {
    // 创建音频上下文
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // 创建振荡器节点
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // 连接节点
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // 设置参数
    oscillator.type = 'sine'; // 正弦波
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4音符
    oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.2); // 上升到A5
    oscillator.frequency.exponentialRampToValueAtTime(220, audioContext.currentTime + 0.5); // 下降到A3
    
    // 设置音量包络
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.7);
    
    // 播放声音
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.7);
  } catch (error) {
    console.error('Failed to play sound:', error);
  }
}

export function playClickSound(): void {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'square'; // 使用square代替click类型
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    console.error('Failed to play click sound:', error);
  }
}