import './App.css';
import contacts from './contacts.json';
import { useState } from 'react';

const firstFive = contact => {
  return contact.slice(0, 5);
};

function App() {
  const [cards, setCards] = useState(firstFive(contacts));

  /* const randomCard = contacts[Math.floor(Math.random() * contacts.length)]; */
  /*  const getRandomCard = contacts => {
    const randomCard = contacts[Math.floor(Math.random() * contacts.length)];
    setCards(randomCard);
  }; */

  const addRandomCard = () => {
    const randomCard = contacts[Math.floor(Math.random() * contacts.length)];
    const updatedContactList = [...cards, randomCard];
    setCards(updatedContactList);
  };

  const sortByPopularity = () => {
    const sorted = [...cards].sort((a, b) => b.popularity - a.popularity);
    setCards(sorted);
  };

  const sortAlphabetically = () => {
    const sortedByName = [...cards].sort((a, b) => (a.name > b.name ? 1 : -1));
    setCards(sortedByName);
  };

  const deleteContact = contactId => {
    const remainingCards = cards.filter(contact => {
      return contactId !== contact.id;
    });
    setCards(remainingCards);
  };

  return (
    <div className="App">
      <h2>IronContacts</h2>
      <div className="buttons">
        <button className="add" onClick={addRandomCard}>
          Add Random Contact
        </button>
        <button className="popularity" onClick={sortByPopularity}>
          Sort by Popularity
        </button>
        <button className="name" onClick={sortAlphabetically}>
          Sort by Name
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cards.map(card => {
            return (
              <tr key={card.id}>
                <td>
                  <img src={card.pictureUrl} alt="" width="100px" />
                </td>

                <td>{card.name}</td>
                <td>{card.popularity.toFixed(2)}</td>
                <td>{card.wonOscar && <p>🏆</p>}</td>
                <td>{card.wonEmmy && <p>🏆</p>}</td>
                <td>
                  <button
                    className="delete"
                    onClick={() => deleteContact(card.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
