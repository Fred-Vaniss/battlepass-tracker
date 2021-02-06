import React, {useState} from 'react'

const ProgressBar = ({data, handleChange, editButton, deleteButton}) => {

  const [deleted, setDeleted] = useState(false)

  const [level, setLevel] = useState(data.level)

  const dates = {
    start: new Date(data.start),
    current: new Date(),
    end: new Date(data.end)
  }

  let timeLeft = Math.ceil((dates.end - dates.current) / (1000 * 3600 * 24))
  let timeElapsed = Math.ceil((dates.current - dates.start) / (1000 * 3600 * 24))
  let passDuration = Math.ceil((dates.end - dates.start) / (1000 * 3600 * 24))
  let passGoal = data.goal

  const clamp = (num, min, max) => {
    return num <= min ? min : num >= max ? max : num;
  }

  let levelPcnt = clamp(level/passGoal*100,0,100)
  let daysPcnt = clamp(timeElapsed/passDuration*100,0,100)

  const changeLevel = e => {
    const id = data.id
    const newLevel = e.target.value
    setLevel(newLevel)

    handleChange(id, newLevel)
  }

  const prepareEdit = () => {
    const id = data.id

    editButton(id)
  }

  const prepareDelete = () => {
    const id = data.id

    deleteButton(id)
    setDeleted(true)
  }

  if (deleted === true) return null

  return (
    <div class="tracker">
      <span class="id-debug">{`ID: ${data.id}`}</span>
      <div className="level-form">
        <h2>{data.name}: </h2>
        <input  type="number"
                name="level"
                value={level}
                onChange={changeLevel}
                />
        <h2>/{data.goal}</h2>
        <div className="buttons-container">
          <button onClick={prepareDelete}>Delete</button>
          <button onClick={prepareEdit}>Edit</button>
        </div>
      </div>
      <div className="progress-container">
        <span className="dates left">{dates.start.toLocaleString('default', {day:"numeric", month: 'long'})}</span>
        <div className="progress bg">
          <div className="progress-days" style={{left: daysPcnt+"%"}}>
            <span>{timeLeft} day(s)</span>
            <div className="measure"></div>
          </div>
          <div className={`progress bar ${levelPcnt < daysPcnt ? "late" : levelPcnt === 100 ? "finished" : ""}`} style={{width: levelPcnt+"%"}}></div>
        </div>
        <span className="dates">{dates.end.toLocaleString('default', {day:"numeric", month: 'long'})}</span>
      </div>
    </div>
  )
}


export default ProgressBar;