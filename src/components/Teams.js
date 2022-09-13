

const Teams = (props) => {
  return (
    <div>
      <h2>Teams: </h2>
      {props.teams.map((team) => {
        return (
          <div key={team.id}>
            Name: {team.name}, Players: {team.players}
            <button onClick={props.handleDeleteTeam} value={team.id}>Delete Team</button>

          </div>
        )
      })}
    </div>
  )
}

export default Teams
