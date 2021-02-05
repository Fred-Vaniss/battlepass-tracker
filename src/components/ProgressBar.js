import React from 'react'

const ProgressBar = props => {

  const dates = {
    start: new Date(props.start),
    current: new Date(),
    end: new Date(props.end)
  }

  let timeLeft = Math.round((dates.end - dates.current) / (1000 * 3600 * 24))
  let timeElapsed = Math.round((dates.current - dates.start) / (1000 * 3600 * 24))

  let level = props.level

  const clamp = (num, min, max) => {
    return num <= min ? min : num >= max ? max : num;
  }

  let levelPcnt = clamp(level/110*100,0,100)
  let daysPcnt = clamp(timeElapsed/90*100,0,100)


  console.log(timeElapsed)

  console.log(dates)

  return (
    <>
      <div className="level-form">
          <label htmlFor="level">Battlepass level: </label>
          <input  type="number"
                  name="level"
                  value="0"
                  />
      </div>
      <div className="progress-container">
        <span className="dates">{dates.start.toLocaleString('default', {day:"numeric", month: 'long'})}</span>
        <div className="progress bg">
          <div className="progress-days" style={{left: daysPcnt+"%"}}>
            <span>{timeLeft} jours</span>
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