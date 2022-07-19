// @ts-nocheck
import React, { useState, useEffect } from 'react'
import {
  Radio,
  DatePicker,
} from 'antd'
import 'antd/dist/antd.css';
import moment from 'moment'

const { RangePicker } = DatePicker

const MyDatePicker = (props) => {
  const duration = [
    {
      label: '1小时',
      value: 3600
    },
    {
      label: '2小时',
      value: 3600 * 2
    },
    {
      label: '3小时',
      value: 3600 * 3
    },
    {
      label: '4小时',
      value: 3600 * 4
    }
  ]
  const [dateRange, setDateRange] = useState([])
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  // 按钮组绑定的选择duration
  const [selectedDuration, setSelectedDuration] = useState(0)

  const selectedDurationChange = (e) => {
    setDateRange([])
    // setStartTime(null)
    setEndTime(null)
    const btnValue = e.target.value
    setSelectedDuration(btnValue)
    let timestamp = Math.floor(moment(new Date().valueOf()) / 1000)
    const startTimestamp = Math.floor(timestamp - btnValue)
    setStartTime(startTimestamp)
    setEndTime(timestamp)
  }

  const onCalendarChange = (val) => {
    setSelectedDuration(null)
    setDateRange(val)
    let start, end;
    if (val[0] !== 'undefined') {
      start = Math.floor(moment(val[0]).valueOf() / 1000)
    }
    if (val[1] !== 'undefined') {
      end = Math.floor(moment(val[1]).valueOf() / 1000)
    }
    setStartTime(start)
    setEndTime(end)
  }

  useEffect(() => {
    // getData()  // 根据值的变动发起请求
  }, [selectedDuration, startTime, endTime])
  return (
    <div>
      <Radio.Group
        options={duration}
        onChange={selectedDurationChange}
        value={selectedDuration}
        optionType="button"
      />

      <RangePicker
        onFocus={() => { setSelectedDuration(null) }}
        style={{ marginLeft: '16px' }}
        allowClear={true}
        showTime
        value={dateRange}
        onCalendarChange={onCalendarChange}
        getPopupContainer={target => target.parentNode}
      />
    </div>
  )
}

export default MyDatePicker