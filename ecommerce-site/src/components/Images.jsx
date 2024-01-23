import React, { useState } from "react";
import styles from "../components/Images.module.css";

// პატარა და დიდი სურათების import

import img1Big from "../images/img1b.jpg";
import img1Small from "../images/img1s.jpg";

import img2Big from "../images/img2b.jpg";
import img2Small from "../images/img2s.jpg";

import img3Big from "../images/img3b.jpg";
import img3Small from "../images/img3s.jpg";

import img4Big from "../images/img4b.jpg";
import img4Small from "../images/img4s.jpg";

function Images() {
  const [selectedImg, setSelectedImg] = useState(img1Big); // ვქმნით State ცვლადებს selectedImg და setSelectedImg useState Hook-ის გამოყენებით. setSelectedImg-ის საწყისი value არის img1Big
  const [selectedSmallImg, setSelectedSmallImg] = useState(img1Small); // ვქმნით State ცვლადებს selectedSmallImg და setselectedSmallImg useState Hook-ის გამოყენებით. setselectedSmallImg-ის საწყისი value არის img1Small

  //ვადეკლარირებთ ფუნქციას რომელიც ყველა click-ს მართავს პატარა სურათებზე
  const handleSmallImgClick = (newImg, newSmallImg) => {
    setSelectedImg(newImg); // დიდი სურათის განახლება
    setSelectedSmallImg(newSmallImg); // პატარა სურათის განახლება (ამ შემთხვევაში border და opacity)
  };

  //JSX კოდი კომპონენტის რენდერისთვის
  return (
    <div className={styles.container}>
      {/* დიდი სურათი */}
      <img src={selectedImg} className={styles.bigImg} />

      {/* კონტეინერი 4 პატარა სურათისთვის */}
      <div className={styles.smallImgContainer}>
        <img
          src={img1Small}
          className={`${styles.smallImg} ${
            selectedSmallImg === img1Small && styles.selected
          }`}
          alt="Small image 1"
          onClick={() => handleSmallImgClick(img1Big, img1Small)}
        />
        {/* onClick ანუ სურათზე დაჭერის დროს ფუნქცია handleSmallImgClick triggered-ება და 2 პარამეტრი გვაქვს, ამ შემთხვევაში img1Big და img1Small, სხვა სურათების შემთხვევაში img2Big და ა.შ  */}
        {/* handleSmallImgClick ის დროს დიდი სურათი ხდება img1Big (რომელიც უკვე იყო, მაგრამ თუ სხვა სურათი იყო მონიშნული ამ შემთხვევაში შეიცვლება) და selectedSmallImg ხდება img1Small (რომელიც უკვე იყო) */}
        <img
          src={img2Small}
          className={`${styles.smallImg} ${
            selectedSmallImg === img2Small && styles.selected
          }`}
          alt="Small image 2"
          onClick={() => handleSmallImgClick(img2Big, img2Small)}
        />
        <img
          src={img3Small}
          className={`${styles.smallImg} ${
            selectedSmallImg === img3Small && styles.selected
          }`}
          alt="Small image 3"
          onClick={() => handleSmallImgClick(img3Big, img3Small)}
        />
        <img
          src={img4Small}
          className={`${styles.smallImg} ${
            selectedSmallImg === img4Small && styles.selected
          }`}
          alt="Small image 4"
          onClick={() => handleSmallImgClick(img4Big, img4Small)}
        />
      </div>
    </div>
  );
}

export default Images;
