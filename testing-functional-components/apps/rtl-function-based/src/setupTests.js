import React from 'react'
import { render, cleanup, fireEvent, act } from '@testing-library/react'
import { Factory } from 'rosie'
import faker from 'faker'

function randomFromArray (array) {
  return array[Math.floor(Math.random() * array.length)]
}

Factory.define('todo')
  .attr('name', () => faker.lorem.word())
  .attr('complete', () => randomFromArray([true, false]))

Factory.define('withRouter')
  .attr('history', () => ({
    push: jest.fn(),
    goBack: jest.fn()
  }))
  .attr('match', () => ({
    params: {},
    isExact: false,
    path: '',
    url: ''
  }))

global.React = React
global.render = render
global.cleanup = cleanup
global.fireEvent = fireEvent
global.act = act
global.Factory = Factory
