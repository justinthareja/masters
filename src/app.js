import app from 'ampersand-app'
import Router from './router'
import styles from './styles/main.styl'
import User from './models/user'

window.app = app;

app.extend({
  init () {
    this.user = new User()
    this.router = new Router()
    this.router.history.start()
  }
})

app.init()