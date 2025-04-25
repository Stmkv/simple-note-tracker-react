import './App.css';
import Button from './components/Button/Button';
import JournalItem from './components/JournalItem/JournalItem.jsx';
import CardButton from './components/CardButton/CardButton.jsx';
import Header from './components/Header/Header.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import LeftPanel from './components/layouts/LeftPanel/LeftPanel.jsx';
import Body from './components/layouts/Body/Body.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import { useState } from 'react';
import JournalForm from './components/JournalForm/JournalForm.jsx';

const INITIAL_DATA = [
  {
    id: 1,
    title: 'Подготовка к обновлению курсов',
    text: 'Все собираемся совместно сделать обновление курсов',
    date: new Date(),
  },
  {
    id: 2,
    title: 'Поход в горы',
    text: 'Все собираемся пойти в горы',
    date: new Date(),
  },
];

function App() {
  const [items, setItems] = useState([...INITIAL_DATA]);

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
