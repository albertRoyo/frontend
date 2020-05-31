<style>
  input {
    align-content: center;
    width: 300px;
    height: 40px;
  }

</style>
<template>
  <div id="app">
    <template v-if="!create_account">
      <h1> Sing in</h1>
      <div class="form-label-group">
        <label for="inputUsername">Username:</label><br>
        <input type="username" id="inputUsername" placeholder="Username" required autofocus v-model="username">
      </div>
      <div class="form-label-group">
        <label for="inputPassword">Password:</label><br>
        <input type="password" id="inputPassword"
        placeholder="Password" required v-model="password" style="margin-block-end: 10px;">
      </div>
      <button class="btn btn-primary" style="margin-block-end: 10px; width: 300px" @click="checkLogin">SING IN</button><br>
      <button class="btn btn-success" style="margin-block-end: 10px; width: 300px" @click="create_account=true">CREATE ACCOUNT</button><br>
      <button class="btn" style="margin-block-end: 10px; width: 300px" @click="backToEvents">BACK TO EVENTS</button><br>
    </template>
    <template v-if="create_account">
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
      <button class="btn btn-primary" style="margin-block-end: 10px; width: 300px" @click="onSumit">Submit</button>
      <button class="btn btn-danger" style="margin-block-end: 10px; width: 300px" @click="resetParam">Reset</button>
    </template>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: '',
      is_admin: false,
      token: '',
      logged: false,
      create_account: false,
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
    checkLogin () {
      const parameters = {
        username: this.username,
        password: this.password
      }
      const path = `http://localhost:5000/login`
      axios.post(path, parameters)
        .then((res) => {
          this.logged = true
          this.token = res.data.token
          this.find_match = true
          this.getAccount()
          alert('Logged in as ' + this.username)
          this.$router.replace({ path: '/', query: { username: this.username, logged: this.logged, is_admin: this.is_admin, token: this.token } })
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
          this.username = ''
          alert('Username or Password incorrect')
        })
    },
    getAccount () {
      const path = `http://localhost:5000/account/`
      axios.get(path + this.username)
        .then((res) => {
          this.is_admin = res.data.is_admin
        })
    },
    onSumit () {
      const parameters = {
        username: this.addUserForm.username,
        password: this.addUserForm.password,
        is_admin: 0,
        available_money: 500
      }
      const path = `http://localhost:5000/account/`
      axios.post(path + parameters.username, parameters)
        .then((res) => {
          alert('Account created!')
          this.logged = false
          this.$router.replace({ path: '/' })
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
          this.username = ''
          alert('Username ' + parameters.username + ' already exists')
        })
    },
    backToEvents () {
      this.$router.replace({ path: '/' })
    }
  }
}
</script>
