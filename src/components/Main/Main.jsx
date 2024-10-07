import styles from "./Main.module.css";
import { BiSolidImageAdd } from "react-icons/bi";
import { IoMdMic } from "react-icons/io";
import { IoCompassOutline } from "react-icons/io5";
import { GoLightBulb } from "react-icons/go";
import { TfiComment } from "react-icons/tfi";
import { FaReact } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { FaStopCircle } from "react-icons/fa";

import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/context";
import { Link } from "react-router-dom";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    setrecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);

  const handleClick = async (text) => {
    setrecentPrompt(text);
    await onSent(text);
  };

  return (
    <main className={styles.mainWrapper}>
      <div className={styles.navBar}>
        <div className={styles.navHeading}>
          <p>Gemini</p>
          <img
            src="/images/google-gemini-icon.svg"
            className={styles.headerLogo}
          />
        </div>
        <div className={styles.navProfile}>
          <img src="../images/bishow_prof.jpg" className={styles.profileImg} />
        </div>
      </div>

      {!showResult ? (
        <div className={styles.hero}>
          <div className={styles.heroWriting}>
            <p className={styles.heroHeading}>Hello, Dev. </p>
            <p className={styles.heroText}>How can I help you Today?</p>
          </div>

          <div className={styles.heroCardList}>
            <div
              className={styles.heroCard}
              onClick={() =>
                handleClick(
                  "Suggest beautiful places to see on an upcoming road trip"
                )
              }
            >
              <p className={styles.cardText}>
                Suggest beautiful places to see on an upcoming road trip
              </p>
              <IoCompassOutline className={styles.cardImg} />
            </div>
            <div
              className={styles.heroCard}
              onClick={() =>
                handleClick("Briefly summarize this concept: Urban Planning")
              }
            >
              <p className={styles.cardText}>
                Briefly summarize this concept: Urban Planning
              </p>
              <GoLightBulb className={styles.cardImg} />
            </div>
            <div
              className={styles.heroCard}
              onClick={() =>
                handleClick(
                  "Brainstorm team bonding activities for our work retreat"
                )
              }
            >
              <p className={styles.cardText}>
                Brainstorm team bonding activities for our work retreat
              </p>
              <TfiComment className={styles.cardImg} />
            </div>
            <div
              className={styles.heroCard}
              onClick={() =>
                handleClick("Tell me about React js and React Native")
              }
            >
              <p className={styles.cardText}>
                Tell me about React js and React Native
              </p>
              <FaReact className={styles.cardImg} />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.results}>
          <div className={styles.resultTitle}>
            <p className={styles.resultTitleText}>{recentPrompt}</p>
          </div>

          <div className={styles.resultData}>
            <img
              src="/images/google-gemini-icon.svg"
              className={styles.headerLogo}
            />
            {loading ? (
              <div className={styles.loader}>
                <hr />
                <hr />
                <hr />
              </div>
            ) : (
              <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
            )}
          </div>
        </div>
      )}

      <div className={styles.inputDiv}>
        <div className={styles.searchBox}>
          <div className={styles.leftSearch}>
            <input
              type="text"
              className={styles.inputBox}
              placeholder="Enter your text here"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </div>
          <div className={styles.rightSearch}>
            <BiSolidImageAdd className={styles.searchIcons} />
            <IoMdMic className={styles.searchIcons} />

            {input ? (
              <IoSend className={styles.searchIcons} onClick={() => onSent()} />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;