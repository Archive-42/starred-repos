import { usePrompt } from "../../../context/promptContext";
import styles from "./SectionsForm.module.css";

const SectionsForm = () => {
  const {
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
  } = usePrompt();

  const colorKeys = Object.keys(colors);

  const toggle = (state, stateSetter) => {
    state === 1 ? stateSetter(-1) : stateSetter(1);
  };

  return (
    <div>
      <p className={styles.subsection}>Basic Options</p>

      <div className={styles.subsectionForm}>
        <div>
          <label className={styles.label} htmlFor="username">
            Username:
          </label>
          <input
            type="checkbox"
            name="username"
            checked={user === 1}
            onChange={() => toggle(user, setUser)}
          />
          {user === 1 && (
            <select
              onChange={(e) => setUserColor(e.target.value)}
              value={userColor}
              className={styles.dropdown}
            >
              {colorKeys.map((color) => (
                <option value={color} key={color}>
                  {color}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className={styles.label} htmlFor="hostname">
            Hostname:
          </label>
          <input
            type="checkbox"
            name="hostname"
            checked={host === 1}
            onChange={() => toggle(host, setHost)}
          />
          {host === 1 && (
            <select
              onChange={(e) => setHostColor(e.target.value)}
              value={hostColor}
              className={styles.dropdown}
            >
              {colorKeys.map((color) => (
                <option value={color} key={color}>
                  {color}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className={styles.label} htmlFor="git-branch">
            Display Git Branch
          </label>
          <input
            type="checkbox"
            name="git-branch"
            checked={branch === 1}
            onChange={() => toggle(branch, setBranch)}
          />
          {branch === 1 && (
            <select
              onChange={(e) => setBranchColor(e.target.value)}
              value={branchColor}
              className={styles.dropdown}
            >
              {colorKeys.map((color) => (
                <option value={color} key={color}>
                  {color}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div>
        <p className={styles.subsection}>Path</p>
        <div className={styles.subsectionForm}>
          <label className={styles.label} htmlFor="full">
            Full:
          </label>
          <input
            type="radio"
            value="full"
            name="path"
            checked={path === "full"}
            onChange={(e) => setPath(e.target.value)}
          />

          <label className={styles.label} htmlFor="partial">
            Partial:
          </label>
          <input
            type="radio"
            value="partial"
            name="path"
            checked={path === "partial"}
            onChange={(e) => setPath(e.target.value)}
          />

          <label className={styles.label} htmlFor="none">
            None:
          </label>
          <input
            type="radio"
            value="none"
            name="path"
            checked={path === "none"}
            onChange={(e) => setPath(e.target.value)}
          />

          {path !== "none" && (
            <select
              onChange={(e) => setPathColor(e.target.value)}
              value={pathColor}
              className={styles.dropdown}
            >
              {colorKeys.map((color) => (
                <option value={color} key={color}>
                  {color}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionsForm;
