import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MultiLineChart from '../component/MultiLineChart'

function Dashboard () {
  const [categoriesPerMinute, setCategoriesPerMinute] = useState([])
  const [categoriesPerHour, setMetricsPerHour] = useState([])
  const [categoriesPerDay, setCategoriesPerDay] = useState([])
  const [dataSetPerDay, setDataSetPerDay] = useState([])
  const [dataSetPerMinute, setDataSetPerMinute] = useState([])
  const [dataSetPerHour, setDataSetPerHour] = useState([])

  const baseURL = process.env.REACT_APP_BASE_URL
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
        const responseData = response.data
        const monthDays = [...new Set(responseData.data.perHour.map(item => item.monthDay))]

        const perMinute = monthDays.map((day) => ({ label: day }))
        const perHour = monthDays.map((day) => ({ label: day }))

        const months = [...new Set(responseData.data.perDay.map(item => item.monthString))]
        const perDay = months.map((month) => ({ label: month }))

        setCategoriesPerDay(perDay)
        setCategoriesPerMinute(perMinute)
        setMetricsPerHour(perHour)

        const metricCategories = [...new Set(responseData.data.perDay.map(item => item.name))]
        const datasetMinute = metricCategories
          .map((metric) => ({
            seriesname: metric,
            data: responseData.data.perHour.filter((m) => m.name === metric)
              .map((m) => ({ value: m.value }))
          }))
        setDataSetPerMinute(datasetMinute)

        const datasetHour = metricCategories
          .map((metric) => ({
            seriesname: metric,
            data: responseData.data.perHour.filter((m) => m.name === metric)
              .map((m) => ({ value: m.value }))
          }))
        setDataSetPerHour(datasetHour)

        const datasetDay = metricCategories
          .map((metric) => ({
            seriesname: metric,
            data: responseData.data.perDay.filter((m) => m.name === metric)
              .map((m) => ({ value: m.value }))
          }))
        setDataSetPerDay(datasetDay)
      })
      .catch(function (error) {
        console.log(error)
        throw error
      })

    return () => {}
  }, [])

  const chartDay = {
    caption: 'Average Metric Values Per Day', // Set the chart caption
    subcaption: '', // Set the chart subcaption
    xAxisName: 'Month', // Set the x-axis name
    yaxisname: 'Values', // Set the y-axis name
    numberSuffix: '',
    theme: 'fusion', // Set the theme for your chart
    showhovereffect: '1',
    drawcrossline: '1',
    plottooltext: '<b>$dataValue</b> metric value for $seriesName'
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
      <MultiLineChart categories={categoriesPerDay} dataset={dataSetPerDay} chart={chartDay}/>
      <br/>
      <MultiLineChart categories={categoriesPerHour} dataset={dataSetPerHour} chart={chartHour}/>
      <br/>
      <MultiLineChart categories={categoriesPerMinute} dataset={dataSetPerMinute} chart={chartMinute}/>
    </div>
  )
}

export default Dashboard
