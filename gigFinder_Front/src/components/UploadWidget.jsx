import React, { useEffect, useRef, useState } from "react";
import styles from "./Login.module.css";
const UploadWidget = (props) => {
  const [imgurl, setImgurl] = useState("");
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dotft2n3n",
        uploadPreset: "wu6af385",
      },
      function (error, result) {
        console.log(result);
        if (result.event === "success") {
          props.setImgUrl(result.info.url);
          console.log("img upload successful");
        }
      }
    );
  }, []);
  return (
    <>
      <button
        className={`${styles.loginbutton}`}
        onClick={() => {
          widgetRef.current.open();
        }}
      >
        Upload
      </button>
    </>
  );
};

export default UploadWidget;
