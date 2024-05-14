import styles from "./NoItem.module.css"

const NoItem = ({title}) => {
  return(
    <div className={styles.container}>
      <h4 className={styles.title}>{title} 없습니다.</h4>
    </div>
  )
}

export default NoItem