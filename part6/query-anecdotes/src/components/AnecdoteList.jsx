import React from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote } from '../requests';
import { useNotification } from './NotificationContext';

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient();
  const { dispatch } = useNotification();

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      dispatch({
        type: 'SHOW_NOTIFICATION',
        data: `anecdote ${anecdote.content} voted`,
      });
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000);
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
