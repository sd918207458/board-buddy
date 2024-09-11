import React from 'react'
import style from "./sidebar.module.css"

const Sidebar = () => {
  return (
    <div>
      <div className={`join join-vertical w-full bg-primary ${style.button}`}>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" defaultChecked />
    <div className="collapse-title text-xl font-medium">熱門遊戲</div>
    <div className="collapse-content">
      <p>大富翁</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">策略遊戲</div>
    <div className="collapse-content">
      <p>阿瓦隆</p>
      <button className={style.button}>click me</button>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">多人遊戲</div>
    <div className="collapse-content">
      <p>UNO</p>
    </div>
  </div>
</div>
    </div>
  )
}

export default Sidebar