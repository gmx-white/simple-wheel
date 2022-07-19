import React, { useState, useEffect } from 'react'
import * as echarts from 'echarts'
import './style.css'
import { message } from 'antd';
import { optionsLine, optionsPie, horizontalBar, groupBar } from './datamap'

const Echarts = (props) => {

  let bar;
  const [barOptions, setBarOptions] = useState(horizontalBar)
  // 数据请求
  // const  getDatafunc = async() => {
  //   await 1
  // }
  const initEcharts = (elId, options) => {
    let myEcharts = echarts.init(document.getElementById(elId), null, { width: 600, height: 300 })
    myEcharts.showLoading()
    // 异步数据
    // getDatafunc.then(res => {
    //   if (res.code === 0) {
    //     options.xAxis.data = res.data
    //     options.series.data = res.data
    //     options.yAxis.data = res.data
    //   } else {
    //     message.error('数据请求失败')
    //   }
    //  myEcharts.hideLoading()
    // })
    myEcharts.hideLoading()
    myEcharts.setOption(options)
    return myEcharts
  }

  const changeData = () => {
    let options = JSON.parse(JSON.stringify(horizontalBar))
    options.series[0].data = [1,2,3,4,5]
    // console.log(options);
    bar.setOption(options)
    setBarOptions(options)
  }

  useEffect(() => {
    initEcharts('line', optionsLine)
    initEcharts('pie', optionsPie)
    bar = initEcharts('bar', horizontalBar)
    initEcharts('groupBar', groupBar)

  }, [])
  useEffect(() => {
    window.onresize = () => {
      bar.resize()
    }
  }, [])
  useEffect(() => {

  }, [barOptions])
  return (

    <div className="total">
      <div id="line" className="line">
      </div>
      <div id="pie" className="pie"></div>
      {/* 水平柱状图 */}
      <div id="bar" className="horizontal-bar"></div>
      <button onClick={changeData}>改变数据</button>
      <div className="groupBar" id="groupBar"></div>
    </div>




  )
}

export default Echarts