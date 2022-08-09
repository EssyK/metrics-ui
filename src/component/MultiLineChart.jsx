import React from 'react'
import FusionCharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFusioncharts from 'react-fusioncharts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import PropTypes from 'prop-types'

ReactFusioncharts.fcRoot(FusionCharts, charts, FusionTheme)

function MultiLineChart ({ categories, dataset, chart }) {
  const dataSource = {
    chart,
    categories: [
      {
        category: categories
      }
    ],
    dataset
  }

  return (
    <div>
        <ReactFusioncharts
        type="msline"
        width="100%"
        height="400"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    </div>
  )
}

MultiLineChart.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string
    })
  ),
  dataset: PropTypes.arrayOf(
    PropTypes.shape({
      seriesname: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.number
        })
      )
    })
  ),
  chart: PropTypes.shape({
    caption: PropTypes.string,
    yaxisname: PropTypes.string,
    subcaption: PropTypes.string,
    numbersuffix: PropTypes.string
  })
}

export default MultiLineChart
