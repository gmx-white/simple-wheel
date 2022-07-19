import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import { menu } from './datamap'
import './style.less'

const { TabPane } = Tabs
const CeilingTab = () => {
  const [activeSecMenu, setActiveSecMenu] = useState('1') // 激活菜单的key

  // 切换菜单
  const handleSecMenu = () => {}
  return (
    <div className="ceilingtab">
      <Tabs defaultActiveKey={activeSecMenu} onChange={handleSecMenu}>
        {menu.length > 0 &&
          menu.map((item) => {
            return <TabPane tab={item.name} key={item.key}></TabPane>
          })}
      </Tabs>
      {
          menu.map((item) => {
              return (
                  <div className="menu-item" key={item.key} style={{backgroundColor: item.color}}>{item.name}</div>
              )
          })
      }
    </div>
  )
}

export default CeilingTab
