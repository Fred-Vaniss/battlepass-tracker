import React from 'react'

const ProgressBar = props => {

  const dates = {
    start: new Date("02/03/2021"),
    current: new Date(),
    end: new Date("05/04/2021")
  }

  let timeLeft = Math.round((dates.end - dates.current) / (1000 * 3600 * 24))
  let timeElapsed = Math.round((dates.current - dates.start) / (1000 * 3600 * 24))

  let level = props.level

  let levelPcnt = level/110*100
  let daysPcnt = (timeElapsed/90*100)


  console.log(timeElapsed)

  console.log(dates)

  return (
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
  )
}


export default ProgressBar;