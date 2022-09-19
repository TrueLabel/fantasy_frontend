import '../App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

import Modal from '../components/Modal'
import PlayerName from '../components/PlayerName'
import Footer from '../components/Footer'

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
  // let [playerInfo, setPlayerInfo] = useState()



  //VARIABLES
  // const position = Number(props.newTeamForm.draftPosition)
  // console.log(position, 'position');
  // let numOfTeams = Number(props.newTeamForm.numOfTeams)
  // //console.log(numOfTeams, 'numOfTeams');
  // let round = 1

  //FUNCTIONS
  const getPlayersAPI = (start) => {
    console.log(start, typeof start, 'start');
    axios.get('https://api.sportsdata.io/v3/nfl/stats/json/FantasyPlayers?key=458e4d8b7fd847348de5b8891eedc940')
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
    // console.log(event.target.value);
    // getPlayerInfo(event.target.value)
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

  // const getPlayerInfo = (playerIdNumber) => {
  //   axios.get('https://api.sportsdata.io/v3/nfl/projections/json/PlayerSeasonProjectionStatsByPlayerID/2022REG/' + playerIdNumber + '?key=c2d4f67c78294cd4a5ef2cdf2a957a31')
  //   .then((response) => {
  //     //console.log(response.data);
  //     setPlayerInfo(response.data)
  //   })
  // }

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
      <h1 className='add-title'>{newTeam.name}</h1>
      <h2>Pick Your Players!</h2>
      <div className='new-drafted-container'>
        {newTeam.players.split(',').map((playerId) => {
          return(
            <div className='new-drafted-item'>
              <PlayerName playerId={playerId} />
            </div>
          )
        })}
      </div>
      <div className='addteam-button-container'>
        <button className='addteam-confirm' onClick={handleSubmitNewTeam}>Submit Team</button>
        <button className='addteam-cancel' onClick={handleCancelNewTeam}>Cancel Draft</button>
      </div>
      <table className='addteam-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Points</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
        {playersAPI.map((player,index) => {
          return (
            <tr key={player.PlayerID} className='add-player-row'>
              <td>{player.Name}</td>
              <td>{player.Position}</td>
              <td>{player.ProjectedFantasyPoints}</td>
              <td>{player.Team}</td>
              <td>
                <button className='add-player-btn' onClick={addPlayerString} value={player.PlayerID}>Draft
                </button>
              </td>
            </tr>
          )
        })}
        </tbody>

      </table>
      <Footer />
    </div>
  )
}

export default AddTeam

// <div>
//   <li>Jonathan Taylor, RB, Colts</li>
//   <li>Josh Allen, QB, Bills</li>
//   <li>Texans, DEF, Texans</li>
// </div>
