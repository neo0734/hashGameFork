import React from 'react';

interface PaginationProps {
  current: number; // 当前页码
  onChange: (page: number) => void; // 页码改变回调
  total?: number; // 可选的总页数，默认为3
}

const PaginationCom: React.FC<PaginationProps> = ({
  current,
  onChange,
  total = 3,
}) => {
  // 处理上一页
  const handlePrevious = () => {
    if (current > 1) {
      onChange(current - 1);
    }
  };

  // 处理下一页
  const handleNext = () => {
    if (current < total) {
      onChange(current + 1);
    }
  };

  // 渲染分页点
  const renderDots = () => {
    return Array.from({ length: total }).map((_, index) => (
      <div
        key={index}
        className={`rounded-full mx-1 ${
          current === index + 1 ? 'bg-[#F422FF]' : 'bg-white'
        }`}
        style={{
          width: current === index + 1 ? '16px' : '10px',
          height: '5px',
          cursor: 'pointer',
        }}
        onClick={() => onChange(index + 1)}
      />
    ));
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}
    >
      {/* 左箭头图片 */}
      <img
        src="/gameDetail/left.png"
        alt="Previous"
        onClick={handlePrevious}
        style={{
          cursor: current > 1 ? 'pointer' : 'not-allowed',
          opacity: current > 1 ? 1 : 0.5,
        }}
      />

      {/* 分页点 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {renderDots()}
      </div>

      {/* 右箭头图片 */}
      <img
        src="/gameDetail/right2.png"
        alt="Next"
        onClick={handleNext}
        style={{
          cursor: current < total ? 'pointer' : 'not-allowed',
          opacity: current < total ? 1 : 0.5,
        }}
      />
    </div>
  );
};

export default PaginationCom;
