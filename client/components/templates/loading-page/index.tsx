import styles from './loading-page.module.css';

const LoadingPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles['lds-ellipsis']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingPage;
