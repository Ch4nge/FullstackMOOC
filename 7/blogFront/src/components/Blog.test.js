import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  const blog = {
    title: 'Testi',
    author: 'Testaaja',
    url: '',
    likes: 2
  }

  it('at start contents are not shown', () => {
    const blogComponent = shallow(<Blog blog={blog} />)
    const contentDiv = blogComponent.find('.content')
    expect(contentDiv.getElement().props.style.display)
      .toEqual('none')
  })

  it('after clicking contents are visible', () => {
    const blogComponent = shallow(<Blog blog={blog} />)
    const titleDiv = blogComponent.find('.titleDiv')
    titleDiv.simulate('click')

    const contentDiv = blogComponent.find('.content')
    expect(contentDiv.getElement().props.style.display).toEqual('')
  })
})
