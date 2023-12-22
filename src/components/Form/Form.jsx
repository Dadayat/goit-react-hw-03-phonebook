import { Component } from 'react';
import css from './Form.module.css';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  onSubmitAddContact = event => {
    event.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.reset();
  };

  onChangeInput = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  reset = () =>
    this.setState({
      name: '',
      number: '',
    });

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.onSubmitAddContact} className={css.contactForm}>
        <label className={css.contactLabel}>
          Name
          <input
            className={css.contactInput}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.onChangeInput}
          />
        </label>
        <label className={css.contactLabel}>
          Phone number
          <input
            className={css.contactInput}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.onChangeInput}
          />
        </label>
        <button className={css.contactAddBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export { Form };
