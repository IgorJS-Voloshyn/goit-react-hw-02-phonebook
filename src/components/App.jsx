import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
  };

  formSubmitHundler = data => {
    let nameArray = [];
    nameArray = this.state.contacts.map(value => value.name);
    if (!nameArray.includes(data.name)) {
      let arrayCont = [];
      arrayCont = [
        ...this.state.contacts,
        { id: nanoid(), name: data.name, number: data.number },
      ];
      return this.setState({ ...this.state, contacts: arrayCont });
    } else {
      alert(`${data.name} is already in your contacts`);
    }
  };
  addContact = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  elementDelete = (arr, idContact) => {
    let newArr = arr.filter(elem => elem.id !== idContact);
    return newArr;
  };

  deleteContactFromContactList = idContact => {
    let newArrAfterDel = this.elementDelete(this.state.contacts, idContact);
    this.setState({
      ...this.state,
      contacts: [...newArrAfterDel],
    });
  };
  render() {
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHundler} />
        <h2 className={css.title}>Constacts</h2>
        <Filter contacts={this.state.contacts} />
        <ContactList
          contacts={this.state.contacts}
          del={this.deleteContactFromContactList}
        />
      </div>
    );
  }
}
