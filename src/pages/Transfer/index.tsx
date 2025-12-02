import Transfer from '@/components/Transfer';
import { getQueryParam } from '@/utils/utils';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TransferContainer: React.FC = () => {
  const navigate = useNavigate();
  const [back, setBack] = useState<any>(null);
  useEffect(() => {
    const back = getQueryParam('back');
    if (back) {
      setBack(decodeURIComponent(back));
    }
  }, []);
  return (
    <div className="w-full h-full px-[16px]">
      <img
        src="/home/back.png"
        className="w-[24px] h-[24px] mt-[20px]"
        onClick={() => navigate(back || '/')}
      />
      <div className="text-white text-[18px] my-[16px]">
        {t('home.Transfer')}
      </div>
      <Transfer />
    </div>
  );
};

export default TransferContainer;
