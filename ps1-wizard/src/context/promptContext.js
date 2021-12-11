import { createContext, useContext, useState } from "react";

export const PromptContext = createContext();

export const usePrompt = () => useContext(PromptContext);

export const PromptProvider = (props) => {
  const [user, setUser] = useState(1);
  const [host, setHost] = useState(1);
  const [path, setPath] = useState("full");
  const [branch, setBranch] = useState(-1);
  const [userColor, setUserColor] = useState("white");
  const [hostColor, setHostColor] = useState("white");
  const [pathColor, setPathColor] = useState("white");
  const [branchColor, setBranchColor] = useState("white");

  const colors = {
    black: `\\[\\e[30m\\]`,
    blue: `\\[\\e[34m\\]`,
    cyan: `\\[\\e[36m\\]`,
    green: `\\[\\e[32m\\]`,
    purple: `\\[\\e[35m\\]`,
    red: `\\[\\e[31m\\]`,
    white: `\\[\\e[37m\\]`,
    yellow: `\\[\\e[33m\\]`,
  };

  return (
    <PromptContext.Provider
      value={{
        colors,
        user,
        setUser,
        host,
        setHost,
        path,
        setPath,
        branch,
        setBranch,
        userColor,
        setUserColor,
        hostColor,
        setHostColor,
        pathColor,
        setPathColor,
        branchColor,
        setBranchColor,
      }}
    >
      {props.children}
    </PromptContext.Provider>
  );
};
