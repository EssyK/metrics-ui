import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ConfigureMetrics = () => {
  const [metricName, setMetricName] = useState('')
  const [metricValue, setMetricValue] = useState('')
  const [metricId, setMetricId] = useState('')
  const [metricDefinitions, setMetricDefinitions] = useState([])
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
      .get('/AllMetricDefinitions')
      .then(function (response) {
        setMetricDefinitions(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
        // handle error
        throw error
      })

    return () => {}
  }, [])

  function handleMetricDefinitionSubmit (event) {
    event.preventDefault()
    const postData = {
      name: metricName
    }

    apiClient
      .post('/AddMetricDefinition', postData)
      .then(function (response) {
        setMetricName('')
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function handleMetricValueSubmit (event) {
    event.preventDefault()
    const postData = {
      value: metricValue,
      metricId
    }

    apiClient
      .post('/AddMetricValue', postData)
      .then(function (response) {
        setMetricId('Select')
        setMetricValue('')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div className="container">
      <div className="card mb-5">
        <form onSubmit={handleMetricDefinitionSubmit}>
          <div className="form-group p-4">
            <label htmlFor="inputMetric">Metric Name</label>
            <input
              type="text"
              className="form-control mb-3"
              id="inputMetric"
              aria-describedby="metricHelp"
              placeholder="Enter metric name"
              onChange={(e) => setMetricName(e.target.value)}
              value={metricName}
            />
            <div className="col-12  mb-3">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="card">
        <form onSubmit={handleMetricValueSubmit}>
          <div className="form-group p-4">
            <div className="form-group mb-3">
              <label htmlFor="selectMetric">Metric</label>
              <select
                id="selectMetric"
                className="form-select"
                aria-label="Metric name"
                onChange={(e) => setMetricId(e.target.value)}
                value={metricId}
              >
                <option value="Select">Select a metric</option>
                {metricDefinitions.map((metric) => (
                  <option key={metric.id} value={metric.id}>
                    {metric.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="inputValue">Metric Value</label>
              <input
                type="number"
                className="form-control"
                id="inputValue"
                placeholder="Metric Value"
                onChange={(e) => setMetricValue(e.target.value)}
                value={metricValue}
                min={0}
              />
            </div>
            <div className="mb-3 input-group">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ConfigureMetrics
