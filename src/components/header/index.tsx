import { Link } from "react-router-dom";

import "./header.module.css";
import styles from "./header.module.css";
import logo from "../../assets/logo.svg";
export default function Header() {
  return (
    <header className={styles.container}>
      <Link to="/">
        <img src={logo} alt="Logo Cripto App" />
      </Link>
    </header>
  );
}
