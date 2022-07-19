import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { menu } from "./datamap";
import "./style.less";

const { TabPane } = Tabs;
const CeilingTab = () => {
  const [activeSecMenu, setActiveSecMenu] = useState("1"); // 激活菜单的key
  // 是否激活吸顶
  const [fixedFlag, setFixedFlag] = useState(false);

  // 滚动
  const [secTop, setSecTop] = useState([]);
  const [secTopList, setSecTopList] = useState([]);
  const [isScroll, setScroll] = useState(false)

  // 菜单的所有tab对应的高度数组
  const getSecMenuTop = () => {
    let secDomList = [];
    let secTop = [];
    menu.map((item) => {
      let id = item.key;
      if (id) {
        let dom = document.getElementById(id);
        if (dom) {
          let top = getDomToTop(dom) - 160;
          let secMenuItem = {
            id: item.key,
            top: top,
          };
          secTop.push(top);
          secDomList.push(secMenuItem);
        }
      }
    });
    console.log("secdom", secDomList);
    console.log("sectop", secTop);
    setSecTopList(secDomList);
    setSecTop(secTop);
  };

  // 切换菜单
  const handleSecMenu = (secMenu) => {
    // console.log(secMenu);
    // setScroll(true)
    setActiveSecMenu(secMenu);
    scrollToAnchor(secMenu)
  };

  // 获取元素到顶部的距离
  const getDomToTop = (el) => {
    if (el.parentElement) {
      return getDomToTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  };

  // 监听鼠标滚动
  const handleScrollFunc = (event) => {
    // 当前滚动的高度
    const scrollTop =
      (event.srcElement ? event.srcElement.scrollTop : false) ||
      window.pageYOffset ||
      (event.srcElement ? event.srcElement.body.scrollTop : 0);
    const secMenuDom = document.getElementById('SecMenu');
    // 最外层导航元素至顶部的距离
    const secMenuTop = secMenuDom && secMenuDom.offsetTop;
    // 如果导航元素存在，并且页面滚动了
    if (scrollTop && secMenuTop) {
      // 页面滚动的高度>距顶高度，说明tab栏滚走了，吸顶栏需要显示
      if (scrollTop >= secMenuTop) {
        setFixedFlag(true);
      } else {
        setFixedFlag(false);
      }
    }
    // 根据滚动的高度，判断应该激活的菜单    
    scrollTop && handleScrollActiveSecMenu(scrollTop);
  };

  const handleScrollActiveSecMenu = (scrollTop) => {
    let currentIndex = 0;
    secTop.map((item, index) => {
      let top = item;
      if (scrollTop >= top) {
        currentIndex = index;
      }
    });
    
    handleCurrentSecMenu(currentIndex);
  };

  // 根据当前的滚动判断tab菜单的选中
  const handleCurrentSecMenu = (index) => {
    let activeSecMenu = '';
    secTopList[index] && secTopList[index].id ? (activeSecMenu = secTopList[index].id) : '';
    if (activeSecMenu) {
      setActiveSecMenu(activeSecMenu);
    }
  };

  useEffect(() => {
    getSecMenuTop()
  }, [])
  // activeSecMenu,isScroll改变时，一定伴随着页面的滚动，处理滚动回调
  useEffect(() => {
    window.addEventListener('scroll', handleScrollFunc)
  }, [activeSecMenu, isScroll])

  // 锚点定位
  const scrollToAnchor = (anchorId) => {
    // 找到锚点 id
    if (anchorId) {
      let anchorElement = document.getElementById(anchorId);
      // console.log(anchorId, 'anchorId')
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) {
        // getDomToTop算出来的高度总比实际高度大一点
        let top = getDomToTop(anchorElement) - 60;
        window.scrollTo({
          top: top,
          behavior: 'smooth',
        });
        // setTimeout(() => {
        //   setScroll(false);
        // }, 400);
      }
    }
    setScroll(false)
  };

  useEffect(() => {
    
  }, [activeSecMenu])
  return (
    <div className="ceilingtab">
      <Tabs activeKey={activeSecMenu} onChange={handleSecMenu} id="SecMenu">
        {menu.length > 0 &&
          menu.map((item) => {
            return <TabPane tab={item.name} key={item.key}></TabPane>;
          })}
      </Tabs>
      {menu.map((item) => {
        return (
          <div
            className="menu-item"
            id={item.key}
            style={{ backgroundColor: item.color }}
          >
            {item.name}
          </div>
        );
      })}

      <div className={fixedFlag ? "show-fixed-menu" : "hidden-fixed-menu"}>
        <Tabs activeKey={activeSecMenu} onChange={handleSecMenu}>
          {menu.length &&
            menu.map((k) => <TabPane tab={k.name} key={k.key}></TabPane>)}
        </Tabs>
      </div>
    </div>
  );
};

export default CeilingTab;
