import React, { useEffect, useContext, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const OverLay = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [providerProfile, setProviderProfile] = useState([]);

  const getProviderProfileById = async (id) => {
    const res = await fetchData(
      "/profile/p/" + id,
      "POST",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      console.log(res.data);
      setProviderProfile(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getProviderProfileById(userCtx.userId);
  }, []);

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
          <p>name: {providerProfile.name}</p>
          <p>biography: {providerProfile.biography}</p>
          <p>phone number: {providerProfile.phoneNumber}</p>
          <p>email: {providerProfile.email}</p>
          {providerProfile.profilePic ? (
            <img
              className={styles.profilePic}
              src={providerProfile.profilePic}
            />
          ) : (
            <img
              className={styles.profilePic}
              src="../../img/avatars/avatar_0000_red.jpg"
            />
          )}
        </div>
        <div className={styles.actions}>
          <button
            onClick={() => {
              props.handleLogOut(true);
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

const ProviderProfileModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          //   id={props.id}
          //   name={props.name}
          //   bio={props.bio}
          //   phoneNumber={props.phoneNumber}
          //   email={props.email}
          setShowUserProf={props.setShowUserProf}
          handleLogOut={props.handleLogOut}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default ProviderProfileModal;
