import {useState, useEffect} from 'react'
import axios from 'axios'

const PlayerInfo = (props) => {
  let [playerInfo, setPlayerInfo] = useState([])
  // let [defenseInfo, setDefenseInfo] = useState([])
  //
  // const getDefenseInfo = () => {
  //   console.log('why');
  //   //console.log(defenseInfo);
  //   defenseInfo.map((team) => {
  //     //console.log('how');
  //     //console.log(team)
  //     //console.log(team.PlayerID, props.playerId, 'defense')
  //     if (team.PlayerID === Number(props.playerId)) {
  //       setPlayerInfo(team)
  //     }
  //   })
  // }

  const getPlayerInfo = () => {
    //console.log(props.playerId.length, 'key');
    props.playerId.length > 4 ?
      axios.get('https://api.sportsdata.io/v3/nfl/projections/json/PlayerSeasonProjectionStatsByPlayerID/2022REG/' + props.playerId + '?key=458e4d8b7fd847348de5b8891eedc940')
      .then((response) => {
        //console.log(response.data);
        setPlayerInfo(response.data)
      })
        :
      //console.log(props.playerId);
      axios.get('https://api.sportsdata.io/v3/nfl/stats/json/FantasyDefenseBySeason/2022REG?key=458e4d8b7fd847348de5b8891eedc940')
      .then((response) => {
        //console.log(response.data);
        response.data.map((team) => {
          console.log(team.PlayerID, props.playerId);
          if (team.PlayerID === Number(props.playerId)) {
            setPlayerInfo(team)
          }
        })
      })
  }



  useEffect(() => {
    getPlayerInfo()
  }, [])

  return (
    <tr key={playerInfo.playerID}>
      {props.playerId.length > 4 ?
        <td>{playerInfo.Name}</td>
        :
        <td>{playerInfo.Team}</td>
      }
      {props.playerId.length > 4 ?
        <td>{playerInfo.Position}</td>
        :
        <td>Defense</td>
      }
      <td>{playerInfo.Team}</td>
      <td>{playerInfo.FantasyPoints}</td>
    </tr>
  )
}

export default PlayerInfo


// <div>
//   {props.playerId.length > 4 ?
//     <tr key={playerInfo.playerID}>
//       <td>{playerInfo.Name}</td>
//       <td>{playerInfo.Position}</td>
//       <td>{playerInfo.Team}</td>
//       <td>{playerInfo.FantasyPoints}</td>
//     </tr>
//       :
//     <tr key={playerInfo.playerID}>
//       <td>{playerInfo.Team}</td>
//       <td>Defense</td>
//       <td>{playerInfo.Team}</td>
//       <td>{playerInfo.FantasyPoints}</td>
//     </tr>
//   }
// </div>
