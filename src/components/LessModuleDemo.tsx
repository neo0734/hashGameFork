import React from 'react';
import styles from './LessModuleDemo.module.less';

const LessModuleDemo: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Less Module 示例</h2>
      <p className={styles.description}>这是一个使用Less Module样式的组件。</p>
      <div className={styles.card}>
        <span className={styles.badge}>示例</span>
      </div>
    </div>
  );
};

export default LessModuleDemo;