import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);
  const clickHandler = () => {
    setIsEditing((editing) => !editing);
  };
  const changeNameHandler = (event) => {
    setPlayerName(event.target.value);
  };
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input
            type="text"
            required
            value={playerName}
            onChange={changeNameHandler}
          />
        )}
        <span className="player-symbol">X</span>
      </span>
      <button onClick={clickHandler}>{!isEditing ? "Edit" : "Save"}</button>
    </li>
  );
}
