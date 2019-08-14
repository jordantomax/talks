import ListItem from './ListItem'

describe('ListItem', () => {
  it('shows an input to edit when clicking name', async () => {
    const props = {
      handleChange: jest.fn(),
      todo: Factory.build('todo')
    }
    const wrapper = render(<ListItem {...props} />)
    await act(async () => fireEvent.click(wrapper.container.querySelector('li > span')))
    expect(wrapper.getByPlaceholderText('Edit todo')).toBeDefined()
  })
})
