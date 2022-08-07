import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LineChart from '../component/LineChart'

function Dashboard () {
  const [metricsPerMinute, setMetricsPerMinute] = useState([])
  const [metricsPerHour, setMetricsPerHour] = useState([])
  const [metricsPerDay, setMetricsPerDay] = useState([])

  const baseURL = 'https://localhost:7130/api/Metrics'
  const apiClient = axios.create({
    baseURL: `${baseURL}`,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    timeout: 10000
  })

  useEffect(() => {
    apiClient
      .get('/GetMetricAverages')
      .then(function (response) {
        console.log(response.data)
        const perMinute = response.data.perMinute
          .filter((metric) => metric.name === 'Calls')
          .map((metric) => ({
            label: metric.monthDay,
            value: metric.value,
            name: metric.name
          }))
        const perHour = response.data.perHour
          .filter((metric) => metric.name === 'Calls')
          .map((metric) => ({
            label: metric.monthDay,
            value: metric.value,
            name: metric.name
          }))
        const perDay = response.data.perDay
          .filter((metric) => metric.name === 'Calls')
          .map((metric) => ({
            label: metric.monthString,
            value: metric.value,
            name: metric.name
          }))
        setMetricsPerMinute(perMinute)
        setMetricsPerHour(perHour)
        setMetricsPerDay(perDay)
      })
      .catch(function (error) {
        // handle error
        throw error
      })

    return () => {}
  }, [])

  const chartDay = {
    caption: 'Average Metric Values Per Day', // Set the chart caption
    subCaption: '', // Set the chart subcaption
    xAxisName: 'Month', // Set the x-axis name
    yaxisname: 'Values', // Set the y-axis name
    numberSuffix: '',
    theme: 'fusion' // Set the theme for your chart
  }

  const chartHour = {
    caption: 'Average Metric Values Per Hour', // Set the chart caption
    subCaption: '', // Set the chart subcaption
    xAxisName: 'Days', // Set the x-axis name
    yaxisname: 'Values', // Set the y-axis name
    numberSuffix: '',
    theme: 'fusion' // Set the theme for your chart
  }

  const chartMinute = {
    caption: 'Average Metric Values Per Minute', // Set the chart caption
    subCaption: '', // Set the chart subcaption
    xAxisName: 'Days', // Set the x-axis name
    yaxisname: 'Values', // Set the y-axis name
    numberSuffix: '',
    theme: 'fusion' // Set the theme for your chart
  }

  return (
    <div className="container">
      <LineChart chart={chartDay} data={metricsPerDay}/>
      <br/>
      <LineChart chart={chartHour} data={metricsPerHour}/>
      <br/>
      <LineChart chart={chartMinute} data={metricsPerMinute}/>
    </div>
  )
}

export default Dashboard
