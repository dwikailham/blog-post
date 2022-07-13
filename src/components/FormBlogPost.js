import React from 'react'

export default function FormBlogPost({ handleSubmit, onChange, valueTitle, valueBody }) {
    return (
        <div className='note-app__body'>
            <div className='note-input'>
                <h2>Create Blog</h2>
                <input
                    name="title"
                    id="title"
                    type="text"
                    placeholder='Title'
                    value={valueTitle}
                    className='note-input__title'
                    maxLength={50}
                    onChange={onChange}
                />
                <textarea
                    name="body"
                    id="body"
                    type="text"
                    placeholder='Your Story'
                    className='note-input__body'
                    value={valueBody}
                    onChange={onChange}
                />
                <button type='submit' onClick={handleSubmit}> Add</button>
            </div>
        </div>
    )
}
