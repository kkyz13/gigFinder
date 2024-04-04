import React, { useEffect, useState } from "react";
import UserProfileModal from "./UserProfileModal";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import GigDetails from "./GigDetails";
import Login from "./Login";
import GigListingEntry from "./GigListingEntry";

const Display = () => {
  const [showUserProf, setShowUserProf] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [gigSelect, setGigSelect] = useState("");
  const [gigsArr, setGigsArr] = useState([]);
  const fetchData = useFetch();
  const allGigsGet = async () => {
    const res = await fetchData("/api/gigs", undefined, undefined, undefined);
    if (res.ok) {
      setGigsArr(res.data);
    } else {
      console.log(res);
    }
  };
  console.log(gigSelect);
  useEffect(() => {
    allGigsGet();
  }, []);
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
        <div
          className={`topbar d-flex justify-content-between align-items-center g-0 m-0 ${
            role === "provider" ? "providerbg" : ""
          }`}
        >
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
        <div className="row z-n1">
          <div className="col-6 g-0 eventlist">
            {gigsArr.length !== 0 &&
              gigsArr.map((entry, id) => {
                return (
                  <GigListingEntry
                    id={entry._id}
                    title={entry.title}
                    author={entry.author.name}
                    pic={entry.pic}
                    address={entry.address}
                    description={entry.description}
                    dateTime={entry.dateTimeStart}
                    setGigSelect={setGigSelect}
                  ></GigListingEntry>
                );
              })}
          </div>
          {showLogin && <Login setShowLogin={setShowLogin}></Login>}
          {!showLogin && <GigDetails entryId={gigSelect}></GigDetails>}
        </div>
      </UserContext.Provider>
    </>
  );
};

export default Display;
