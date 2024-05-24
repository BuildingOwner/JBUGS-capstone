import styles from "./Info.module.css"
const Info = ({ title, content, className }) => {
  return (
    <div className={`${styles.infoContainer} ${className ? className : null}`}>
      <h3 className={styles.name}>{title}</h3>
      <div className={styles.content}>{content}</div>
    </div>
  )
}

export default Info