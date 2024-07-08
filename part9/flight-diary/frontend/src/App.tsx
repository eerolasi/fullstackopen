import { useEffect, useState } from 'react';
import { getAllEntries, createEntry } from './services/diaryService';
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from './types';
import axios from 'axios';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: ''
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data);
    }).catch(error => {
      console.error('Error fetching entries', error);
    });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setNewEntry({
      ...newEntry,
      [name]: value 
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createEntry(newEntry).then(data => {
      setEntries(entries.concat(data));
      setNewEntry({
        date: '',
        weather: Weather.Sunny,
        visibility: Visibility.Great,
        comment: ''
      });
      setError(null);
    }).catch((error: unknown) => {
      if (axios.isAxiosError(error) && error.response && typeof error.response.data === 'string') {
        setError(error.response.data);
      } else {
        setError('An unexpected error occurred');
      }
    });
  };


  return (
    <div>
      <h2>Add new entry</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          Date: <input type="date" name="date" value={newEntry.date} onChange={handleInputChange} />
        </div>
        <div>
          Visibility:
          {Object.values(Visibility).map((option: Visibility) => (
            <label key={option}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={newEntry.visibility === option}
                onChange={handleInputChange}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          Weather:
          {Object.values(Weather).map((option: Weather) => (
            <label key={option}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={newEntry.weather === option}
                onChange={handleInputChange}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          Comment: <input type="text" name="comment" value={newEntry.comment} onChange={handleInputChange} />
        </div>
        <button type="submit">Add</button>
      </form>
      <h2>Diary entries</h2>
      {entries.map(entry => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>
            Visibility: {entry.visibility} <br />
            Weather: {entry.weather}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;