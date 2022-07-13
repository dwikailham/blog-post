import React from 'react'
import { Empty } from 'antd';
import ItemBlog from './ItemBlog'

export default function ListBlogPost({ blogPost, remove, update, searchTitle }) {

    const renderComponent = blogPost.filter(el =>
        el.title.toLowerCase().includes(searchTitle)
    )

    return (
        <>
            {
                renderComponent.length > 0 ?

                    <div className='notes-list'>
                        {
                            renderComponent.map((el) => (
                                <ItemBlog
                                    key={el.id}
                                    id={el.id}
                                    {...el}
                                    data={el}
                                    remove={remove}
                                    update={update}
                                />
                            ))
                        }
                    </div>
                    :
                    <div className='notes-list__empty-message'><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>
            }
        </>
    )
}
