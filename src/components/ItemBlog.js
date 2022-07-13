import React from 'react'
import ItemContent from './ItemContent'
import ItemButton from './ItemButton'

export default function ItemBlog({ title, body, remove, update, data }) {
    return (
        <div className='note-item'>
            <ItemContent title={title} body={body} />
            <ItemButton data={data} remove={remove} update={update} />
        </div>
    )
}
