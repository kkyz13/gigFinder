import React, { useEffect, useState } from "react";
import UserProfileModal from "./UserProfileModal";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import GigDetails from "./GigDetails";
import Login from "./Login";
import GigListingEntry from "./GigListingEntry";
import ProviderProfileModal from "./ProviderProfileModal";
import GigCanvas from "./GigCanvas";

const Display = () => {
  const [showUserProf, setShowUserProf] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [providerId, setProviderId] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [gigSelect, setGigSelect] = useState("");
  const [gigsArr, setGigsArr] = useState([]);
  const fetchData = useFetch();

  console.log(userId);
  const allGigsGet = async () => {
    const res = await fetchData("/api/gigs", undefined, undefined, undefined);
    if (res.ok) {
      setGigsArr(res.data);
    } else {
      console.log(res);
    }
  };

  const getProviderGigs = async () => {
    const res = await fetchData(
      "/profile/p/" + providerId,
      "POST",
      undefined,
      accessToken
    );
    if (res.ok) {
      console.log(res.data);
      setGigsArr(res.data.hostGigsList);
    }
  };

  //initial gig list display
  useEffect(() => {
    allGigsGet();
  }, []);

  //redo gig list upon login
  useEffect(() => {
    if (role === "provider") {
      getProviderGigs();
    } else {
      allGigsGet();
    }
  }, [showLogin]);
  const handleLogOut = () => {
    setAccessToken("");
    setRole("");
    setUserId("");
    setUserEmail("");
    setShowUserProf(false);
    setGigSelect("");
    setShowLogin(true);
  };

  return (
    <>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          refreshToken,
          setRefreshToken,
          role,
          setRole,
          userId,
          setUserId,
          providerId,
          setProviderId,
          userEmail,
          setUserEmail,
        }}
      >
        {/* {showUserProf && (
          <UserProfileModal
            // id={props.id}
            // name={props.name}
            // bio={props.bio}
            // phoneNumber={props.phoneNumber}
            // email={props.email}
            handleLogOut={handleLogOut}
            setShowUserProf={setShowUserProf}
          ></UserProfileModal>
        )} */}

        {showUserProf && role === "user" && (
          <UserProfileModal
            // id={props.id}
            // name={props.name}
            // bio={props.bio}
            // phoneNumber={props.phoneNumber}
            // email={props.email}
            handleLogOut={handleLogOut}
            setShowUserProf={setShowUserProf}
            setGigSelect={setGigSelect}
          ></UserProfileModal>
        )}

        {showUserProf && role === "provider" && (
          <ProviderProfileModal
            // id={props.id}
            // name={props.name}
            // bio={props.bio}
            // phoneNumber={props.phoneNumber}
            // email={props.email}
            handleLogOut={handleLogOut}
            setShowUserProf={setShowUserProf}
            setGigSelect={setGigSelect}
          ></ProviderProfileModal>
        )}

        <div
          className={`topbar d-flex justify-content-between align-items-center g-0 m-0 ${
            role === "provider" ? "providerbg" : ""
          }`}
        >
          <span className="display-6">gigFinder</span>
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
          <div className="col-6 g-0 giglist">
            {gigsArr.length !== 0 ? (
              gigsArr.map((entry, id) => {
                return (
                  <GigListingEntry
                    key={entry.id}
                    id={entry._id}
                    title={entry.title}
                    // author={entry.author.name}
                    pic={entry.pic}
                    address={entry.address}
                    description={entry.description}
                    dateTime={entry.dateTimeStart}
                    interestList={entry.interestUserList}
                    subscribeList={entry.subscribeUserList}
                    setGigSelect={setGigSelect}
                  ></GigListingEntry>
                );
              })
            ) : (
              <div className="container">Sort Provider Gigs here</div>
            )}
          </div>
          {showLogin && <Login setShowLogin={setShowLogin}></Login>}
          {!showLogin && role === "user" && (
            <GigDetails
              entryId={gigSelect}
              allGigsGet={allGigsGet}
              handleLogOut={handleLogOut}
              setGigSelect={setGigSelect}
              setShowUserProf={setShowUserProf}
            ></GigDetails>
          )}
          {!showLogin && role === "provider" && (
            <GigCanvas
              entryId={gigSelect}
              getProviderGigs={getProviderGigs}
              setGigArr={setGigsArr}
            ></GigCanvas>
          )}
        </div>
      </UserContext.Provider>
    </>
  );
};

export default Display;
