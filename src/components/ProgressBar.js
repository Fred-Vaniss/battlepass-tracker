import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faTrash, faEdit, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

const ProgressBar = ({data, handleChange, editButton, deleteButton, moveButton, position}) => {
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

  const changeButton = e => {
    const id = data.id
    const operation = e.currentTarget.getAttribute('data-operation')
    let newLevel = level

    operation === "plus" ? newLevel++ : newLevel--

    setLevel(newLevel)
    handleChange(id, newLevel)
  }

  const prepareMove = e => {
    const id = data.id
    const direction = e.currentTarget.getAttribute('data-direction')

    moveButton(id, direction)
  }

  const moveButtons = () => {
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
                />
        <h2>/{data.goal}</h2>
        <div className="buttons-container right">
          <button onClick={prepareDelete} title="Delete tracker"><FontAwesomeIcon icon={faTrash}/></button>
          <button onClick={prepareEdit} title="Edit tracker"><FontAwesomeIcon icon={faEdit}/></button>
        </div>
        <div className="buttons-container left">
          {moveButtons()}
        </div>
      </div>
      <div className="progress-container">
        <span className="dates left">{dates.start.toLocaleString('default', {day:"numeric", month: 'long'})}</span>
        <div className="progress bg">
          <div className="progress-days" style={{left: daysPcnt+"%"}}>
            <span>{timeLeft} day(s)</span>
            <div className="measure"></div>
          </div>
          <div className="progress-buttons">
            <button data-operation="minus" onClick={changeButton} title="Decrement"><FontAwesomeIcon icon={faMinus}/></button>
            <button data-operation="plus" onClick={changeButton} title="Increment"><FontAwesomeIcon icon={faPlus}/></button>
          </div>
          <div className={`progress bar ${levelPcnt < daysPcnt ? "late" : levelPcnt === 100 ? "finished" : ""}`} style={{width: levelPcnt+"%"}}></div>
        </div>
        <span className="dates">{dates.end.toLocaleString('default', {day:"numeric", month: 'long'})}</span>
      </div>
    </div>
  )
}


export default ProgressBar;