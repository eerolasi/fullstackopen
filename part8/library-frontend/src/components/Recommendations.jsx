import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { USER, ALL_BOOKS } from '../queries'

const Recommendations = ({ show }) => {
  const userResult = useQuery(USER)
  const booksResult = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }
  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }
  const favoriteGenre = userResult.data.me.favoriteGenre
  const books = booksResult.data.allBooks
  const booksToShow = books.filter((book) =>
    book.genres.includes(favoriteGenre)
  )
  console.log(booksToShow)
  return (
    <>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Recommendations
