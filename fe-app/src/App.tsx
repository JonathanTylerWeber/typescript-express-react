import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [pong, setPong] = useState<string>("...waiting for server")

  const fetchPong = async () => {
    const res = await fetch('http://localhost:8080/api/v1/ping')
    const {data} = await res.json()
    setPong(data)
  }

  useEffect(() => {
    fetchPong()
  },[])

  return (
    <main>
      Hello World
      {
        pong.length > 0 && (
          <div>
            {pong}
          </div>
        )
      }

    </main>
  )
}

export default App
