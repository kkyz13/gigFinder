import React, { useEffect, useRef, useState } from "react";
import styles from "./Login.module.css";
const UploadWidget = () => {
  const [imgurl, setImgurl] = useState("");
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dotft2n3n",
        uploadPreset: "wu6af385",
        cropping: true,
        croppingAspectRatio: true,
        showCompletedButton: true,
      },
      function (error, result) {
        console.log(result);
        if (result.event === "success") {
          setImgurl(result.info.url);
        }
        console.log(imgurl);
      }
    );
  }, []);
  return (
    <>
      <button
        disabled
        className={`${styles.loginbutton}`}
        onClick={() => {
          widgetRef.current.open();
        }}
      >
        Upload
      </button>
      <br></br>
      <img src={imgurl}></img>
    </>
  );
};

export default UploadWidget;
