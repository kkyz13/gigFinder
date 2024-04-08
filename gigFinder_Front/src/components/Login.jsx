import React, { useRef, useContext, useState } from "react";
import styles from "./Login.module.css";
import useFetch from "../hooks/useFetch";
import UploadWidget from "./UploadWidget";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";

const Login = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [showRegistration, setShowRegistration] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const bioRef = useRef();
  const phoneRef = useRef();
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const handleUserLogin = async () => {
    const res = await fetchData("/auth/u/login", "POST", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      userCtx.setRefreshToken(res.data.refresh);
      const decoded = jwtDecode(res.data.access);
      console.log(decoded);
      userCtx.setRole(decoded.role);
      userCtx.setUserId(decoded.id);
      userCtx.setUserEmail(decoded.email);
      props.setShowLogin(false);
    } else {
      alert(JSON.stringify(res.data));
      setMessage("login error");
    }
  };
  const handleProviderLogin = async () => {
    const res = await fetchData("/auth/p/login", "POST", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      userCtx.setRefreshToken(res.data.refresh);
      const decoded = jwtDecode(res.data.access);
      console.log(decoded);
      userCtx.setRole(decoded.role);
      userCtx.setProviderId(decoded.id);
      userCtx.setUserEmail(decoded.email);
      props.setShowLogin(false);
    } else {
      alert(JSON.stringify(res.data));
      setMessage("login error");
    }
  };

  const handleRegistration = async () => {
    //in built role detect from the dropdown box
    if (role === "user") {
      const res = await fetchData("/auth/u/register", "PUT", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        name: nameRef.current.value,
        biography: bioRef.current.value,
        phoneNumber: phoneRef.current.value,
      });
      if (res.ok) {
        emailRef.current.value = "";
        passwordRef.current.value = "";
        nameRef.current.value = "";
        bioRef.current.value = "";
        phoneRef.current.value = "";
        setShowRegistration(false);
        setMessage("Registration Successful");
      } else {
        console.log(res.data);
        setMessage("invalid username and/or password");
      }
    } else if (role === "provider") {
      const res = await fetchData("/auth/p/register", "PUT", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        name: nameRef.current.value,
        biography: bioRef.current.value,
        phoneNumber: phoneRef.current.value,
      });
      if (res.ok) {
        emailRef.current.value = "";
        passwordRef.current.value = "";
        nameRef.current.value = "";
        bioRef.current.value = "";
        phoneRef.current.value = "";
        setShowRegistration(false);
        setMessage("Registration Successful");
      } else {
        console.log(res.data);
        setMessage(res.data);
      }
    }
  };
  return (
    <div
      className={`col-6 login pt-5 ${
        role === "provider" ? "providerlogbg" : ""
      }`}
    >
      <div className="d-flex flex-column justify-content-center centered">
        <div className="display-6">gigFinder</div>
        <div style={{ padding: "20px" }}>
          <input
            ref={emailRef}
            type="text"
            className={`${styles.logininput}`}
            placeholder="email"
          ></input>
        </div>
        <div>
          <input
            ref={passwordRef}
            type="password"
            className={`${styles.logininput}`}
            placeholder="password"
          ></input>
        </div>

        {showRegistration && (
          <>
            <div style={{ padding: "20px" }}>
              <select
                className={`${styles.logininput}`}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value="user">User</option>
                <option value="provider">Provider</option>
              </select>
            </div>
            <div style={{ padding: "5px 20px 5px", width: "55%" }}>
              <input
                ref={nameRef}
                type="text"
                className={`${styles.logininput}`}
                placeholder="name"
              ></input>
            </div>
            <div style={{ padding: "5px", width: "50%" }}>
              <input
                ref={phoneRef}
                type="text"
                className={`${styles.logininput}`}
                placeholder="phone number"
              ></input>
            </div>
            <div style={{ padding: "5px", width: "75%" }}>
              <textarea
                ref={bioRef}
                type="text"
                className={`${styles.logininput}`}
                placeholder="bio"
              ></textarea>
            </div>
            {/* <UploadWidget></UploadWidget> */}
            <div style={{ padding: "5px" }}>
              <button
                onClick={() => handleRegistration()}
                className={`${styles.loginbutton} ${styles.reg}`}
              >
                Register
              </button>
              <button
                onClick={() => {
                  setShowRegistration(false);
                }}
                className={`${styles.loginbutton}`}
              >
                Cancel
              </button>
            </div>
          </>
        )}
        <div style={{ padding: "0px" }} className="justify-content-around">
          {!showRegistration && (
            <>
              <div>
                <button
                  onClick={() => {
                    handleUserLogin();
                  }}
                  className={`${styles.loginbutton}`}
                >
                  Login as User
                </button>

                <button
                  onClick={() => {
                    handleProviderLogin();
                  }}
                  className={`${styles.loginbutton} ${styles.prov}`}
                >
                  Login as Provider
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    setShowRegistration(true);
                  }}
                  className={`${styles.loginbutton} ${styles.reg}`}
                >
                  Register
                </button>
              </div>
            </>
          )}
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Login;
