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
    getProviderProfileById(userCtx.providerId);
  }, []);

  useEffect(() => {
    setUpdateProviderProfile({
      name: providerProfile.name,
      biography: providerProfile.biography,
      phoneNumber: providerProfile.phoneNumber,
      email: providerProfile.email,
    });
  }, [providerProfile]);

  const handleChange = (event) => {
    setUpdateProviderProfile((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  };

  const callUpdateProviderProfile = async (id) => {
    try {
      let body = {
        access: userCtx.accessToken,
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
        getProviderProfileById(userCtx.providerId);
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
            <div className="form-group mb-2">
              <label className="col-3 align-top">name:</label>
              <input
                className="col-5"
                id="name"
                type="text"
                value={updateProviderProfile.name}
                onChange={handleChange}
              ></input>
            </div>
            <div className="form-group mb-2">
              <label className="col-3 align-top">biography:</label>
              <textarea
                className={`col-5 ${styles.biography}`}
                id="biography"
                type="text"
                value={updateProviderProfile.biography}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group mb-2">
              <label className="col-3 align-top">phone number:</label>
              <input
                className="col-5"
                id="phoneNumber"
                type="text"
                value={updateProviderProfile.phoneNumber}
                onChange={handleChange}
              ></input>
            </div>
            <div className="form-group mb-2">
              <label className="col-3 align-top">email:</label>
              <input
                className="col-5"
                id="email"
                type="text"
                value={updateProviderProfile.email}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className={styles.actions}>
            <button
              className={`${styles.actionButton} ${styles.green}`}
              onClick={() => {
                console.log(userCtx.providerId);
                callUpdateProviderProfile(userCtx.providerId);
              }}
            >
              Save
            </button>
            <button
              className={`${styles.actionButton} ${styles.yellow}`}
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
        /* ======================================== view provider profile ======================================== */
        <div className={`${styles.board} ${styles.modal}`}>
          <header className={styles.header}>
            <h3>Profile</h3>
          </header>
          <div className={styles.content}>
            {providerProfile.profilePic ? (
              <img
                className={`${styles.profilePic}`}
                src={userProfile.profilePic}
              />
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
                <p>{providerProfile.name}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <p>biography:</p>
              </div>
              <div className="col">
                <p>{providerProfile.biography}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <p>phone number:</p>
              </div>
              <div className="col">
                <p>{providerProfile.phoneNumber}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <p>email:</p>
              </div>
              <div className="col">
                <p>{providerProfile.email}</p>
              </div>
            </div>

            <div className={styles.interestedSubscribedHostedContainer}>
              <p>hosted gigs: </p>
              <div className={`${styles.hosted}`}>
                {hostGigsList.length > 0 ? (
                  hostGigsList.map((item) => (
                    <button
                      className={`${styles.gigButton}`}
                      onClick={() => {
                        if (userCtx.role === "user") {
                          props.setShowProviderProfForUser(false);
                          props.setGigSelect(item._id);
                        } else {
                          props.setShowUserProf(false);
                          props.setGigSelect(item._id);
                        }
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
              disabled={props.updateDisabled}
              onClick={() => {
                setIsUpdatePressed(true);
              }}
            >
              Update
            </button>
            <button
              className={`${styles.actionButton} ${styles.orange}`}
              onClick={() => {
                userCtx.role === "user"
                  ? props.setShowProviderProfForUser(false)
                  : props.setShowUserProf(false);
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

const ProviderProfileModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          setShowUserProf={props.setShowUserProf}
          handleLogOut={props.handleLogOut}
          setGigSelect={props.setGigSelect}
          setShowProviderProfForUser={props.setShowProviderProfForUser}
          updateDisabled={props.updateDisabled}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default ProviderProfileModal;
