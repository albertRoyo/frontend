<style>
  input {
    align-content: center;
    width: 300px;
    height: 40px;
  }

</style>
<template>
  <div id="app" style="align-content: center; float: inside">
    <template v-if="!create_account">
      <h1> Sing in</h1>
      <div class="form-label-group">
        <label for="inputUsername">Username:</label><br>
        <input type="username" id="inputUsername" placeholder="Username" required autofocus v-model="user.username">
      </div>
      <div class="form-label-group">
        <label for="inputPassword">Password:</label><br>
        <input type="password" id="inputPassword"
        placeholder="Password" required v-model="user.password" style="margin-block-end: 10px;">
      </div>
      <button class="btn btn-primary" style="margin-block-end: 10px; width: 300px" @click="checkLogin">SING IN</button><br>
      <button class="btn btn-success" style="margin-block-end: 10px; width: 300px" @click="create_account=true">CREATE ACCOUNT</button><br>
      <button class="btn" style="margin-block-end: 10px; width: 300px" @click="backToEvents">BACK TO EVENTS</button><br>
    </template>
    <template ref="create" v-if="create_account">
      <h3> Create account</h3>
      <button class="btn btn-outline-dark btn-sm" style="margin-block-end: 10px; position:absolute;top:0;right:0;" @click="create_account=false">x</button>
      <div class="form-label-group">
        <label for="inputUsername">Username:</label><br>
        <input type="username" id="inputUsernameCreate" placeholder="Username" required autofocus v-model="addUserForm.username">
      </div>
      <div class="form-label-group">
        <label for="inputPassword">Password:</label><br>
        <input type="password" id="inputPasswordCreate"
        placeholder="Password" required v-model="addUserForm.password" style="margin-block-end: 10px;">
      </div>
      <button class="btn btn-primary" style="margin-block-end: 10px; width: 300px" @click="onSubmit">Submit</button>
      <button class="btn btn-danger" style="margin-block-end: 10px; width: 300px" @click="resetParam">Reset</button>
    </template>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      create_account: false,
      account: {},
      user: {
        username: '',
        password: '',
        is_admin: 0,
        token: '',
        logged: false,
        available_money: 0
      },
      addUserForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    initForm () {
      this.addUserForm.username = ''
      this.addUserForm.password = ''
    },
    resetParam () {
      this.initForm()
    },
    checkLogin: function () {
      const parameters = {
        username: this.user.username,
        password: this.user.password
      }
      const path = 'http://localhost:5000/login'
      axios.post(path, parameters)
        .then((res) => {
          this.user.logged = true
          this.user.token = res.data.token
          this.getAccount()
          alert('Logged in as ' + this.user.username)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
          this.user.username = ''
          alert('Username or Password incorrect')
        })
    },
    getAccount () {
      const path = `http://localhost:5000/account/${this.user.username}`
      axios.get(path, {
        auth: {username: this.user.token}
      })
        .then((res) => {
          this.account = res.data.account
          this.$router.replace({
            path: '/',
            query: {
              username: this.user.username,
              logged: this.user.logged,
              is_admin: this.account.is_admin,
              money: this.account.available_money,
              token: this.user.token
            }
          })
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
    },
    onSubmit () {
      const parameters = {
        username: this.addUserForm.username,
        password: this.addUserForm.password,
        is_admin: 0,
        available_money: 500
      }
      const path = 'http://localhost:5000/account/'
      axios.post(path + parameters.username, parameters)
        .then((res) => {
          alert('Account created!')
          this.initForm()
          this.$router.replace({ path: '/' })
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
          this.user.username = ''
          alert('Username ' + parameters.username + ' already exists')
        })
    },
    backToEvents () {
      this.user.logged = false
      this.$router.replace({ path: '/', query: { logged: this.user.logged } })
    }
  }
}
</script>
