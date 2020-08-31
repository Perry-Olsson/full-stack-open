import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const getAll = async () => {
      const request = await axios.get(baseUrl)
      setResources(request.data)
    }
    getAll()
  }, [baseUrl])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    setResources([...resources, response.data])
    return response.data
  }

  const service = {
    create,
  }

  return [
    resources, service
  ]
}