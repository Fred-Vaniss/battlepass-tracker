import React from 'react'
import ReactDom from 'react-dom'

const Modal = ({form, handleChange, open, onClose, onSave, children}) => {
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
						<tr>
							<td><label htmlFor="goal">Level goal</label></td>
							<td><input type="number" name="goal" value={form.goal} onChange={handleChange}/></td>
						</tr>
					</table>

					<div className="modal-buttons-container">	
						<button onClick={onSave}>Save</button>
						<button onClick={onClose}>Cancel</button>
					</div>
				</div>
			</div>
		</>,
		document.getElementById('portal')
	)
}

export default Modal
 