import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'


describe('<App />', () => {

    it('Only loginform shows when not logged in', () => {
      const app = mount(<App />)
      const form = app.find('form')
      expect(form.length).toBe(1)

      const blogs = app.find(Blog)
      expect(blogs.length).toBe(0)
    })
    
    describe('when logged', () => {
      let app
      beforeAll(() => { 
        localStorage.setItem('loggedUser',
           JSON.stringify({ username: 'testaaja', token: '1123123' }))
        app = mount(<App />)
      })
      it('Blogs rendered, when logged', () => {
        app.update()
  
        const blogs = app.find('Blog')
        expect(blogs.length).toBe(2)
      })
    })
})

