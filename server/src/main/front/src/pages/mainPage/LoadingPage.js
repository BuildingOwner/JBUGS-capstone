import styles from "./LoadingPage.module.css"

const LoadingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <div className="spinner-border" role="status">
        </div>
        <h4>페이지 로딩중...</h4>
      </div>
    </div>
  )
}

export default LoadingPage