import React, {useState} from 'react'

const ProgressBar = ({data, handleChange}) => {

  const [level, setLevel] = useState(data.level)

  const dates = {
    start: new Date(data.start),
    current: new Date(),
    end: new Date(data.end)
  }

  let timeLeft = Math.round((dates.end - dates.current) / (1000 * 3600 * 24))
  let timeElapsed = Math.round((dates.current - dates.start) / (1000 * 3600 * 24))
  let passDuration = Math.round((dates.end - dates.start) / (1000 * 3600 * 24))
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

    console.log(id)
    handleChange(id, newLevel)
  }

  return (
    <>
      <div className="level-form">
        <h2>{data.name}: </h2>
        <input  type="number"
                name="level"
                value={level}
                onChange={changeLevel}
                />
      </div>
      <div className="progress-container">
        <span className="dates">{dates.start.toLocaleString('default', {day:"numeric", month: 'long'})}</span>
        <div className="progress bg">
          <div className="progress-days" style={{left: daysPcnt+"%"}}>
            <span>{timeLeft} day(s)</span>
            <div className="measure"></div>
          </div>
          <div className={`progress bar ${levelPcnt < daysPcnt ? "late" : "early"}`} style={{width: levelPcnt+"%"}}></div>
        </div>
        <span className="dates">{dates.end.toLocaleString('default', {day:"numeric", month: 'long'})}</span>
      </div>
    </>
  )
}


export default ProgressBar;