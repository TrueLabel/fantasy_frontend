import '../App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

import Modal from '../components/Modal'
import PlayerName from '../components/PlayerName'

const AddTeam = (props) => {
  //STATES
  let [playersAPI, setPlayersAPI] = useState([])
  let [newTeam, setNewTeam] = useState({name: '', players: ''})
  let [pickedPlayersString, setPickedPlayersString] = useState('')
  let [draftPosition, setDraftPosition] = useState(0)
  //console.log(typeof Number(props.newTeamForm.draftPosition), 'draft')
  //console.log(draftPosition);
  let [numOfTeams, setNumOfTeams] = useState(12)
  //console.log(props.newTeamForm.teamName);
  //let [round, setRound] = useState(1)

  //VARIABLES
  // const position = Number(props.newTeamForm.draftPosition)
  // console.log(position, 'position');
  // let numOfTeams = Number(props.newTeamForm.numOfTeams)
  // //console.log(numOfTeams, 'numOfTeams');
  // let round = 1

  //FUNCTIONS
  const getPlayersAPI = (start) => {
    //console.log(start, typeof start, 'start');
    axios.get('https://api.sportsdata.io/v3/nfl/stats/json/FantasyPlayers?key=c2d4f67c78294cd4a5ef2cdf2a957a31')
    .then((response) => {
      //setPlayersAPI(response.data.slice(3, 6))
      setPlayersAPI(response.data.slice(start, start + 10))
    })
  }

  // const handleChangeNewTeam = (event) => {
  //   setNewTeam({ ...newTeam, [event.target.name]: event.target.value })
  // }


  const addPlayerString = (event) => {
    // console.log(event.target.value);
    // console.log(newTeam.players);
    newTeam.players.length > 1 ?
      setNewTeam({name: newTeam.name, players: newTeam.players + ',' + event.target.value})
      //setPickedPlayersString(pickedPlayersString + ', ' + event.target.value)
        :
      setNewTeam({name: newTeam.name, players: event.target.value})
      //setPickedPlayersString(event.target.value)

    // console.log(numOfTeams, 'num');
    // console.log(draftPosition, 'position');
    // let nextPosition = draftPosition + numOfTeams
    // console.log(nextPosition, 'sum');
    setDraftPosition(draftPosition += numOfTeams)
    //console.log(draftPosition, 'position after');
    getPlayersAPI(draftPosition)
  }

  // const updateString = () => {
  //   setNewTeam({name: teamName, players: pickedPlayersString})
  //   console.log(newTeam);
  // }


// TODO:
  const handleSubmitNewTeam = (event) => {
    event.preventDefault()
    props.handleCreateTeam(newTeam)
    setDraftPosition(0)
    getPlayersAPI(0)
    setNewTeam({name: '', players: ''})
    document.getElementById('addteam').classList.toggle('showhide');
  }

  // TODO:
  const handleCancelNewTeam = (event) => {
    event.preventDefault()
    setDraftPosition(0)
    getPlayersAPI(0)
    setNewTeam({name: '', players: ''})
    document.getElementById('addteam').classList.toggle('showhide');
    document.getElementById('modal').style.display = 'none'
  }

  // const closeModal = () => {
  //   document.getElementById('modal').style.display = 'none'
  //   document.getElementById('addteam').classList.toggle('showhide');
  // }
  // PASS IT IN closeModal={closeModal}

  const handleSubmitModal = (teamData) => {
    console.log(teamData);
    setNewTeam(teamData)
    document.getElementById('modal').style.display = 'none'
  }


  // useEffect(() => {
  //   setDraftPosition(Number(props.newTeamForm.draftPosition) )
  //   setNumOfTeams(Number(props.newTeamForm.numOfTeams))
  //   return () => {
  //     getPlayersAPI(draftPosition)
  //   }
  // }, [])

  useEffect(() => {
    getPlayersAPI(draftPosition)
    //console.log(draftPosition);
  }, [])

  return (
    <div className='showhide' id='addteam'>
      <Modal  handleCancelNewTeam={handleCancelNewTeam} handleSubmitModal={handleSubmitModal}/>
      <h4>Add Team Component</h4>
      {newTeam.name}
      {newTeam.players.split(',').map((playerId) => {
        return(
          <ul>
            <PlayerName playerId={playerId} />
          </ul>
        )
      })}
      <button onClick={handleSubmitNewTeam}>Submit Team</button>
      <button onClick={handleCancelNewTeam}>Cancel</button>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Position</td>
            <td>Points</td>
            <td>Team</td>
          </tr>
        </thead>
        <tbody>
        {playersAPI.map((player,index) => {
          return (
            <tr key={player.PlayerID}>
              <td>{player.Name}</td>
              <td>{player.Position}</td>
              <td>{player.ProjectedFantasyPoints}</td>
              <td>{player.Team}</td>
              <td>
                <button onClick={addPlayerString} value={player.PlayerID}>Add
                </button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>

    </div>
  )
}

export default AddTeam
