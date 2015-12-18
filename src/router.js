import app from 'ampersand-app'
import Router from 'ampersand-router'
import React from 'react'
import qs from 'qs'
import xhr from 'xhr'
import Layout from './layout'
import HomePage from './pages/home'
import ReposPage from './pages/repos'

export default Router.extend({
  renderPage (page, opts = {layout: true}) {
    if (opts.layout) {
      page = (
        <Layout>
          {page} 
        </Layout>
      )
    }

    React.render(page, document.body)
  },

  routes: {
    '': 'home',
    'repos': 'repos',
    'login': 'login',
    'auth/callback?:query': 'authCallback'
  },

  home () {
    this.renderPage(<HomePage/>, {layout: false})
  },

  repos () {
    this.renderPage(<ReposPage/>)
  },

  login () {
    window.location =  'https://github.com/login/oauth/authorize?' + qs.stringify({
      client_id: 'c61fcc6371ce27db6e6a',
      redirect_uri: window.location.origin + '/auth/callback',
      scope: 'user, repo'
    });
  },

  authCallback (query) {
    query = qs.parse(query);
    console.log(query)
    xhr({
      url: 'https://coderamp-auth.herokuapp.com/authenticate/' + query.code,
      json: true
    }, (err, req, body) => {
      console.log(body)
      app.user.token = body.token
    })
  }

})