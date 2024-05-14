import styles from "./Info.module.css"
const Info = ({ title, content }) => {
  return (
    <div className={styles.infoContainer}>
      <h3 className={styles.name}>{title}</h3>
      <h4 className={styles.content}>{content}</h4>
    </div>
  )
}

export default Info