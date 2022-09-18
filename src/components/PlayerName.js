import {useState, useEffect} from 'react'
import axios from 'axios'

const PlayerName = (props) => {
  let [playerInfo, setPlayerInfo] = useState({Name: 'Name', Position: 'Position', Team: 'Team'})
  // Name: 'Name', Position: 'Position', Team: 'Team'

  const getPlayerInfo = () => {
    // console.log(props.playerId);
    axios.get('https://api.sportsdata.io/v3/nfl/projections/json/PlayerSeasonProjectionStatsByPlayerID/2022REG/' + props.playerId + '?key=458e4d8b7fd847348de5b8891eedc940')
    .then((response) => {
      //console.log(response.data);
      setPlayerInfo(response.data)
    })
  }
  getPlayerInfo()

  // useEffect(() => {
  //   console.log(props.playerId);
  //   getPlayerInfo()
  // })

  // function isEmpty(obj) {
  //   return Object.keys(obj).length !== 0
  // }

  return (
    <div>
        <li>{playerInfo.Name}, {playerInfo.Position}, {playerInfo.Team}</li>
    </div>
  )
}

export default PlayerName
