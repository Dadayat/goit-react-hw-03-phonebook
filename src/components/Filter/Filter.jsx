import css from './Filter.module.css';

const Filter = ({ filter, onChangeFilter }) => (
  <label>
    Find contacts by name:
    <input
      className={css.filterInput}
      type="text"
      name="filter"
      value={filter}
      title="Enter the name"
      required
      onChange={onChangeFilter}
    />
  </label>
);

export { Filter };
