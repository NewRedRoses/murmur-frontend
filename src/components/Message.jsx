import styles from "../styles/chat.module.css";

export default function Message({ id, content, type }) {
  return (
    <>
      {type == "received" ? (
        <div className={styles["msg-incoming"]} key={id}>
          <div className={styles.msg}>{content}</div>
        </div>
      ) : (
        <div className={styles["msg-sending"]} key={id}>
          <div className={styles.msg}>{content}</div>
        </div>
      )}
    </>
  );
}
