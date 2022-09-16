import {useState} from 'react'

const Modal = (props) => {
  let [newTeam, setNewTeam] = useState({name: '', players: ''})

  const handleChange = (event) => {
    setNewTeam({...newTeam, [event.target.name]: event.target.value})
  }

  const handleSubmitModalForm = (event) => {
    event.preventDefault()
    //console.log(newTeam)
    props.handleSubmitModal(newTeam)
    setNewTeam({name: '', players: ''})
  }

  return (
    <div id='modal'>
      <div id='modal-text'>
        <button onClick={props.handleCancelNewTeam}>Close</button>
        <h1>Modal</h1>
        <form onSubmit={handleSubmitModalForm}>
          <label htmlFor="name">Team Name: </label>
          <input type="text" name="name" value={newTeam.name} onChange={handleChange}/>
          <br />
          <br />
          <input type="submit"/>
        </form>
      </div>
    </div>
  )
}

export default Modal
