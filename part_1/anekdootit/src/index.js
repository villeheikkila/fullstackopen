import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = props => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(6));
  const [mostVoted, setMostVoted] = useState("");

  const handleSelectedClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVoteClick = () => {
    const copy = { ...points };
    copy[selected] += 1;
    setPoints(copy);
    if (points[selected] > points[mostVoted]) {
      setMostVoted(selected);
    }
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br />
      has {points[selected]} points
      <br />
      <Button handleClick={handleSelectedClick} text="next anecdote" />
      <Button handleClick={handleVoteClick} text="vote" />
      <br />
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[mostVoted]}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
