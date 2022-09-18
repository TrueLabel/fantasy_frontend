import {useState, useEffect} from 'react'
import axios from 'axios'

import PlayerInfo from '../components/PlayerInfo'

const Teams = (props) => {


  return (
    <div id='teams-container'>
      <h2>Teams </h2>
      {props.teams.map((team) => {
        return (
          <div key={team.id}>
            <h4 className='teams-teamname'>{team.name}</h4>
            <table className='teams-table'>
              <thead>
                <tr className='teams-rowhead'>
                  <td>Name</td>
                  <td>Position </td>
                  <td>Team </td>
                  <td>Points </td>
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


            <button className='team-delete-btn' onClick={props.handleDeleteTeam} value={team.id}>Delete Team</button>
          </div>
        )
      })}
    </div>
  )
}

export default Teams
