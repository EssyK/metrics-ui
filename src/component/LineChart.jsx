import React from 'react'
import FusionCharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFusioncharts from 'react-fusioncharts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import PropTypes from 'prop-types'

ReactFusioncharts.fcRoot(FusionCharts, charts, FusionTheme)

function LineChart ({ chart, data }) {
  const { caption, yaxisname, subcaption, numbersuffix, rotatelabels, setadaptiveymin } = chart
  const dataSource = {
    chart: {
      caption,
      yaxisname,
      subcaption,
      numbersuffix,
      rotatelabels,
      setadaptiveymin,
      theme: 'fusion'
    },
    data
  }
  return (
    <ReactFusioncharts
        type="line"
        width="100%"
        height="400"
        dataFormat="JSON"
        dataSource={dataSource}
      />
  )
}

LineChart.propTypes = {
  chart: PropTypes.shape({
    caption: PropTypes.string,
    yaxisname: PropTypes.string,
    subcaption: PropTypes.string,
    numbersuffix: PropTypes.string,
    rotatelabels: PropTypes.string,
    setadaptiveymin: PropTypes.string
  }),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number
    })
  )
}

export default LineChart
