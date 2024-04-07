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
  // const [isDeletePressed, setIsDeletePressed] = useState(false);

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

  // useEffect(() => {
  //   if (isDeletePressed) {
  //     // setIsDeletePressed(true);
  //   }
  // }, [isDeletePressed]);

  const handleChange = (event) => {
    setUpdateUserProfile((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  };

  const callUpdateUserProfile = async (id) => {
    try {
      let body = {
        refresh: userCtx.refreshToken,
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
            <label>name:</label>
            <input
              id="name"
              type="text"
              value={updateUserProfile.name}
              onChange={handleChange}
            ></input>
            <label>biography:</label>
            <input
              id="biography"
              type="text"
              value={updateUserProfile.biography}
              onChange={handleChange}
            ></input>
            <label>phoneNumber:</label>
            <input
              id="phoneNumber"
              type="text"
              value={updateUserProfile.phoneNumber}
              onChange={handleChange}
            ></input>
            <label>email:</label>
            <input
              id="email"
              type="text"
              value={updateUserProfile.email}
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
            <button onClick={() => callUpdateUserProfile(userCtx.userId)}>
              Save
            </button>
            <button
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
        /* ======================================== view user profile ======================================== */
        <div className={`${styles.board} ${styles.modal}`}>
          <header className={styles.header}>
            <h3>My Profile</h3>
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
            <p>name: {userProfile.name}</p>
            <p>biography: {userProfile.biography}</p>
            <p>phone number: {userProfile.phoneNumber}</p>
            <p>email: {userProfile.email}</p>
            <p>interested: </p>
            {userInterestGigsList.length > 0 ? (
              userInterestGigsList.map((item) => (
                <button
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
            <p>subscribed: </p>
            {userSubscribeGigsList.length > 0 ? (
              userSubscribeGigsList.map((item) => (
                <button
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

const UserProfileModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          // id={props.id}
          // name={props.name}
          // bio={props.bio}
          // phoneNumber={props.phoneNumber}
          // email={props.email}
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
