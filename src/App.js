import React, {useState, useEffect} from 'react'
// import MyDatePicker from './dataPicker'
import MyUpload from './upload'
// import SlideBtn from './slidebtn'
// import {data} from './datamap'
// import Echarts from './echarts'
import CeilingTab from './ceilingTab'
import './App.css'




function App() {
  return (
    <div className="App">
      <MyUpload/>
      {/* <MyDatePicker/> */}
      {/* <SlideBtn data={data}/> */}
      {/* <Echarts></Echarts> */}
      <CeilingTab />
    </div>
  )
}


export default App
