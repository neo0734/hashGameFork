// 动态设置html的fontSize以实现响应式设计
export function setupResponsiveFontSize(): void {
  // 动态设置html的fontSize
  function setHtmlFontSize(): void {
    const html = document.documentElement;
    const screenWidth = html.clientWidth;
    // 限制最大值和最小值
    const fontSize = Math.min(Math.max(screenWidth / 20, 14), 18);
    html.style.fontSize = `${fontSize}px`;
  }
  
  // 初始化
  setHtmlFontSize();
  // 监听窗口大小变化
  window.addEventListener('resize', setHtmlFontSize);
  window.addEventListener('orientationchange', setHtmlFontSize);
}

export default setupResponsiveFontSize;