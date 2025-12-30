import { Code } from "bright";
import styles from "./CodeSnippet.module.css";
import theme from "./theme";

function CodeSnippet(props) {
  return <Code {...props} theme={theme} className={styles.wrapper} />;
}

export default CodeSnippet;
