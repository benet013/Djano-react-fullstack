import { useState,useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css"


function Home(){
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

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

    const deleteNote = (id) => {
        api.delete(`/notes/${id}/`).
        then((res) => {
            if (res.status === 204){
                alert("successfully deleted")
            }
            else{
                alert("failed to delete")
            }
            getNotes();

        }).catch((err) => alert(err));

    }

    const createNote = (e) => {
        e.preventDefault();
        api.post("/notes/", {title, content}).
        then((res) => {
            if (res.status === 201){
                alert("note created")
            }
            else{
                alert("failed")
            }
            getNotes();

        }).catch((err) => alert(err))
    }

    return (<div>
                <div>
                    <h2>Notes</h2>
                    {notes.map((note) => (
                        <Note note={note} onDelete={deleteNote} key={note.id} />
                    ))}
                </div>
                <h2>Create a Note</h2>
                <form onSubmit={createNote}>
                    <label htmlFor="title">Title:</label>
                    <br />
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <label htmlFor="content">Content:</label>
                    <br />
                    <textarea
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <br />
                    <input type="submit" value="Submit"></input>
                </form>
        </div>)
}

export default Home