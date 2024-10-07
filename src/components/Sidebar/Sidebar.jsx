import styles from "./Sidebar.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { GoHistory } from "react-icons/go";
import { IoSettingsSharp } from "react-icons/io5";
import { TfiComment } from "react-icons/tfi";

import { useContext } from "react";
import { Context } from "../../context/context";

const Sidebar = ({ isOpen, setisOpen }) => {
  const handleClick = () => setisOpen(!isOpen);

  const { onSent, delayPara, prevPrompt, setrecentPrompt, newChat } =
    useContext(Context);

  const loadPrompt = async (prompt) => {
    setrecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div
      className={`${styles.sidebarWrapper} ${
        isOpen ? styles.sidebarOpen : styles.sidebarClose
      }`}
    >
      <div className={styles.upperSidebar}>
        <div className={styles.menuIconSection}>
          <RxHamburgerMenu onClick={handleClick} className={styles.menuIcon} />
        </div>
        <div className={styles.newChatWrapper} onClick={() => newChat()}>
          <FiPlus className={styles.newChatIcon} />
          {isOpen && <div className={styles.newChatText}>New Chat</div>}
        </div>

        <div
          className={` ${
            isOpen ? styles.recentSection : styles.recentSectionClose
          }`}
        >
          <p className={styles.recentTitle}>Recent</p>

          {prevPrompt.map((prompt, index) => {
            {
              return (
                <div
                  className={styles.recentEntry}
                  onClick={() => loadPrompt(prompt)}
                >
                  <div>
                    <TfiComment
                      className={styles.recentEntryIcon}
                      color="black"
                    />
                  </div>

                  <p>{prompt.slice(0, 18)}</p>
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className={styles.lowerSidebar}>
        <div className={styles.option}>
          <IoIosHelpCircleOutline className={styles.optionIcon} />
          {isOpen && <p className={styles.optionText}>Help</p>}
        </div>
        <div className={styles.option}>
          <GoHistory className={styles.optionIcon} />
          {isOpen && <p className={styles.optionText}>Activity</p>}
        </div>
        <div className={styles.option}>
          <IoSettingsSharp className={styles.optionIcon} />
          {isOpen && <p className={styles.optionText}>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
