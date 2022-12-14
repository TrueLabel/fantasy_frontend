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
        <i id='xbutton' onClick={props.handleCancelNewTeam} className="fa-solid fa-x"></i>
        <h1>Team Name</h1>
        <form onSubmit={handleSubmitModalForm}>
          <label htmlFor="name">Your Team Name: </label>
          <input type="text" name="name" placeholder='Team 1' value={newTeam.name} onChange={handleChange}/>
          <br />
          <br />
          <input className='submit-modal' type="submit"/>
        </form>

      </div>
    </div>
  )
}

export default Modal
