import List from './List'

describe('List', () => {
  beforeEach(() => {
    window.localStorage.setItem('todos', null)
  })

  it('sets index 0 by default', () => {
    const wrapper = shallow(<List />)
    expect(wrapper.instance().state.index).toEqual(0)
  })

  it('sets todos to [] by default', () => {
    const wrapper = shallow(<List />)
    expect(wrapper.instance().state.todos).toEqual([])
  })

  it('adds a todo when clicking add', async () => {
    const wrapper = shallow(<List />)
    await wrapper.find('button').props().onClick()
    expect(wrapper.instance().state.todos.length).toEqual(1)
  })

  it('displays a todo for each todo in state', async () => {
    const wrapper = shallow(<List />)
    await wrapper.find('button').props().onClick()
    await wrapper.find('button').props().onClick()
    expect(wrapper.find('ListItem').length).toEqual(2)
  })

  it('correctly updates complete', async () => {
    const wrapper = shallow(<List />)
    await wrapper.find('button').props().onClick()
    const e = {
      target: { name: 'complete', type: 'checkbox', checked: true }
    }
    await wrapper.find('ListItem').props().handleChange(e)
    expect(wrapper.instance().state.todos[0].complete).toBeTruthy()
  })

  it('correctly updates name', async () => {
    const wrapper = shallow(<List />)
    await wrapper.find('button').props().onClick()
    const e = {
      target: { name: 'name', value: 'Another name' }
    }
    await wrapper.find('ListItem').props().handleChange(e)
    expect(wrapper.instance().state.todos[0].name).toEqual('Another name')
  })

  it('correctly removes an item', async () => {
    const wrapper = shallow(<List />)
    await wrapper.find('button').props().onClick()
    await wrapper.find('ListItem').props().handleRemove()
    expect(wrapper.instance().state.todos.length).toEqual(0)
  })
})
