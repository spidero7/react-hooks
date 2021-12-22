import {useState, useEffect, useRef} from 'react'

export default function useLocalStorage(key, defaultValue = '') {
  const [value, setValue] = useState(() => {
    const savedValue = JSON.parse(window.localStorage.getItem(key))
    if (savedValue) {
      try {
        return savedValue
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = useRef(key)

  useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
