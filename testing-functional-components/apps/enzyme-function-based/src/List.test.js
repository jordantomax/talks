import List from './List'

describe('List', () => {
  beforeEach(() => {
    window.localStorage.setItem('todos', null)
  })

  it('sets todos to [] by default', () => {
    const wrapper = shallow(<List />)
    expect(wrapper.find('li').length).toEqual(0)
  })

  it('adds a todo when clicking add', async () => {
    const wrapper = shallow(<List />)
    await wrapper.find('button').props().onClick()
    expect(wrapper.find('ListItem').length).toEqual(1)
  })

  it('correctly updates complete', async () => {
    const wrapper = shallow(<List />)
    await wrapper.find('button').props().onClick()
    const e = {
      target: { name: 'complete', type: 'checkbox', checked: true }
    }
    await wrapper.find('ListItem').props().handleChange(e)
    expect(wrapper.find('ListItem').first().props().todo.complete).toBeTruthy()
  })

  it('correctly updates name', async () => {
    const wrapper = shallow(<List />)
    await wrapper.find('button').props().onClick()
    const e = {
      target: { name: 'name', value: 'Another name' }
    }
    await wrapper.find('ListItem').props().handleChange(e)
    expect(wrapper.find('ListItem').first().props().todo.name).toEqual('Another name')
  })

  it('correctly removes an item', async () => {
    const wrapper = shallow(<List />)
    await wrapper.find('button').props().onClick()
    await wrapper.find('ListItem').props().handleRemove()
    expect(wrapper.find('ListItem').length).toEqual(0)
  })
})
