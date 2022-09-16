import {useState, useEffect} from 'react'
import axios from 'axios'

import PlayerInfo from '../components/PlayerInfo'

const Teams = (props) => {


  return (
    <div>
      <h2>Teams: </h2>
      {props.teams.map((team) => {
        return (
          <div key={team.id}>
            <div>Team Name: {team.name} </div>
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Position</td>
                  <td>Team</td>
                  <td>Points</td>
                </tr>
              </thead>
              <tbody>
                {team.players.split(',').map((playerId) => {
                  return (
                      <PlayerInfo playerId={playerId}/>
                  )
                })}
              </tbody>

            </table>


            <button onClick={props.handleDeleteTeam} value={team.id}>Delete Team</button>
          </div>
        )
      })}
    </div>
  )
}

export default Teams
