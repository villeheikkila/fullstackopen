import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.content.name} {props.content.exercises}</p>
        </div>
    )
}

const Content = (props) => {
    return (
      <div>
        <div>
            <p></p>
            <Part content={props.content[0]} />
            <Part content={props.content[1]} />
            <Part content={props.content[2]} />
        </div>
      </div>
    )
}

const Total = (props) => {
    return (
      <div>
        <p>yhteensä {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises} tehtävää</p>
      </div>
    )
}


const App = () => {
    const kurssi = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
          {
            name: 'Reactin perusteet',
            exercises: 10
          },
          {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
          },
          {
            name: 'Komponenttien tila',
            exercises: 14
          }
        ]
      }

  return (
    <div>
      <Header course={kurssi.name} />
      <Content content={kurssi.parts} />
      <Total total={kurssi.parts} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)