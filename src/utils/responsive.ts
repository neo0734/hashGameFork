// 响应式设计相关的工具函数

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface Breakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
}

// 默认断点设置
export const defaultBreakpoints: Breakpoints = {
  mobile: 640, // 手机最大宽度
  tablet: 1024, // 平板最大宽度
  desktop: Infinity // 桌面最小宽度
};

/**
 * 判断当前设备类型
 * @param width 当前视口宽度
 * @param breakpoints 自定义断点
 * @returns 设备类型
 */
export const getDeviceType = (
  width: number,
  breakpoints: Breakpoints = defaultBreakpoints
): DeviceType => {
  if (width < breakpoints.mobile) {
    return 'mobile';
  } else if (width < breakpoints.tablet) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

/**
 * 检查是否是移动设备
 * @param width 当前视口宽度
 * @param breakpoints 自定义断点
 * @returns 是否是移动设备
 */
export const isMobile = (
  width: number,
  breakpoints: Breakpoints = defaultBreakpoints
): boolean => {
  return width < breakpoints.mobile;
};

/**
 * 检查是否是平板设备
 * @param width 当前视口宽度
 * @param breakpoints 自定义断点
 * @returns 是否是平板设备
 */
export const isTablet = (
  width: number,
  breakpoints: Breakpoints = defaultBreakpoints
): boolean => {
  return width >= breakpoints.mobile && width < breakpoints.tablet;
};

/**
 * 检查是否是桌面设备
 * @param width 当前视口宽度
 * @param breakpoints 自定义断点
 * @returns 是否是桌面设备
 */
export const isDesktop = (
  width: number,
  breakpoints: Breakpoints = defaultBreakpoints
): boolean => {
  return width >= breakpoints.tablet;
};

/**
 * 响应式监听Hook
 * 由于这是一个工具函数文件，这里不实现React Hook，
 * Hook将在使用的组件中实现
 */

/**
 * 获取Tailwind CSS对应的响应式前缀
 * @param deviceType 设备类型
 * @returns Tailwind前缀
 */
export const getTailwindPrefix = (deviceType: DeviceType): string => {
  switch (deviceType) {
    case 'mobile':
      return ''; // 默认是移动优先
    case 'tablet':
      return 'md:';
    case 'desktop':
      return 'lg:';
    default:
      return '';
  }
};