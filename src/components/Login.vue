
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
      form: {
        email: '',
        name: '',
        food: null,
        checked: []
      },
      username: '',
      password: '',
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
    created () {
      this.logged = this.$route.query.logged
      this.username = this.$route.query.username
      this.is_admin = this.$route.query.is_admin
      this.token = this.$route.query.token
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
