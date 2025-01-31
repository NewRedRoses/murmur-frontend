import styles from "../styles/modal.module.css";
export default function Modal({ isOpen, handleFunc, state, setState }) {
  return (
    <>
      {isOpen == true ? (
        <div className={styles["modal-content"]}>
          <span>
            Enter the username of the user you would like to chat with.
          </span>
          <div className="username-form">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <button onClick={handleFunc}>Search</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
