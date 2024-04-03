import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
const OverLay = (props) => {
  return (
    <div
      className={styles.backdrop}
      onClick={() => {
        props.setShowUserProf(false);
      }}
    >
      <div className={`${styles.board} ${styles.modal}`}>
        <header className={styles.header}>
          <h3>Edit Profile</h3>
        </header>
        <div className={styles.content}>
          <p>User Stuff here</p>
        </div>
        <div className={styles.actions}></div>
      </div>
    </div>
  );
};
const UserProfileModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          id={props.id}
          name={props.name}
          bio={props.bio}
          phoneNumber={props.phoneNumber}
          email={props.email}
          setShowUserProf={props.setShowUserProf}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UserProfileModal;
