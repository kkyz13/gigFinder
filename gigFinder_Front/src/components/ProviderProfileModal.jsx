import React, { useEffect, useContext, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const OverLay = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [providerProfile, setProviderProfile] = useState([]);
  const [hostGigsList, setHostGigsList] = useState([]);

  const [isUpdatePressed, setIsUpdatePressed] = useState(false);
  const [updateProviderProfile, setUpdateProviderProfile] = useState({
    name: providerProfile.name,
    biography: providerProfile.biography,
    phoneNumber: providerProfile.phoneNumber,
    email: providerProfile.email,
  });
  // const [isDeletePressed, setIsDeletePressed] = useState(false);

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
      setHostGigsList(res.data.hostGigsList);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getProviderProfileById(userCtx.userId);
  }, []);

  useEffect(() => {
    setUpdateProviderProfile({
      name: providerProfile.name,
      biography: providerProfile.biography,
      phoneNumber: providerProfile.phoneNumber,
      email: providerProfile.email,
    });
  }, [providerProfile]);

  // useEffect(() => {
  //   if (isDeletePressed) {
  //     // setIsDeletePressed(true);
  //   }
  // }, [isDeletePressed]);

  const handleChange = (event) => {
    setUpdateProviderProfile((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  };

  const callUpdateProviderProfile = async (id) => {
    try {
      let body = {
        refresh: userCtx.refreshToken,
        name: updateProviderProfile.name.trim(),
        email: updateProviderProfile.email.trim(),
      };

      if (updateProviderProfile.biography)
        body.biography = updateProviderProfile.biography.trim();
      if (updateProviderProfile.phoneNumber)
        body.phoneNumber = updateProviderProfile.phoneNumber.trim();

      const res = await fetchData(
        "/auth/p/" + id,
        "PATCH",
        body,
        userCtx.accessToken
      );

      if (res.ok) {
        console.log(res.data);
        getProviderProfileById(userCtx.userId);
        setIsUpdatePressed(false);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };

  // const deleteUserProfile = async (id) => {
  //   try {
  //     const res = await fetchData(
  //       "/auth/u/delete/" + id,
  //       "DELETE",
  //       {
  //         refresh: userCtx.refreshToken,
  //       },
  //       userCtx.accessToken
  //     );

  //     if (res.ok) {
  //       props.handleLogOut(true);
  //     }
  //   } catch (error) {}
  // };

  return (
    <div className={styles.backdrop}>
      {isUpdatePressed ? (
        /* ======================================== update provider profile ======================================== */
        <div className={`${styles.board} ${styles.modal}`}>
          <header className={styles.header}>
            <h3>Edit Profile</h3>
          </header>
          <div className={styles.content}>
            {providerProfile.profilePic ? (
              <img className={styles.profilePic} src={userProfile.profilePic} />
            ) : (
              <img
                className={styles.profilePic}
                src="../../img/avatars/avatar_0002_blue.jpg"
              />
            )}
            <label>name:</label>
            <input
              id="name"
              type="text"
              value={updateProviderProfile.name}
              onChange={handleChange}
            ></input>
            <label>biography:</label>
            <input
              id="biography"
              type="text"
              value={updateProviderProfile.biography}
              onChange={handleChange}
            ></input>
            <label>phoneNumber:</label>
            <input
              id="phoneNumber"
              type="text"
              value={updateProviderProfile.phoneNumber}
              onChange={handleChange}
            ></input>
            <label>email:</label>
            <input
              id="email"
              type="text"
              value={updateProviderProfile.email}
              onChange={handleChange}
            ></input>
            {/* <p>interested: </p>
            {userInterestGigsList.length > 0 ? (
              userInterestGigsList.map((item) => <p>{item.title}</p>)
            ) : (
              <p>none</p>
            )}
            <p>subscribed: </p>
            {userSubscribeGigsList.length > 0 ? (
              userSubscribeGigsList.map((item) => <p>{item.title}</p>)
            ) : (
              <p>none</p>
            )} */}
          </div>
          <div className={styles.actions}>
            <button
              onClick={() => {
                console.log(userCtx.userId);
                callUpdateProviderProfile(userCtx.userId);
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsUpdatePressed(false);
                setUpdateProviderProfile({
                  name: providerProfile.name,
                  biography: providerProfile.biography,
                  phoneNumber: providerProfile.phoneNumber,
                  email: providerProfile.email,
                });
              }}
            >
              Cancel Update
            </button>
            <button
              onClick={() => {
                props.setShowUserProf(false);
              }}
            >
              Close Window
            </button>
            <button
              onClick={() => {
                props.handleLogOut(true);
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      ) : (
        /* ======================================== view provider profile ======================================== */
        <div className={`${styles.board} ${styles.modal}`}>
          <header className={styles.header}>
            <h3>My Profile</h3>
          </header>
          <div className={styles.content}>
            {providerProfile.profilePic ? (
              <img className={styles.profilePic} src={userProfile.profilePic} />
            ) : (
              <img
                className={styles.profilePic}
                src="../../img/avatars/avatar_0002_blue.jpg"
              />
            )}
            <p>name: {providerProfile.name}</p>
            <p>biography: {providerProfile.biography}</p>
            <p>phone number: {providerProfile.phoneNumber}</p>
            <p>email: {providerProfile.email}</p>
            <p>hosted gigs: </p>
            {hostGigsList.length > 0 ? (
              hostGigsList.map((item) => <p>{item.title}</p>)
            ) : (
              <p>none</p>
            )}
          </div>
          <div className={styles.actions}>
            <button
              onClick={() => {
                setIsUpdatePressed(true);
              }}
            >
              Update
            </button>
            {/* <button onClick={() => setIsDeletePressed(true)}>
              Delete Profile
            </button> */}
            <button
              onClick={() => {
                props.setShowUserProf(false);
              }}
            >
              Close Window
            </button>
            <button
              onClick={() => {
                props.handleLogOut(true);
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* {isDeletePressed && (
        <div className={`${styles.board} ${styles.modal}`}>
          <header className={styles.header}>
            <h3>Delete Profile</h3>
          </header>
          <div className={styles.content}>
            <p>We hate to see you go</p>
          </div>
          <div className={styles.actions}>
            <button onClick={() => deleteUserProfile(userCtx.userId)}>
              Confirm Delete
            </button>
            <button
              onClick={() => {
                props.setShowUserProf(false);
              }}
            >
              Close Window
            </button>
            <button
              onClick={() => {
                props.handleLogOut(true);
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      )} */}
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
