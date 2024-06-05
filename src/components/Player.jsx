import { useState } from 'react';
import React from 'react';
export default function Player({ name, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);
    function handleEditClick() {
        setIsEditing(!isEditing);
        
        if (isEditing){
            onChangeName ( symbol, playerName );
        }
    }
    function handleChange(event) {
        setPlayerName(event.target.value);
    }
    let editablePlayerName = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        editablePlayerName = (
            <input type="text" required value={playerName} onChange={handleChange} />
        );
    }
    return (
        <li>
            <span className={isActive ? 'active' : undefined}>
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}