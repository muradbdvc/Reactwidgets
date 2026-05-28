import React from 'react'
import Weather from './components/Weather/Weather'
import Calculator from './components/Calculator/Calculator'
import Promodoro from './components/Promodoro/Promodoro'

const App = () => {
  return (
    <div className='flex flex-row gap-12'>
      <Weather />
      <Calculator />
      <Promodoro />
    </div>
  )
}

export default App