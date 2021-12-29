import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import PhotoFrame from "./Components/PhotoFrame";
import Form from "./Components/Form";
import axios from "axios";
import Footer from "./Components/Footer";

function App() {
  const [data, setData] = useState({});
  const [bgImage, setBgImage] = useState({});
  const [personImage, setPersonImage] = useState({});
  const [personName, setPersonName] = useState("");
  const [writeUp, setWriteUp] = useState("");
  let [trigger, setTrigger] = useState(1);

  const [backgroundImageURL, setBackgroundImageURL] = useState("");
  const [presignedURLBackground, setPresignedURLBackground] = useState("");
  const [presignedURLProfile, setPresignedURLProfile] = useState("");

  const API =
    "https://wjpe2rzcad.execute-api.eu-west-2.amazonaws.com/default/getPresignedImageURL";

// THIS FUNCTION IS USED TO MAKE SURE THAT THE PHOTO UPLOADS ONCE THE ICONS ARE CLICKED
    const hiddenFIleUpload = useRef(null)


    // THIS FUNCTION POSTS TO AMAZON S3 USING THE ALREDY OBTAINED PRESIGNED URLS
  const postBGToS3 = (presignedURL, payLoad) => {
    axios.put(presignedURL, payLoad).then((res) => {
      setBgImage({ image: presignedURL.split('?')[0] });
      console.log(bgImage)
    });
      console.log(presignedURLBackground);
      
      
  };
  const postProfileToS3 = (presignedURL, payLoad) => {
    axios.put(presignedURL, payLoad).then((res) => {
      setPersonImage({ image: presignedURL.split('?')[0] });
    });     
      
  };


   // THIS FUNCTION GETS THE BACKGROUND IMAGE AND POSTS TO S3
  function getbgImage(e) {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      axios.get(API, img).then((res) => {
        const uploadURL = res.data.uploadURL;
        postBGToS3(uploadURL, img)
        setPresignedURLBackground(uploadURL);
      });

    }
  }

  function getProfileImage(e) {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      axios.get(API, img).then((res) => {
        const uploadURL = res.data.uploadURL;
        postProfileToS3(uploadURL, img)
        setPresignedURLProfile(uploadURL);
      });

    }

  }

  function getName(e) {
    setPersonName(e.target.value);
  }

  function getWriteUp(e) {
    setWriteUp(e.target.value);
  }

  function takeSnapShot() {
    setTrigger((trigger += 1));
  }

  return (
    <div className="App pt-8 sm:px-16 md:px-4 lg:pl-32   px-4 bg-[#F9F9F9] min-h-screen w-full pb-8 ">
      <Header />
      <div className="grid sm:grid-cols-2 grid-cols-1 justify-center sm:mb-16 ">
        <PhotoFrame
          background={bgImage.image}
          profileImage={personImage.image}
          attendeeName={personName}
          writeUpText={writeUp}
          triggerCount={trigger}
        />
        <Form
          getBgFunction={getbgImage}
          getProfileFunction={getProfileImage}
          getNameFunction={getName}
          getWriteUpFunction={getWriteUp}
          captureImage={takeSnapShot}
        />
      </div>
      <Footer/>
    </div>
  );
}

export default App;
