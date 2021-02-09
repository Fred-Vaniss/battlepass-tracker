import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faTrash, faEdit, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

const ProgressBar = ({data, handleChange, editButton, deleteButton, moveButton, position}) => {
  const [deleted, setDeleted] = useState(false)
  const [level, setLevel] = useState(data.level)

  const time = data.time || "00:00"

  const dates = {
    start: new Date(`${data.start}T${time}`),
    current: new Date(),
    end: new Date(`${data.end}T${time}`)
  }
  
  let daysLeft = Math.floor((dates.end - dates.current) / (1000 * 3600 * 24))
  let hoursLeft = Math.floor((dates.end - dates.current) / (1000*60*60))
  let timeElapsed = Math.floor((dates.current - dates.start))
  let passDuration = Math.floor((dates.end - dates.start))
  let passGoal = data.goal
  
  let early = 0

  if (dates.current < dates.start) {
    early = (dates.start - dates.current)
  }

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

  const changeButton = e => {
    const id = data.id
    const operation = e.currentTarget.getAttribute('data-operation')
    let newLevel = parseInt(level)
    const increment = parseInt(data.increment) || 1

    operation === "plus" ? newLevel=newLevel+increment : newLevel=newLevel-increment

    setLevel(newLevel)
    handleChange(id, newLevel)
  }

  const prepareMove = e => {
    const id = data.id
    const direction = e.currentTarget.getAttribute('data-direction')

    moveButton(id, direction)
  }

  const ProgressContent = () => {

    if (dates.start > dates.end) {
      return <div className="progress-notice"><p>ERROR: The start date is higher than end date.</p></div>
    }

    if (Number.isNaN(dates.start/1000) || Number.isNaN(dates.end/1000)){
      return <div className="progress-notice"><p>ERROR: The entered date is invalid.</p></div>
    }

    if (passGoal <= 0) {
      return <div className="progress-notice"><p>ERROR: The defined goal is invalid.</p></div>
    }

    if (early === 0 && daysLeft >= 0) {
      const timeLeft = hoursLeft >= 24 ? <span>{daysLeft} day(s)</span> : <span>{hoursLeft} hours(s)</span>

      return(
        <>
          <div className="progress-days" style={{left: daysPcnt+"%"}}>
            {timeLeft}
            <div className="measure"></div>
          </div>
          <div className="progress-buttons">
            <button data-operation="minus" onClick={changeButton} title="Decrement"><FontAwesomeIcon icon={faMinus}/></button>
            <button data-operation="plus" onClick={changeButton} title="Increment"><FontAwesomeIcon icon={faPlus}/></button>
          </div>
        </>
      )
    } else if (early >= 1) {
      const daysEarly = Math.floor(early / (1000 * 3600 * 24))
      const hoursEarly = Math.floor(early / (1000 * 60 * 60))
      const earlyMessage = hoursEarly <= 24 ? <p>This event start in {hoursEarly} hours(s)</p> : <p>This event start in {daysEarly} day(s)</p>

      return <div className="progress-notice">{earlyMessage}</div>
    } else if (daysLeft < 0) {
      const timeElapsed = hoursLeft >= -24 ? <p>This event ended {-hoursLeft-1} hours(s) ago</p> : <p>This event ended {-daysLeft-1} days(s) ago</p>
      return <div className="progress-notice">{timeElapsed}</div>
    } else {
      return <div className="progress-notice"><p>An unknown error has occured</p></div>
    }
  }

  const MoveButtons = () => {
    const moveUp = <button data-direction="up" onClick={prepareMove} title="Move tracker up"><FontAwesomeIcon icon={faAngleUp}/></button>
    const moveDown = <button data-direction="down" onClick={prepareMove} title="Move tracker down"><FontAwesomeIcon icon={faAngleDown}/></button>
    if (position === "alone") {
      return null
    } else if (position === "first") {
      return moveDown
    } else if (position === "last") {
      return moveUp
    } else {
      return(
        <>
          {moveUp}
          {moveDown}
        </>
      )
    }
  }

  if (deleted === true) return null

  return (
    <div className="tracker">
      <div className="level-form">
        <h2>{data.name}: </h2>
        <input  type="number"
                name="level"
                value={level}
                onChange={changeLevel} 
                style={{width: 0.60 * passGoal.toString().length + "em"}}
                />
        <h2>/{data.goal}</h2>
        <div className="buttons-container right">
          <button onClick={prepareDelete} title="Delete tracker"><FontAwesomeIcon icon={faTrash}/></button>
          <button onClick={prepareEdit} title="Edit tracker"><FontAwesomeIcon icon={faEdit}/></button>
        </div>
        <div className="buttons-container left">
          <MoveButtons/>
        </div>
      </div>
      <div className="progress-container">
        <span className="dates left">{dates.start.toLocaleString('default', {day:"numeric", month: 'long'})}</span>
        <div className="progress bg">
          <ProgressContent/>
          <div className={`progress bar${levelPcnt < daysPcnt ? " late" : levelPcnt === 100 ? " finished" : ""}`} style={{width: levelPcnt+"%"}}></div>
        </div>
        <span className="dates">{dates.end.toLocaleString('default', {day:"numeric", month: 'long'})}</span>
      </div>
    </div>
  )
}


export default ProgressBar;