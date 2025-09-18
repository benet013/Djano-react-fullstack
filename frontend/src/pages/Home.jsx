import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css"


function Home() {
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        api.get("/notes/").then((res) => res.data)
            .then((data) => {
                setNotes(data)
                console.log(data)
            }).catch((err) => alert(err));
    }

    const createNote = (e) => {
        e.preventDefault();
        api.post("/notes/", { title, content }).
            then((res) => {
                if (res.status === 201) {
                    alert("note created")
                }
                else {
                    alert("failed")
                }
                getNotes();
                setTitle("")
                setContent("")
                setShowPopup(false)

            }).catch((err) => alert(err))
    }

    const deleteNote = (id) => {
        api.delete(`/notes/${id}/`).
            then((res) => {
                if (res.status === 204) {
                    alert("successfully deleted")
                }
                else {
                    alert("failed to delete")
                }
                getNotes();

            }).catch((err) => alert(err));

    }

    return (
        <>
            <link
                rel="stylesheet"
                href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
            />
            <div className="home">
                <div className={`popup-box ${showPopup ? "show" : ""}`}>
                    <div className="popup">
                        <div className="content">
                            <header>
                                <p></p>
                                <i
                                    className="uil uil-times"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setShowPopup(false)}
                                />
                            </header>

                            <form onSubmit={createNote}>
                                <div className="row title">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        required
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                        spellCheck="false"
                                    />
                                </div>

                                <div className="row description">
                                    <label>Description</label>
                                    <textarea
                                        id="content"
                                        name="content"
                                        required
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        spellCheck="false"
                                    />
                                </div>

                                <button type="submit">Add Note</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="wrapper">
                    <li className="add-box" onClick={() => setShowPopup(true)} style={{ cursor: "pointer" }}>
                        <div className="icon">
                            <span style={{ fontSize: 36, lineHeight: 1 }}>+</span>
                        </div>
                        <p>Add new note</p>
                    </li>
                    {notes.map((note) => (
                        <Note note={note} onDelete={deleteNote} key={note.id} />
                    ))}
                </div>
            </div>

        </>
    )
}

export default Home