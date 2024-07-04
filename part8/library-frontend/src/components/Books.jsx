import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genreFilter, setGenreFilter] = useState(null)

  const { loading, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: genreFilter },
  })

  if (loading) {
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }

  const books = data.allBooks

  const genres = [...new Set(books.flatMap((book) => book.genres))]

  const handleGenreFilter = (genre) => {
    setGenreFilter(genre)
    refetch({ genre })
  }

  const filteredBooks = genreFilter
    ? books.filter((book) => book.genres.includes(genreFilter))
    : books
  return (
    <div>
      <h2>books</h2>

      <div>
        <strong>Filter by genre:</strong>
        <select
          value={genreFilter}
          onChange={(e) => handleGenreFilter(e.target.value)}
        >
          <option value="">All genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
