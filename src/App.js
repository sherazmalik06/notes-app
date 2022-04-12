import React, { Component } from 'react';
import uuid from 'uuid';
import './index.css';
import NoteInput from './components/NoteInput';
import NotesList from './components/NotesList';

class App extends Component {
  state = {
    value: '',
    notes: [
      {
        id: uuid.v4(),
        note: "Add, edit, and delete your notes..."
      }
    ]
  }

  componentDidMount() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [...this.state.notes]
    this.setState({
      notes: notes
    })
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  onSubmit = (value) => {
    this.setState({
      notes: [
        ...this.state.notes,
        {
          id: uuid.v4(),
          note: value
        }
      ],
      value: ''
    }, () => localStorage.setItem('notes', JSON.stringify(this.state.notes)));
    document.querySelector('textarea').focus();
  }

  editNote = id => {
    const currentNote = this.state.notes.filter(note => note.id === id);
    this.setState({
      value: currentNote[0].note
    }, () => this.deleteNote(currentNote[0].id));
    document.querySelector('textarea').focus();
  }

  deleteNote = id => {
    const notes = this.state.notes.filter(note => note.id !== id);
    this.setState({
      notes
    }, () => localStorage.setItem('notes', JSON.stringify(this.state.notes)))
  }

  render() {
    return (
      <div className="App">
        <h1>Notes App</h1>
        <NoteInput
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          value={this.state.value}
        />
        <NotesList
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          editNote={this.editNote}
        />
      </div>
    )
  }
}


export default App;