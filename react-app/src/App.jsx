import './App.css';
import Header from './components/Header/Header.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import LeftPanel from './components/layouts/LeftPanel/LeftPanel.jsx';
import Body from './components/layouts/Body/Body.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import { useState, useEffect } from 'react';
import JournalForm from './components/JournalForm/JournalForm.jsx';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      setItems(
        data.map(item => ({
          ...item,
          date: new Date(item.date),
        })),
      );
    }
  }, []);

  const addItem = item => {
    setItems(oldItems => [
      ...oldItems,
      {
        text: item.text,
        title: item.title,
        date: new Date(item.date),
        id: oldItems.length > 0 ? Math.max(...oldItems.map(i => i.id)) + 1 : 1,
      },
    ]);
  };

  return (
    <div className='app'>
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList items={items}></JournalList>
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
