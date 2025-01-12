import { ContactRound, Phone } from "lucide-react";
import styles from "./Contact.module.css";

const Contact = ({ id, name, number, onDelete }) => {
  return (
    <li className={styles.contact}>
      <p className={styles.text}>
        <span className={styles.name}>
          <ContactRound className={styles.icon} /> {name}
        </span>
        <span className={styles.number}>
          <Phone className={styles.icon} /> {number}
        </span>
      </p>
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
};

export default Contact;
