
<div class="form-label-group">
  <label for="inputUsername">Username</label>
  <input type="username" id="inputUsername" class="form-control"
  placeholder="Username" required autofocus v-model="username">
</div>
<div class="form-label-group">
  <br>
  <label for="inputPassword">Password</label>
  <input type="password" id="inputPassword" class="form-control"
  placeholder="Password" required v-model="password">
</div>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
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
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
          this.user = ''
          alert('Username or Password incorrect')
        })
    }
  }
}

</script>

<style scoped>

</style>
