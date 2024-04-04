import React, { useState } from "react";
import UserProfileModal from "./UserProfileModal";
import UserContext from "../context/user";
import GigDisplay from "./GigDisplay";
import Login from "./Login";
import GigListingEntry from "./GigListingEntry";

const Display = () => {
  const [showUserProf, setShowUserProf] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  const handleLogOut = () => {
    setAccessToken("");
    setRole("");
    setUserId("");
    setUserEmail("");
    setShowLogin(true);
  };
  return (
    <>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          role,
          setRole,
          userId,
          setUserId,
          userEmail,
          setUserEmail,
        }}
      >
        {showUserProf && (
          <UserProfileModal
            // id={props.id}
            // name={props.name}
            // bio={props.bio}
            // phoneNumber={props.phoneNumber}
            // email={props.email}
            handleLogOut={handleLogOut}
            setShowUserProf={setShowUserProf}
          ></UserProfileModal>
        )}
        <div className="topbar d-flex justify-content-between align-items-center g-0 m-0">
          <p className="display-6">gigFinder</p>
          {accessToken && (
            <div>
              {userEmail}:
              <img
                src="../img/avatars/avatar_0002_blue.jpg"
                className="profileimg"
                onClick={() => setShowUserProf(true)}
              />
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-6 g-0 eventlist">
            <div>
              {/* MAP GETALLGIGS HERE */}
              <GigListingEntry></GigListingEntry>
              <GigListingEntry></GigListingEntry>
              <GigListingEntry></GigListingEntry>
            </div>
          </div>
          {showLogin && <Login setShowLogin={setShowLogin}></Login>}
          {!showLogin && <GigDisplay></GigDisplay>}
        </div>
      </UserContext.Provider>
    </>
  );
};

export default Display;
