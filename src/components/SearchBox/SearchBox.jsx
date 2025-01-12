import styles from "./SearchBox.module.css";

function SearchBox({ value, onChange }) {
  return (
    <div className={styles.searchBox}>
      <div className={styles.filterText}>Find contacts by name</div>
      <input className={styles.input} type="text" value={value} onChange={onChange} placeholder="" />
    </div>
  );
}

export default SearchBox;
