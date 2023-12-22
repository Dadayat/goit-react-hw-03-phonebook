import { ContactItem } from 'components/ContactItem/ContactItem';
import css from './ContactsList.module.css';

const ContactsList = ({ contacts, onDeleteContact }) => (
  <div className={css.contactsContainer}>
    {contacts.map(contact => (
      <ContactItem
        name={contact.name}
        number={contact.number}
        id={contact.id}
        onDeleteContact={onDeleteContact}
        key={contact.id}
      />
    ))}
  </div>
);

export { ContactsList };
