import List from './List'

jest.mock('react-router', () => ({
  withRouter: Component => Component
}))

afterEach(cleanup)

describe('List', () => {
  beforeEach(() => {
    window.localStorage.setItem('todos', null)
  })

  it('sets todos to [] by default', () => {
    const wrapper = render(<List />)
    expect(wrapper.container.querySelector('li')).toBeNull()
  })

  it('adds a todo when clicking add', async () => {
    const wrapper = render(<List />)
    act(() => { fireEvent.click(wrapper.getByText('Add a todo')) })
    expect(wrapper.container.querySelector('li')).not.toBeNull()
  })

  it('correctly updates complete', async () => {
    const wrapper = render(<List />)
    let checkbox
    await act(async () => {
      await fireEvent.click(wrapper.getByText('Add a todo'))
      checkbox = wrapper.container.querySelector('input[type="checkbox"]')
      await fireEvent.change(checkbox, { target: {
        name: 'complete', checked: true
      }})
    })
    expect(checkbox.checked).toBeTruthy()
  })

  it('correctly updates name', async () => {
    const wrapper = render(<List />)
    let input
    await act(async () => {
      await fireEvent.click(wrapper.getByText('Add a todo'))
      await fireEvent.click(wrapper.getByText('New todo'))
      input = wrapper.getByPlaceholderText('Edit todo')
      await fireEvent.change(input, { target: { name: 'name', value: 'Something else' }
      })
      await fireEvent.blur(input)
    })
    expect(wrapper.getByText('Something else')).toBeDefined()
  })

  it('correctly removes an item', async () => {
    const wrapper = render(<List />)
    await act(async () => {
      await fireEvent.click(wrapper.getByText('Add a todo'))
      await fireEvent.click(wrapper.getByText('x'))
    })
    expect(wrapper.queryByText('New todo')).toBeNull()
  })

  it('correctly goes back', async () => {
    const props = {
      ...Factory.build('withRouter')
    }
    const wrapper = render(<List {...props} />)
    await act(async () => fireEvent.click(wrapper.getByText('Go back')))
    expect(props.history.goBack).toHaveBeenCalled()
  })
})
