var util = require('../../util/util.js')
import * as echarts from '../../ec-canvas/echarts';
let chart = null;

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    color: ['#FF3300'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      data: ['故障次数']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    yAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['轴承1', '轴承2', '轴承3', '轴承4','轴承5','轴承6','轴承7','轴承8','轴承9','轴承10','轴承11','轴承12'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '故障次数',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [1,0,0,0,0,0,0,0,2,0,0,0],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      },
      
    ]
  };

  chart.setOption(option);
  return chart;
}
Page({
  data: {
    time: '',
    fjnum: ['fan1', 'fan2'],
    array: ['1号轴承', '2号轴承','3号轴承','4号轴承','5号轴承', '6号轴承','7号轴承','8号轴承','9号轴承', '10号轴承','11号轴承','12号轴承'],
    allConditionName: ['工作状况'],
    index: 0,
    labels: [],
    result: [],
    result2:[],
    series: [],
    i: 0,
    timer: '',
    timer2: '',
    chartTimer: '',
    ec: {
      onInit: initChart
    },
  },
  onLoad: function () {
    this.setData({
      time: util.formatTime(new Date()),
      result: [1,0,0,0,0,0,0,0,2,0,0,0],
      result2:[0.02,0,0,0,0,0,0,0,0.04,0,0,0]
    })
    this.oneComponent = this.selectComponent('#mychart-dom-line');
  },
  //开启刷新时间定时器
  setDate: function () {
    this.setData({
      timer2: setInterval(() => {
        this.setData({
          time: util.formatTime(new Date())
        })
      }, 1000)
    })
  },
  //开启刷新数据定时器
  startTimer: function () {
    this.setData({
      i: 0
    })
    this.setData({
      timer: setInterval(() => {
        if (this.data.i <= 3000) {
          this.setData({
            i: this.data.i + 1
          })
        } else {
          this.setData({
            i: 0
          })
          this.closeTimer(this.data.timer)
          this.closeTimer(this.data.timer2)
        }
      }, 1000)
    })
  },
  //关闭定时器
  closeTimer: function (time) {
    clearInterval(time)
  },
  //切换设备picker
  bindPickerChange: function (e) {
    this.closeTimer(this.data.timer)
    this.closeTimer(this.data.timer2)
    this.setData({
      index: e.detail.value
    })
    let j = this.data.index
  },
  //页面卸载时清空定时器
  onUnload: function () {
    if (this.data.timer) {
      this.closeTimer(this.data.timer)
    }
    if (this.data.timer2) {
      this.closeTimer(this.data.timer2)
    }
    if (this.data.chartTimer) {
      this.closeTimer(this.data.chartTimer)
    }
  }
})