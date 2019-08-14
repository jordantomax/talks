import ListItem from './ListItem'

describe('ListItem', () => {
  it('shows an input to edit when clicking name', async () => {
    const props = {
      todo: {
        name: 'todo',
        complete: false
      }
    }
    const wrapper = shallow(<ListItem {...props} />)
    wrapper.find('li').find('span').props().onClick()
    expect(wrapper.instance().state.isEditing).toBeTruthy()
  })
})
