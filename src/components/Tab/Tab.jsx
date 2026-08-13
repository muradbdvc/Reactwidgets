import React from 'react'
import data from './../../data/food.json'
import './tab.scss'
const Tab = () => {
  return (
    <div>
        <div className="tab grid grid-template-rows">
          {data.map((post)=>(<div><a href="#">{post.category}</a></div>))}
        </div>
        <div className='food-cards grid grid-cols-3 gap-4 w-full bg-gray-400'>
            {data.map((post)=>(
                <div
                  key={post.id}
                  className="food-card rounded-lg shadow-lg overflow-hidden bg-white"
                >
                <img src={post.image} alt={post.title} />
                <a href='#'>{post.title}</a>
                <p>{post.category}</p>
                </div>
            ))}        
        </div>
    </div>
  )
}

export default Tab