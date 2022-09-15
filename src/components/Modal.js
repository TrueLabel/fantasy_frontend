import {useState} from 'react'

const Modal = (props) => {
  const arr20 = Array.from(Array(20), (_, index) => index + 1);
  let [numOfPlayerOptions, setNumOfPlayerOptions] = useState(arr20)
  let [newTeamForm, setNewTeamForm] = useState({teamName: '', numOfTeams: null, draftPosition: null})


  const handleChangeTeamForm = (event) => {
    setNewTeamForm({ ...newTeamForm, [event.target.name]: event.target.value })
  }

  const handleSubmitForm = (event) => {
    event.preventDefault()
    props.handleSubmitModalForm(newTeamForm)
    setNewTeamForm({teamName: '', numOfTeams: null, draftPosition: null})
  }

  const closeModal = () => {
    document.getElementById('modal').style.display = 'none'
  }

  return (
    <div id='modal'>
      <div id='modal-text' >
        <button onClick={() => {closeModal()}}>Close</button>
        <h1>New Team Modal</h1>
        <form onSubmit={handleSubmitForm}>
          <label htmlFor="teamName">Team Name: </label>
          <input type="text" name="teamName" onChange={handleChangeTeamForm}/>
          <br />
          <br />

          <input type="submit"/>
        </form>
      </div>
    </div>
  )
}

export default Modal

//REMOVED DROPDOWNS
// <label htmlFor="numOfTeams">Number of Teams In League: </label>
// <select name='numOfTeams' id='numOfTeams' onChange={handleChangeTeamForm}>
//   {numOfPlayerOptions.map((num) => {
//     return (
//       <option value={num}>{num}</option>
//     )
//   })}
// </select>
// <label htmlFor="draftPosition">Draft Position: </label>
// <select name='draftPosition' id='draftPosition' onChange={handleChangeTeamForm}>
//   {numOfPlayerOptions.map((num) => {
//     return (
//       <option value={num}>{num}</option>
//     )
//   })}
// </select>
