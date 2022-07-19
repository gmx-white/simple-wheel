import * as echarts from 'echarts'
const num = 500
const optionsLine = {
  title: {
    text: '累计人数',
    x: 'center',
    textStyle: {
      color: '#fff',

    }
  },
  xAxis: {
    type: 'category',
    data: ['1', '2', '3', '4', '5', '6', '7'],
    axisLine: {
      show: true,
      onZero: true,
      lineStyle: {
        color: '#ffffff'
      }
    },
    axisLabel: {
      formatter: '{value}天'
    },
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: [{
    type: 'value',
    name: "单位（人）",
    nameGap: 10,
    // nameRotate: '90',
    nameLocation: 'end',

    nameTextStyle: {
      // padding: [0, 0, 0, -60]
    },

    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    },
    interval: 100,
    max: 500,
    axisLine: {
      show: true,
      onZero: true,
      lineStyle: {
        color: '#ffffff'
      }
    }
  },
  {
    axisLine: {
      show: false
    },
    name: `总人数为 ${num}`,
    nameGap: 10,
    left: -10,
    nameLocation: 'end',
    nameTextStyle: {
      color: '#fff',
      padding: [0, 80, 0, 0]
    },
    type: 'value'
  }
  ],
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      color: 'red',
      name: '累计人数',
      yAxisIndex: 0
    },
    {
      // data: [100,100,100,100,100,100],
      type: 'line',
      // name: 'none',
      yAxisIndex: 1

    }
  ],
  tooltip: {
    trigger: 'axis',
    formatter: (params) => {
      return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[0].name + '天' + '<br>' +
        params[0].marker + ' ' + params[0].seriesName + params[0].data + '人'
    },
    textStyle: {
      align: 'left'
    },
    axisPointer: {
      lineStyle: {
        width: 1,
        type: 'solid'
      }
    }
  }
};

const optionsPie = {
  color: ['#bfc', "#333"],
  series: [
    {
      name: '用户数据',
      type: 'pie',
      radius: '50%',
      data: [{ value: 34, name: '新用户' }, { value: 66, name: '老用户' }],
      label: {
        normal: {
          show: true,
          formatter: '{b} {c} 人'
        },

      },
      labelLine: {
        normal: {
          show: false
        }
      }
    }

  ]


}

// 水平柱状
const horizontalBar = {
  backgroundColor: '#0f375f',
  grid: {
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    containLabel: true,
  },
  xAxis: {
    type: 'value',
    axisLine: {
      show: true,
      lineStyle: {
        width: 1,
        color: 'rgba(255, 255, 255, 1)',
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
      fontSize: 14,
      color: 'rgba(211, 232, 255, 1)',
    },
    min: 0,
    max: (value) => value.max + 1,
    splitLine: {
      show: true,
    },
  },
  yAxis: {
    type: 'category',
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255, 255, 255, 1)',
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      fontSize: 14,
      color: 'rgba(211, 232, 255, 1)',
    },
    data: ['R', 'SQL', 'Python', 'C', 'C#'],
  },
  series: [
    {
      type: 'bar',
      barWidth: 15,
      itemStyle: {
        normal: {
          show: true,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: 'rgba(45, 131, 232, 1)',
            },
            {
              offset: 1,
              color: 'rgba(89, 196, 245, 1)',
            },
          ]),
        },
      },

      data: [20, 36, 88, 33, 91],

    },
  ],
}

// 柱簇
const groupBar = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    icon: 'circle', // 图标
    itemGap: 10, // 图例项间隔
    right: 0,
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Union Ads',
      type: 'bar',
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'bar',
      emphasis: {
        focus: 'series'
      },
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Search Engine',
      type: 'bar',
      data: [862, 1018, 964, 1026, 1679, 1600, 1570],
      emphasis: {
        focus: 'series'
      },
    },
    {
      name: 'Baidu',
      type: 'bar',
      barWidth: 5,
      stack: 'Search Engine',
      emphasis: {
        focus: 'series'
      },
      data: [620, 732, 701, 734, 1090, 1130, 1120]
    },
    {
      name: 'Others',
      type: 'bar',
      stack: 'Search Engine',
      emphasis: {
        focus: 'series'
      },
      data: [62, 82, 91, 84, 109, 110, 120]
    }
  ]
}



export { optionsLine, optionsPie, horizontalBar, groupBar }