import React from 'react'

export default function HeaderBlogPost({ onSearch }) {
  return (
    <div className='note-app__header'>
      <h1>BlogPost</h1>
      <div className='note-search'>
        <input type="text" placeholder='Search blog post...' onChange={onSearch} />
      </div>
    </div>
  )
}
