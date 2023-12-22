import css from './ContactItem.module.css';

const ContactItem = ({ name, number, id, onDeleteContact }) => (
  <div className={css.contactsList}>
    <p>
      {name}: {number}
    </p>
    <button
      className={css.delContactBtn}
      type="button"
      onClick={() => onDeleteContact(id)}
    >
      Delete
    </button>
  </div>
);

export { ContactItem };
