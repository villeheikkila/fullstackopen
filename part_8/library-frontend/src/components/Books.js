import React, { useState } from 'react'

const Books = ({ result, show }) => {
  const [filter, setFilter] = useState("all genres")

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }


  const books = result.data.allBooks
  const genres = ["refactoring", "agile", "patterns", "design", "crime", "classic", "all genres"]

  return (
    <div>
      <h2>books</h2>
      {filter !== "all genres" ? <p>in genre {filter}</p> : (null)}
      < table >
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter(book => filter === "all genres" ? book : book.genres.includes(filter)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(a =>
        <button onClick={() => setFilter(a)}>{a}</button>
      )}
    </div>
  )
}

export default Books