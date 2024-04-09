import React, { useEffect, useContext, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const OverLay = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [userProfile, setUserProfile] = useState({});
  const [userInterestGigsList, setUserInterestGigsList] = useState([]);
  const [userSubscribeGigsList, setUserSubscribeGigsList] = useState([]);
  const [isUpdatePressed, setIsUpdatePressed] = useState(false);
  const [updateUserProfile, setUpdateUserProfile] = useState({
    name: userProfile.name,
    biography: userProfile.biography,
    phoneNumber: userProfile.phoneNumber,
    email: userProfile.email,
  });

  const getUserProfileById = async (id) => {
    const res = await fetchData(
      "/profile/u/" + id,
      "POST",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      console.log(res.data);
      setUserProfile(res.data);
      setUserInterestGigsList(res.data.interestGigsList);
      setUserSubscribeGigsList(res.data.subscribeGigsList);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getUserProfileById(userCtx.userId);
  }, []);

  useEffect(() => {
    setUpdateUserProfile({
      name: userProfile.name,
      biography: userProfile.biography,
      phoneNumber: userProfile.phoneNumber,
      email: userProfile.email,
    });
  }, [userProfile]);

  const handleChange = (event) => {
    setUpdateUserProfile((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  };

  const callUpdateUserProfile = async (id) => {
    try {
      let body = {
        access: userCtx.accessToken,
        name: updateUserProfile.name.trim(),
        email: updateUserProfile.email.trim(),
      };

      if (updateUserProfile.biography)
        body.biography = updateUserProfile.biography.trim();
      if (updateUserProfile.phoneNumber)
        body.phoneNumber = updateUserProfile.phoneNumber.trim();

      const res = await fetchData(
        "/auth/u/" + id,
        "PATCH",
        body,
        userCtx.accessToken
      );

      if (res.ok) {
        console.log(res.data);
        getUserProfileById(userCtx.userId);
        setIsUpdatePressed(false);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };

  return (
    <div className={styles.backdrop}>
      {isUpdatePressed ? (
        /* ======================================== update user profile ======================================== */
        <div className={`${styles.board} ${styles.modal}`}>
          <header className={styles.header}>
            <h3>Edit Profile</h3>
          </header>
          <div className={styles.content}>
            {userProfile.profilePic ? (
              <img className={styles.profilePic} src={userProfile.profilePic} />
            ) : (
              <img
                className={styles.profilePic}
                src="../../img/avatars/avatar_0002_blue.jpg"
              />
            )}
            <div className="form-group mb-2">
              <label className="col-3 align-top">name:</label>
              <input
                className="col-5"
                id="name"
                type="text"
                value={updateUserProfile.name}
                onChange={handleChange}
              ></input>
            </div>
            <div className="form-group mb-2">
              <label className="col-3 align-top">biography:</label>
              <textarea
                className={`col-5 ${styles.biography}`}
                id="biography"
                type="text"
                value={updateUserProfile.biography}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group mb-2">
              <label className="col-3 align-top">phone number:</label>
              <input
                className="col-5"
                id="phoneNumber"
                type="text"
                value={updateUserProfile.phoneNumber}
                onChange={handleChange}
              ></input>
            </div>
            <div className="form-group mb-2">
              <label className="col-3 align-top">email:</label>
              <input
                className="col-5"
                id="email"
                type="text"
                value={updateUserProfile.email}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className={styles.actions}>
            <button
              className={`${styles.actionButton} ${styles.green}`}
              onClick={() => callUpdateUserProfile(userCtx.userId)}
            >
              Save
            </button>
            <button
              className={`${styles.actionButton} ${styles.yellow}`}
              onClick={() => {
                setIsUpdatePressed(false);
                setUpdateUserProfile({
                  name: userProfile.name,
                  biography: userProfile.biography,
                  phoneNumber: userProfile.phoneNumber,
                  email: userProfile.email,
                });
              }}
            >
              Cancel Update
            </button>
            <button
              className={`${styles.actionButton} ${styles.orange}`}
              onClick={() => {
                props.setShowUserProf(false);
              }}
            >
              Close Window
            </button>
            <button
              className={`${styles.actionButton} ${styles.red}`}
              onClick={() => {
                props.handleLogOut(true);
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      ) : (
        /* ======================================== view user profile ======================================== */
        <div className={`${styles.board} ${styles.modal}`}>
          <header className={styles.header}>
            <h3>Profile</h3>
          </header>
          <div className={styles.content}>
            {userProfile.profilePic ? (
              <img className={styles.profilePic} src={userProfile.profilePic} />
            ) : (
              <img
                className={styles.profilePic}
                src="../../img/avatars/avatar_0002_blue.jpg"
              />
            )}
            <div className="row">
              <div className="col-4">
                <p>name:</p>
              </div>
              <div className="col">
                <p>{userProfile.name}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <p>biography:</p>
              </div>
              <div className="col">
                <p>{userProfile.biography}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <p>phone number:</p>
              </div>
              <div className="col">
                <p>{userProfile.phoneNumber}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <p>email:</p>
              </div>
              <div className="col">
                <p>{userProfile.email}</p>
              </div>
            </div>
            <div className={styles.interestedSubscribedHostedContainer}>
              <p>interested gigs: </p>
              <div className={`${styles.interested}`}>
                {userInterestGigsList.length > 0 ? (
                  userInterestGigsList.map((item) => (
                    <button
                      className={`${styles.gigButton}`}
                      onClick={() => {
                        props.setShowUserProf(false);
                        props.setGigSelect(item._id);
                      }}
                    >
                      {item.title}
                    </button>
                  ))
                ) : (
                  <p>none</p>
                )}
              </div>

              <p>subscribed gigs: </p>
              <div className={`${styles.subscribed}`}>
                {userSubscribeGigsList.length > 0 ? (
                  userSubscribeGigsList.map((item) => (
                    <button
                      className={`${styles.gigButton}`}
                      onClick={() => {
                        props.setShowUserProf(false);
                        props.setGigSelect(item._id);
                      }}
                    >
                      {item.title}
                    </button>
                  ))
                ) : (
                  <p>none</p>
                )}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              className={`${styles.actionButton} ${styles.green}`}
              onClick={() => {
                setIsUpdatePressed(true);
              }}
            >
              Update
            </button>
            <button
              className={`${styles.actionButton} ${styles.orange}`}
              onClick={() => {
                props.setShowUserProf(false);
              }}
            >
              Close Window
            </button>
            <button
              className={`${styles.actionButton} ${styles.red}`}
              onClick={() => {
                props.handleLogOut(true);
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const UserProfileModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          setShowUserProf={props.setShowUserProf}
          handleLogOut={props.handleLogOut}
          setGigSelect={props.setGigSelect}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UserProfileModal;
