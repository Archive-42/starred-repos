import { usePrompt } from "../../context/promptContext";
import { useEffect, useState } from "react";
import "./PromptVisual.css";

const PromptVisual = () => {
  const {
    colors,
    user,
    host,
    path,
    branch,
    userColor,
    hostColor,
    pathColor,
    branchColor,
  } = usePrompt();

  const [colorNames, setColorNames] = useState(null);
  const [userPrompt, setUserPrompt] = useState(null);
  const [hostPrompt, setHostPrompt] = useState(null);
  const [pathPrompt, setPathPrompt] = useState(null);
  const [branchPrompt, setBranchPrompt] = useState(null);

  useEffect(() => {
    if (!colorNames) {
      setColorNames(Object.keys(colors));
    }
  }, [colors, colorNames]);

  useEffect(() => {
    if (colorNames) {
      let userPromptInfo =
        user === 1 ? (
          <span
            className={`color-${colorNames[colorNames.indexOf(userColor)]}`}
          >
            user
          </span>
        ) : (
          ""
        );

      setUserPrompt(userPromptInfo);
    }
  }, [user, userColor, colorNames]);

  useEffect(() => {
    if (colorNames) {
      let hostPromptInfo =
        host === 1 ? (
          <span
            className={`color-${colorNames[colorNames.indexOf(hostColor)]}`}
          >
            host{" "}
          </span>
        ) : (
          ""
        );

      setHostPrompt(hostPromptInfo);
    }
  }, [host, hostColor, colorNames]);

  useEffect(() => {
    if (colorNames) {
      let pathPromptInfo =
        path === "full" ? (
          <span
            className={`color-${colorNames[colorNames.indexOf(pathColor)]}`}
          >
            ~/Documents/Notes
          </span>
        ) : path === "partial" ? (
          <span
            className={`color-${colorNames[colorNames.indexOf(pathColor)]}`}
          >
            /Notes
          </span>
        ) : (
          ""
        );

      setPathPrompt(pathPromptInfo);
    }
  }, [path, pathColor, colorNames]);

  useEffect(() => {
    if (colorNames) {
      let branchPromptInfo =
        branch === 1 ? (
          <span
            className={`color-${colorNames[colorNames.indexOf(branchColor)]}`}
          >
            {" "}(main)
          </span>
        ) : (
          ""
        );
      setBranchPrompt(branchPromptInfo);
    }
  }, [branch, branchColor, colorNames]);

  return (
    <div className="prompt-visual-container">
      {
        <p>
          {userPrompt}
          {userPrompt && hostPrompt && (
            <span
              className={`color-${colorNames[colorNames.indexOf(userColor)]}`}
            >
              @
            </span>
          )}
          {hostPrompt}
          {pathPrompt}
          {branchPrompt}
          {<span className="color-white">: </span>}
        </p>
      }
    </div>
  );
};

export default PromptVisual;
