import {useState, useEffect} from 'react'

export default function useLocalStorage(key, defaultValue = '') {
  const [value, setValue] = useState(
    () => window.localStorage.getItem(key) || defaultValue,
  )

  useEffect(() => {
    window.localStorage.setItem(key, value)
  }, [value])

  return [value, setValue]
}
