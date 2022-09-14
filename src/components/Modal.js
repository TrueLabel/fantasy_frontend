import {useState} from 'react'

const Modal = (props) => {
  const arr20 = Array.from(Array(20), (_, index) => index + 1);
  let [numOfPlayerOptions, setNumOfPlayerOptions] = useState(arr20)
  let [newModalForm, setNewModalForm] = useState()

  // for (let i = 0; i < 20; i = i + 1) {
  //   console.log(i);
  //   //setNumOfPlayerOptions(...numOfPlayerOptions, i)
  // }
  // setNumOfPlayerOptions(1,2,3,4,5)
  // console.log(numOfPlayerOptions);



  const closeModal = () => {
    document.getElementById('modal').style.display = 'none'
  }

  return (
    <div id='modal'>
      <form>
        <h1>New Team Modal</h1>
        <label htmlFor="name">Team Name: </label>
        <input type="text" name="name" />
        <br />
        <br />
        <label htmlFor="numOfTeams">Number of Teams In League: </label>
        <select name='numOfTeams' id='numOfTeams'>
          {numOfPlayerOptions.map((num) => {
            return (
              <option value={num}>{num}</option>
            )
          })}
        </select>
        <label htmlFor="draftPosition">Draft Position: </label>
        <select name='draftPosition' id='draftPosition'>
          {numOfPlayerOptions.map((num) => {
            return (
              <option value={num}>{num}</option>
            )
          })}
        </select>
        <input type="submit"/>
        <button onClick={() => {closeModal()}}>Close</button>
      </form>
    </div>
  )
}

export default Modal
