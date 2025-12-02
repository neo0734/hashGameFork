import React, { useState } from 'react';
import { Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import gameDetailStore from '../GameDetailStore';
import PaginationCom from './PaginationCom';
import { get } from 'lodash';
import useResponsive from '@/utils/useResponsive';

// 获取t函数，来自window对象
const t = (window as any).t || ((key: string) => key);

const ModalDetail: React.FC = observer(() => {
  const { isMobile } = useResponsive();
  // 获取当前选中的游戏项
  const currentGame = gameDetailStore.items.find(
    (item) => item.id === gameDetailStore.selectedItemId
  );

  const allValues = {
    1: {
      introductionTitle: {
        A: t('home.Big-or-Smaill'),
        B: t('home.Hash-Odd-Even'),
        C: t('home.Lucky-Hash'),
        D: t('home.Hash-Number'),
      },
      inroDductionDesc: {
        A: t('gameDetail.LuckyHashIntroduction1'),
        B: t('gameDetail.LuckyHashIntroduction2'),
        C: t('gameDetail.LuckyHashIntroduction3'),
        D: t('gameDetail.LuckyHashIntroduction4'),
      },
    },
    2: {
      A: [
        t('gameDetail.LuckyHashRules11'),
        [
          t('gameDetail.LuckyHashRules12.1'),
          t('gameDetail.LuckyHashRules12.2'),
          t('gameDetail.LuckyHashRules12.3'),
        ],
        t('gameDetail.LuckyHashRules13'),
        t('gameDetail.LuckyHashRules14'),
      ],
      B: [
        t('gameDetail.LuckyHashRules21'),
        [
          t('gameDetail.LuckyHashRules22.1'),
          t('gameDetail.LuckyHashRules22.2'),
          t('gameDetail.LuckyHashRules22.3'),
        ],
        t('gameDetail.LuckyHashRules23'),
        t('gameDetail.LuckyHashRules24'),
      ],
      C: [
        t('gameDetail.LuckyHashRules31'),
        [
          t('gameDetail.LuckyHashRules32.1'),
          t('gameDetail.LuckyHashRules32.2'),
          t('gameDetail.LuckyHashRules32.3'),
        ],
        t('gameDetail.LuckyHashRules43'),
        t('gameDetail.LuckyHashRules44'),
      ],
      D: [
        t('gameDetail.LuckyHashRules41'),
        t('gameDetail.LuckyHashRules42.1'),
        t('gameDetail.LuckyHashRules43'),
        t('gameDetail.LuckyHashRules44'),
      ],
    },
    3: {
      A: [
        t('gameDetail.SteptoPlay11'),
        t('gameDetail.SteptoPlay12'),
        t('gameDetail.SteptoPlay13'),
        t('gameDetail.SteptoPlay14'),
      ],
      B: [
        t('gameDetail.SteptoPlay11'),
        t('gameDetail.SteptoPlay12'),
        t('gameDetail.SteptoPlay13'),
        t('gameDetail.SteptoPlay14'),
      ],
      C: [
        t('gameDetail.SteptoPlay11'),
        t('gameDetail.SteptoPlay12'),
        t('gameDetail.SteptoPlay13'),
        t('gameDetail.SteptoPlay14'),
      ],
      D: [
        t('gameDetail.SteptoPlay11'),
        t('gameDetail.SteptoPlay12'),
        t('gameDetail.SteptoPlay13'),
        t('gameDetail.SteptoPlay14'),
      ],
    },
  };

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);

  // 处理点击Got it!按钮
  const handleGotIt = () => {
    gameDetailStore.setModalDetailVisible(false);
  };

  // 处理分页变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 重置分页到第一页当弹窗重新打开时
  React.useEffect(() => {
    if (gameDetailStore.modalDetailVisible) {
      setCurrentPage(1);
    }
  }, [gameDetailStore.modalDetailVisible]);

  // 第一页内容 - 游戏介绍
  const renderPage1 = () => (
    <div className="mb-6">
      <h3 className="text-white text-[32px] font-semibold mb-3">
        {get(allValues, [
          1,
          'introductionTitle',
          gameDetailStore.selectedItemId,
        ])}
      </h3>
      <h4 className="text-[#BDBCBE] text-[26px] font-semibold mb-3">
        {t('gameDetail.Introduction')}:
      </h4>
      <p className="text-[#7D7C7F] font-bold text-[16px]">
        {get(allValues, [
          currentPage,
          'inroDductionDesc',
          gameDetailStore.selectedItemId,
        ])}
      </p>
    </div>
  );

  // 第二页内容 - 游戏规则
  const renderPage2 = () => (
    <div className="mb-6">
      <h3 className="text-white text-[32px] font-semibold mb-3">
        {get(allValues, [
          1,
          'introductionTitle',
          gameDetailStore.selectedItemId,
        ])}
      </h3>
      <h4 className="text-[#BDBCBE] text-[26px] font-semibold mb-3">
        {t('gameDetail.Rules')}:
      </h4>
      <div className="text-[#7D7C7F] font-bold text-[16px]">
        {get(allValues, [currentPage, gameDetailStore.selectedItemId])?.map(
          (item: string, i: number) => {
            return i === 1 && Array.isArray(item) ? (
              <div key={i}>
                {item.map((ele: string, each: number) => (
                  <div key={each}>
                    {each === 0 ? (
                      <div>
                        <span>{i + 1}.</span>&nbsp;
                        <span>{ele}</span>
                      </div>
                    ) : (
                      <>&nbsp;&nbsp;• {ele}</>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div key={i} className="mb-[16px]">
                <span>{i + 1}.</span>&nbsp;
                <span>
                  {item}
                  {i === 2 && currentGame!.betRate}
                </span>
              </div>
            );
          }
        )}
      </div>
    </div>
  );

  // 第三页内容 - 详细说明
  const renderPage3 = () => (
    <div className="mb-6">
      <h3 className="text-white text-[32px] font-semibold mb-3">
        {get(allValues, [
          1,
          'introductionTitle',
          gameDetailStore.selectedItemId,
        ])}
      </h3>
      <h4 className="text-[#BDBCBE] text-[26px] font-semibold mb-3">
        {t('gameDetail.SteptoPlay')}:
      </h4>
      <div className="text-[#7D7C7F] font-bold text-[16px]">
        {get(allValues, [3, 'A'])?.map((item: string, i: number) => {
          return (
            <div key={i} className="mb-[16px]">
              <span>{i + 1}.</span>&nbsp;
              <span>{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
  // 渲染当前页内容
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return renderPage1();
      case 2:
        return renderPage2();
      case 3:
        return renderPage3();
      default:
        return renderPage1();
    }
  };

  const modalStyles = {
    body: {
      padding: 0,
    },
    content: {
      padding: 0,
    },
  };
  {
  }
  return (
    <Modal
      open={gameDetailStore.modalDetailVisible}
      onOk={handleGotIt}
      onCancel={handleGotIt}
      footer={null}
      width={955}
      centered
      closeIcon={
        <span className="text-white hover:text-gray-300 text-2xl">×</span>
      }
      styles={modalStyles}
    >
      <div className="md:flex">
        {/* 游戏图片 */}

        <div className="hidden md:block w-[346px] h-[507px] margin-auto">
          <img
            src={`/gameDetail/Modal/${gameDetailStore.selectedItemId}.png`}
            className="w-full h-full object-cover rounded-[12px] rounded-br-[0] rounded-tr-[0]"
          />
        </div>
        <div className="md:hidden flex justify-center pt-2">
          <div className="md:hidden w-[346px] h-[507px]">
            <img
              src={`/gameDetail/Modal/${gameDetailStore.selectedItemId}.png`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="relative flex-1 p-[24px]">
          {/* 页面内容 */}
          <div className="pb-[24px]">{renderCurrentPage()}</div>

          {/* 分页组件 */}
          <div className="flex justify-between w-full absolute bottom-[12px] left-0 px-10">
            <PaginationCom
              current={currentPage}
              onChange={handlePageChange}
              total={3}
            />
            <button
              onClick={handleGotIt}
              className="rounded-md px-4 py-2 font-medium bg-[#F422FF] text-white hover:bg-[#E01DD0] transition-colors"
            >
              {t('gameDetail.GotIt!')}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default ModalDetail;
