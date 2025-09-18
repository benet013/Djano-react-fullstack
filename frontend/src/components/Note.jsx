import { useState } from "react";

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handleDelete = () => {
        onDelete(note.id);
    }

    return (
        <>
            <li className="note">
                <div className="details">
                    <p>{note.title}</p>
                    <span>{note.content}</span>
                </div>
                <div className="bottom-content">
                    <span>{formattedDate}</span>
                    <button onClick={handleDelete} className="delete-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>

                </div>
            </li>
        </>

    );
}

export default Note;