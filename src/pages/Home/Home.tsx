import React from 'react';
import TopBg from './TopBg';
import TopBgText from './TopBgText';
import PlayGame from './PlayGame';
import Intro1 from './Intro1';
import Intro2 from './Intro2';
import Intro3 from './Intro3';
import Navbar from '../../components/Header/Header';
import Intro4 from './Intro4';
import Intro5 from './Intro5';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import globalStore from '../../pages/globalStore';

const HomePage: React.FC = observer(() => {
  // const { isMobile, isTablet, isDesktop } = useResponsive();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const gotoParam = queryParams.get('goto'); // 获取goto参数

  // 使用useRef存储鼠标位置和动画帧ID，减少不必要的重新渲染
  const mousePositionRef = React.useRef({ x: 0, y: 0 });
  const animatedPositionRef = React.useRef({ x: 0, y: 0 });
  const animationFrameIdRef = React.useRef<number | null>(null);
  const isAnimatingRef = React.useRef(false);

  // 存储鼠标位置的状态（只在需要时更新）
  const [displayPosition, setDisplayPosition] = React.useState({ x: 0, y: 0 });

  // 使用requestAnimationFrame进行平滑动画
  const animate = () => {
    if (!isAnimatingRef.current) return;

    const targetX = mousePositionRef.current.x;
    const targetY = mousePositionRef.current.y;
    const currentX = animatedPositionRef.current.x;
    const currentY = animatedPositionRef.current.y;

    // 缓动函数 - 使用插值让光标平滑跟随
    // 增加缓动系数使跟随更灵敏
    const easeFactor = 0.25;
    const newX = currentX + (targetX - currentX) * easeFactor;
    const newY = currentY + (targetY - currentY) * easeFactor;

    // 更新状态，确保光标始终跟随
    animatedPositionRef.current = { x: newX, y: newY };
    setDisplayPosition({ x: newX, y: newY });

    // 继续动画循环
    animationFrameIdRef.current = requestAnimationFrame(animate);
  };

  // 添加鼠标移动事件监听器并优化性能
  React.useEffect(() => {
    // 使用防抖处理鼠标移动事件
    let lastMouseMoveTime = 0;
    const MOUSE_MOVE_THROTTLE = 8; // 约120fps，平衡性能和流畅度

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();

      // 限制更新频率
      if (now - lastMouseMoveTime > MOUSE_MOVE_THROTTLE) {
        lastMouseMoveTime = now;

        // 更新目标位置但不触发立即渲染，使用pageX和pageY确保考虑页面滚动
        mousePositionRef.current = { x: e.pageX, y: e.pageY };

        // 如果动画未启动，启动动画
        if (!isAnimatingRef.current) {
          isAnimatingRef.current = true;
          animate();
        }
      }
    };

    // 添加事件监听器
    window.addEventListener('mousemove', handleMouseMove);

    // 清理函数
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      isAnimatingRef.current = false;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  // 当组件挂载或goto参数变化时，滚动到对应id的元素
  React.useEffect(() => {
    if (gotoParam) {
      const element = document.getElementById(gotoParam);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        // 更新URL，移除goto参数
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.delete('goto');
        const newUrl = `${location.pathname}${
          newSearchParams.toString() ? '?' + newSearchParams.toString() : ''
        }`;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, [gotoParam]);

  // 可以根据需要获取其他参数
  // console.log('URL参数:', location);

  return (
    <div>
      <Navbar />
      {/* 添加relative定位作为子元素absolute定位的参照 */}
      <div
        className="pt-[82px] px-4 flex flex-col items-center relative"
        id="EXPLORE1"
      >
        {/* Header模糊光标 */}
        {/* 跟随鼠标移动的模糊光标 - 相对屏幕中心定位 */}
        <div
          className={`w-10 h-10 bg-[#f422ff] rounded-full blur-xl fixed z-50`}
          style={{
            pointerEvents: 'none', // 确保光标不会干扰其他元素
            willChange: 'transform', // 提示浏览器优化动画性能
            // 设置transform-origin为元素中心点
            transformOrigin: 'center',
            opacity: globalStore.lightBall,
            zIndex: 9999,
            // 减去屏幕一半的宽度和高度，使元素相对于屏幕中心定位
            transform: `translate3d(${
              displayPosition.x - window.innerWidth / 2
            }px, ${displayPosition.y - 100 - window.scrollY}px, 0)`,
          }}
        ></div>

        <TopBg />
        <TopBgText />
        <PlayGame />
        <Intro1 />
        <Intro2 />
        <Intro3 />
        <Intro4 />
        <Intro5 />
      </div>
    </div>
  );
});

export default HomePage;
