import '../App.scss';
import {useState, useEffect} from 'react'
import axios from 'axios'



const AddTeam = (props) => {
  //STATES
  
  let [playersAPI, setPlayersAPI] = useState([])
  let [newTeam, setNewTeam] = useState({name: '', players: ''})
  let [pickedPlayersString, setPickedPlayersString] = useState('')
  let [draftPosition, setDraftPosition] = useState(0)
  //console.log(typeof Number(props.newTeamForm.draftPosition), 'draft')
  let [numOfTeams, setNumOfTeams] = useState(12)
  //console.log(props.newTeamForm.teamName);
  let [round, setRound] = useState(1)
let [playersAPITicker,setPlayersAPITicker] = useState([])





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
      setPlayersAPITicker(response.data.slice(start, start + 50))
    })
  }

  // const handleChangeNewTeam = (event) => {
  //   setNewTeam({ ...newTeam, [event.target.name]: event.target.value })
  // }


  const addPlayerString = (event) => {
    // console.log(event.target.value);
    // console.log(newTeam.players);
    newTeam.players.length > 1 ?
      setNewTeam({name: props.newTeamForm.teamName, players: newTeam.players + ',' + event.target.value})
      //setPickedPlayersString(pickedPlayersString + ', ' + event.target.value)
        :
      setNewTeam({name: props.newTeamForm.teamName, players: event.target.value})
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

  const handleSubmitNewTeam = (event) => {
    event.preventDefault()
    props.handleCreateTeam(newTeam)
    setNewTeam({name: '', players: ''})
    document.getElementById('addteam').classList.toggle('showhide');
    document.getElementById('modal').style.display = 'none'
  }

  const handleCancelNewTeam = (event) => {
    event.preventDefault()
    setNewTeam({name: '', players: ''})
    document.getElementById('addteam').classList.toggle('showhide');
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
  }, [])

  return (
  
    <div className='showhide' id='addteam'>

      <h4>Add Team Component</h4>
      Current players on team:
      {newTeam.players}
      <button className='Glass' onClick={handleSubmitNewTeam}>Submit Team</button>
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
      <div class="ticker-wrap">
      <div class="ticker">
{playersAPITicker.map((playerAPI,index) =>{

return(
  
  <div className="ticker__item" key={index}>{playerAPI.Name} ({playerAPI.Team})   ({playerAPI.ProjectedFantasyPoints})</div>
  
)

})}
</div>
</div>


    </div>
    
  )
}

export default AddTeam
