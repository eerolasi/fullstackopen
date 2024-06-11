import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import {
  NotificationProvider,
  useNotification,
} from './components/NotificationContext';
import AnecdoteList from './components/AnecdoteList';
import { useQuery } from '@tanstack/react-query';
import { getAnecdotes } from './requests';

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (result.status === 'error' || result.status === 'pending') {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <NotificationProvider>
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList anecdotes={anecdotes} />
      </div>
    </NotificationProvider>
  );
};

export default App;
