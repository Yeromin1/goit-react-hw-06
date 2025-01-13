import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import styles from "./SearchBox.module.css";

function SearchBox({ value }) {
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={styles.searchBox}>
      <div className={styles.filterText}>Find contacts by name</div>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={handleFilterChange}
        placeholder=""
      />
    </div>
  );
}

export default SearchBox;
