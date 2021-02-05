import React from 'react'
import ReactDom from 'react-dom'

const DIMMED_BG_STYLES = {
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'rgba(0,0,0,.7)',
	zIndex: 1000
}

const Modal = ({form, handleChange, open, onClose, children}) => {
	console.log(open)
	if (!open) return null
	return ReactDom.createPortal(
		<>
			<div className="modal-overlay">
				<div className="modal">
					<h2>New Battle Pass tracking</h2>

					<table class="form-table">
						<tr>
							<td><label htmlFor="name">Tracker name</label></td>
							<td><input type="text" name="name" value={form.name} onChange={handleChange}></input> <br/></td>
						</tr>
						<tr>
							<td><label htmlFor="start">Start date</label></td>
							<td><input type="date" name="start" value={form.start} onChange={handleChange}/> <br/></td>
						</tr>
						<tr>
							<td><label htmlFor="end">End date</label></td>
							<td><input type="date" name="end" value={form.end} onChange={handleChange}/></td>
						</tr>
					</table>

					<div className="buttons-container">	
						<button>Save</button>
						<button onClick={onClose}>Cancel</button>
					</div>
				</div>
			</div>
		</>,
		document.getElementById('portal')
	)
}

export default Modal
 