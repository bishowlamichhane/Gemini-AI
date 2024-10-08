import { createContext, useRef, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setrecentPrompt] = useState("");
  const [prevPrompt, setprevPrompt] = useState([]);
  const [showResult, setshowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setresultData] = useState("");
  const timeouts = useRef([]);
  const [theme, setTheme] = useState("light");
  const delayPara = (index, nextWord) => {
    const timeout = setTimeout(() => {
      setresultData((prev) => prev + nextWord);
    }, 75 * index);
    timeouts.current.push(timeout);
  };

  const clearTimeouts = () => {
    timeouts.current.forEach((timeout) => clearTimeout(timeout));
    timeouts.current = [];
  };

  const toggleTheme = () => {
    return theme === "dark" ? setTheme("light") : setTheme("dark");
  };
  const newChat = () => {
    setLoading(false);
    setshowResult(false);
  };

  const onSent = async (prompt) => {
    clearTimeouts();
    setresultData("");
    setLoading(true);

    setshowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
    } else {
      setprevPrompt((prev) => [...prev, input]);
      setrecentPrompt(input);
      response = await run(input);
    }

    let responseArray = response.split("**");

    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("<br/>");

    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);

    setInput("");
  };
  const contextValue = {
    prevPrompt,
    setprevPrompt,
    onSent,
    recentPrompt,
    setrecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    toggleTheme,
    theme,
    setTheme,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
