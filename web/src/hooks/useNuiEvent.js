import { useEffect, useRef } from 'react'

// Subscribes to a specific NUI message action sent via SendNUIMessage.
// Usage: useNuiEvent('setVisible', (data) => { ... })
export default function useNuiEvent(action, handler) {
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useEffect(() => {
    const listener = (event) => {
      const data = event.data
      if (!data || data.action !== action) return
      handlerRef.current?.(data)
    }
    window.addEventListener('message', listener)
    return () => window.removeEventListener('message', listener)
  }, [action])
}
