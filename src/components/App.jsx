import { Component } from 'react';
import { Form } from './Form/Form';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './App.module.css';

const LS_KEY = 'my_contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Harry Potter', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Granger', number: '443-89-12' },
      { id: 'id-3', name: 'Ronald Weasley', number: '645-17-79' },
      { id: 'id-4', name: 'Draco Malfoy', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount = () => {
    const startState = JSON.parse(localStorage.getItem(LS_KEY));
    if (startState) {
      this.setState({ contacts: [...startState] });
    }
  };

  componentDidUpdate = (_, prevState) => {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
      console.log('update contacts');
    }
  };

  onSubmitForm = data => {
    const isNameNew = this.checkIsNameNew(data.name);

    if (!isNameNew) {
      Notify.warning(`${data.name} is already in contacts`, {
        width: '500px',
        position: 'right-top',
        timeout: 3000,
        fontSize: '20px',
      });
      return;
    }

    const newObj = { ...data, id: nanoid() };

    this.setState(({ contacts }) => {
      return {
        contacts: [...contacts, newObj],
      };
    });
  };

  checkIsNameNew = contactName => {
    return !this.state.contacts.find(
      ({ name }) => name.toLowerCase() === contactName.toLowerCase()
    );
  };

  onChangeFilter = event => {
    const { value } = event.currentTarget;
    this.setState({ filter: value });
  };

  filterByName = () => {
    const { contacts, filter } = this.state;
    const lowerFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(lowerFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.filterByName();

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <Form onSubmit={this.onSubmitForm} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChangeFilter={this.onChangeFilter} />
        {visibleContacts.length > 0 && (
          <ContactsList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        )}
      </div>
    );
  }
}
