import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog.js'


const blog = {
  title: 'testi',
  author: 'testaaja',
  likes: 1
}

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.content')
    const contentDiv2 = blogComponent.find('.content2')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
    expect(contentDiv2.text()).toContain(blog.likes)
  })
  it('buttons onClick called twice', () => {
    const mockHandler = jest.fn()
    const blogComponent = shallow(
      <SimpleBlog blog={blog} onClick={mockHandler}/>)
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
