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

  const handleUserLogin = async () => {
    const res = await fetchData("/auth/u/login", "POST", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      const decoded = jwtDecode(res.data.access);
      userCtx.setRole(decoded.role); //we can hard code the role in
      props.setShowLogin(false);
    } else {
      alert(JSON.stringify(res.data));
    }
  };
  const handleProviderLogin = async () => {
    const res = await fetchData("/auth/p/login", "POST", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      const decoded = jwtDecode(res.data.access);
      userCtx.setRole(decoded.role); //we can hard code the role in
      props.setShowLogin(false);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const handleRegistration = async () => {
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
      } else {
        console.log(res.data);
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
      } else {
        console.log(res.data);
      }
    }
  };
  return (
    <div className="col-6 login">
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
        {showRegistration && (
          <>
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
                ref={nameRef}
                type="text"
                className={`${styles.logininput}`}
                placeholder="phone number"
              ></input>
            </div>
            <div style={{ padding: "5px", width: "75%" }}>
              <input
                ref={nameRef}
                type="text"
                className={`${styles.logininput}`}
                placeholder="bio"
              ></input>
            </div>
            <UploadWidget></UploadWidget>
            <div style={{ padding: "5px" }}>
              <button
                onClick={handleRegistration()}
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
        <div style={{ padding: "0px" }}>
          {!showRegistration && (
            <>
              {role === "user" ? (
                <button
                  onClick={() => {
                    handleUserLogin();
                  }}
                  className={`${styles.loginbutton}`}
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleProviderLogin();
                  }}
                  className={`${styles.loginbutton}`}
                >
                  Login
                </button>
              )}
              <button
                onClick={() => {
                  setShowRegistration(true);
                }}
                className={`${styles.loginbutton} ${styles.reg}`}
              >
                Register
              </button>
            </>
          )}
        </div>
        <button
          onClick={() => {
            props.setShowLogin(false);
          }}
        >
          debug
        </button>
      </div>
    </div>
  );
};

export default Login;
