import React from 'react'

export default function ItemButton({ remove, update, data }) {
    return (
        <div className='note-item__action'>
            <button className='note-item__archive-button' onClick={() => update(data)} >Edit</button>
            <button className='note-item__delete-button' onClick={() => remove(data.id)} >Delete</button>
        </div>
    )
}
