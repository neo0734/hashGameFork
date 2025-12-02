import { useState, useEffect } from 'react';
import type { DeviceType, Breakpoints } from './responsive';
import { 
  defaultBreakpoints,
  getDeviceType,
  isMobile,
  isTablet,
  isDesktop
} from './responsive';

interface UseResponsiveResult {
  deviceType: DeviceType;
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * 响应式设计的React Hook
 * @param breakpoints 自定义断点设置
 * @returns 响应式状态
 */
export const useResponsive = (
  breakpoints: Breakpoints = defaultBreakpoints
): UseResponsiveResult => {
  // 初始化状态
  const [width, setWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );
  
  const [height, setHeight] = useState<number>(
    typeof window !== 'undefined' ? window.innerHeight : 720
  );

  // 计算设备类型
  const deviceType = getDeviceType(width, breakpoints);
  
  // 设置事件监听器
  useEffect(() => {
    // 处理窗口大小变化
    const handleResize = (): void => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    // 添加事件监听器
    window.addEventListener('resize', handleResize);

    // 清理函数
    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    deviceType,
    width,
    height,
    isMobile: isMobile(width, breakpoints),
    isTablet: isTablet(width, breakpoints),
    isDesktop: isDesktop(width, breakpoints)
  };
};

// 导出默认Hook
export default useResponsive;