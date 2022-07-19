import React, { useState, useEffect } from 'react'
import {
  Radio,
  // Button
} from 'antd'
import 'antd/dist/antd.css';
import './style.css';

// 传入数据
const SlideBtn = (props) => {
  // 容器的宽度
  const [subWidth, setSubWidth] = useState(0)
  const fatherwidth = 500
  // 子容器
  const subcon = document.querySelector(".sub-container")
  const { data } = props
  const [slideData, setSlideData] = useState(data)
  const computeWidth = () => {
    let width = 0
    const btns = document.querySelectorAll(".radiobtn")
    btns.forEach(btn => {
      width += btn.offsetWidth
    })
    return width
  }

  const handleMove = (e) => {
    // console.log(subcon)
    // 容器的偏移量
    const offsetLeft = Number(subcon?.style?.left.slice(0, -2))
    // 左右箭头
    const leftArrow = document.querySelector('#left')
    const rightArrow = document.querySelector('#right')
    if (e.target.id === 'left') {
      // 点击左箭头，向右移动
      subcon.style.left = (offsetLeft + fatherwidth) + 'px'
      console.log(subcon.style.left)
      if (Number(subcon.style.left.slice(0, -2)) >= 0) {
        leftArrow.style.display = 'none'
        if (subWidth > fatherwidth) {
          rightArrow.style.display = 'block'
        }
      } else {
        rightArrow.style.display = 'block'
      }
      
    } else {
      subcon.style.left = (offsetLeft - fatherwidth) + 'px'
      if (offsetLeft - fatherwidth <= 0) {
        leftArrow.style.display = 'block'
      }
      if ( offsetLeft + 2 * fatherwidth >= subWidth) {
        rightArrow.style.display = 'none'
      }
    }
  }

  useEffect(() => {
    // 计算子容器的宽度，设置宽度
    setSubWidth(computeWidth())
  }, [])

  useEffect(() => {
  }, [subWidth])


  return (
    <div className="container">
      <button className="left-arrow" id='left' onClick={handleMove}>&lt;</button>
      {
        (subWidth > fatherwidth) && <button className="right-arrow" id='right' onClick={handleMove}>&gt;</button>
      }
      <div className="sub-container" style={{ width: subWidth }}>

        <Radio.Group
          name="slidebtn"
          optionType="button"
          buttonStyle="solid"
          defaultValue={slideData[0].id}
          onChange={key => console.log("选中的按钮的key为：", key)}>
          {
            slideData.map(item =>
              <Radio value={item.id} className="radiobtn" style={{ marginRight: '20px' }}>{item.text}</Radio>
            )
          }
        </Radio.Group>

      </div>
    </div>
  )
}

export default SlideBtn