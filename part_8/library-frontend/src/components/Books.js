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
              <td key="title">{a.title}</td>
              <td key="name">{a.author.name}</td>
              <td key="published">{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(a =>
        <button key={a} onClick={() => setFilter(a)}>{a}</button>
      )}
    </div>
  )
}

export default Books