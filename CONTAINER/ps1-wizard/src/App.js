import { SectionsForm, PromptOutput, PromptVisual } from "./components";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h1>Make Your Prompt Awesome</h1>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.formContainer}>
          <SectionsForm />
        </div>

        <div className={styles.promptContainer}>
          <PromptVisual />
          <PromptOutput />
        </div>
      </div>
      <div className={styles.footer}>
        <p>Links</p>
        <p>and</p>
        <p>Stuff</p>
      </div>
    </div>
  );
};

export default App;
