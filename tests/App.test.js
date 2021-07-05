import React from 'react'
import { mount } from '@cypress/react'
import App from './App'

it('renders react', () => {
  mount(<App />)
})
