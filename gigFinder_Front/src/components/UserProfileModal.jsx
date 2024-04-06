import React, { useEffect, useContext, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const OverLay = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [userProfile, setUserProfile] = useState([]);
  const [userInterestGigsList, setUserInterestGigsList] = useState([]);
  const [userInterestGigTitle, setUserInterestGigTitle] = useState([]);

  const getGigById = async (id) => {
    const res = await fetchData(
      "/api/gigs/" + id,
      "POST",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      console.log(res.data.title);
      return res.data.title;
      // setUserInterestGigTitle((prevState) => [...prevState, res.data.title]);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

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
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getUserProfileById(userCtx.userId);
    // userInterestGigsList.forEach((item) => {
    //   getGigById(item);
    // });
    // setUserInterestGigTitle(titleArray);
    const fetchTitles = async () => {
      const fetchedTitles = await Promise.all(
        userInterestGigsList.map(async (id) => {
          const title = await getGigById(id);
          return title;
        })
      );
      setUserInterestGigTitle(fetchedTitles.filter(Boolean)); // Filter out null values
    };
    fetchTitles();
  }, []);

  // useEffect(() => {
  //   userInterestGigsList.forEach((item) => {
  //     getGigById(item);
  //   });
  //   setUserInterestGigTitle(titleArray);
  // }, [userInterestGigsList]);

  // useEffect(() => {
  //   const fetchDataAndGigs = async () => {
  //     await getUserProfileById(userCtx.userId);
  //     userInterestGigsList.forEach((item) => {
  //       getGigById(item);
  //     });
  //   };

  //   fetchDataAndGigs();
  // }, []);

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
          <p>name: {userProfile.name}</p>
          <p>biography: {userProfile.biography}</p>
          <p>phone number: {userProfile.phoneNumber}</p>
          <p>email: {userProfile.email}</p>
          <p>interested: </p>
          {userInterestGigTitle}
          {/* {userInterestGigTitle.map((item) => (
            <p>{item}</p>
          ))} */}
          {userProfile.profilePic ? (
            <img className={styles.profilePic} src={userProfile.profilePic} />
          ) : (
            <img
              className={styles.profilePic}
              src="../../img/avatars/avatar_0002_blue.jpg"
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
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UserProfileModal;
