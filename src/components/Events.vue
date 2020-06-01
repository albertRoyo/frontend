<style>
  th, td {
    padding: 15px;
    text-align: center;
  }
  img {
    border-radius: 10%;
  }
  .navbar {
    overflow: hidden;
    background-color: #333;
    position: fixed;
    top: 0;
    width: 100%;
  }
  .navbar a:hover {
    background: #ddd;
    color: black;
  }
  .floated {
    float:left;
    margin-right:5px;
  }

</style>

<template>
  <div id="app">
    <nav class="navbar navbar-dark">
      <h2 style="color: #d3d9df">FestiFinder</h2>
      <div v-if="user.logged" id="navbarLogged">
        <div class="navbar-nav" style="position: absolute; left: 60%">
          <div class="nav-item" style="color: white" v-bind:text="user.username"></div>
        </div>
        <div class="navbar-nav" style="position: absolute; left: 70%">
          <div class ="navbar-text" style="color: white" v-bind:text= "'Tickets bought: ' + user.total_tickets"></div>
          <div class ="nav-item" v-bind:text= "'Money available: ' + user.available_money"></div>
        </div>
        <button class="btn btn-outline-light floated" @click="showCart"> Cart 🛒</button>
        <button class="btn btn-outline-light floated" @click="logout"> Logout </button>
      </div>
      <div v-else >
        <div class="navbar-nav">
          <button class="btn btn-outline-light" @click="login"> Login </button>
        </div>
      </div>
    </nav><br><br>
    <template v-if="show_cart">
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Quantity</th>
          <th>Price(€)</th>
          <th>Total</th>
        </tr>
        <tr v-for="(event) in events_added" :key="event.event_id" v-onfocus="updateEventActual(event.event_id) ">
          <td>{{ event_actual.name }}</td>
          <td>
            {{event.tickets_bought}}
            <button class="btn b-icon btn-sm" @click="decQuant(getEvent(event.event_id))">-</button>
            <button class="btn b-icon btn-sm" @click="incQuant(getEvent(event.event_id))">+</button>
          </td>
          <td>{{ event_actual.price }}</td>
          <td>{{ event_actual.price*event.tickets_bought}}</td>
          <button class="btn btn-success"  @click="deleteQuant(getEvent(event.event_id))">Delete ticket</button>
        </tr>
        <button class="btn btn-success btn-lg" @click="showCart">Back</button>
        <button class="btn btn-success btn-lg" @click="finalizePurchase">Finalize purchase</button>
      </thead>
    </template>
    <template v-else-if="add_new_event">
      <b-card style="width:250px; margin:auto">
        <h3> Add new event</h3>
        <button class="btn btn-outline-dark btn-sm" style="margin-block-end: 10px; position:absolute;top:0;right:0;" @click="add_new_event=false">x</button>
        <div class="form-label-group">
          <label for="inputName" style="margin-left: fill">Name:</label>
          <input type="username" id="inputName" placeholder="Enter event name" required autofocus v-model="addEventForm.name">
        </div>
        <div class="form-label-group">
          <label for="inputPrice">Price:</label><br>
          <input type="username" id="inputPrice" placeholder="Enter price" required autofocus v-model="addEventForm.price">
        </div>
        <div class="form-label-group">
          <label for="inputDate">Date:</label><br>
          <input type="username" id="inputDate" placeholder="Enter date" required autofocus v-model="addEventForm.date">
        </div>
        <div class="form-label-group">
          <label for="inputCity">City:</label><br>
          <input type="username" id="inputCity" placeholder="Enter city" required autofocus v-model="addEventForm.city">
        </div>
        <div class="form-label-group">
          <label for="inputPlace">Place:</label><br>
          <input type="username" id="inputPlace" placeholder="Enter place" required autofocus v-model="addEventForm.place">
        </div>
        <div class="form-label-group">
          <label for="inputTickets">Tickets:</label><br>
          <input type="username" id="inputTickets" placeholder="Enter ticket" required autofocus v-model="addEventForm.total_available_tickets">
        </div>
        <br>
        <button class="btn btn-primary"  @click.prevent="onSumit">Submit</button>
        <button class="btn btn-danger"   @click="resetParam">Reset</button>
      </b-card>
    </template>
    <template v-else-if="modify_new_event">
      <b-card style="width:250px; margin:auto">
        <h3> Add new event</h3>
        <button class="btn btn-outline-dark btn-sm" style="margin-block-end: 10px; position:absolute;top:0;right:0;" @click="add_new_event=false">x</button>
        <div class="form-label-group">
          <label for="inputName" style="margin-left: fill">Name:</label>
          <input type="username" id="inputName" placeholder="Enter event name" required autofocus v-model="addEventForm.name">
        </div>
        <div class="form-label-group">
          <label for="inputPrice">Price:</label><br>
          <input type="username" id="inputPrice" placeholder="Enter price" required autofocus v-model="addEventForm.price">
        </div>
        <div class="form-label-group">
          <label for="inputDate">Date:</label><br>
          <input type="username" id="inputDate" placeholder="Enter date" required autofocus v-model="addEventForm.date">
        </div>
        <div class="form-label-group">
          <label for="inputCity">City:</label><br>
          <input type="username" id="inputCity" placeholder="Enter city" required autofocus v-model="addEventForm.city">
        </div>
        <div class="form-label-group">
          <label for="inputPlace">Place:</label><br>
          <input type="username" id="inputPlace" placeholder="Enter place" required autofocus v-model="addEventForm.place">
        </div>
        <div class="form-label-group">
          <label for="inputTickets">Tickets:</label><br>
          <input type="username" id="inputTickets" placeholder="Enter ticket" required autofocus v-model="addEventForm.total_available_tickets">
        </div>
        <br>
        <button class="btn btn-primary"  @click.prevent="onSumit">Submit</button>
        <button class="btn btn-danger"   @click="resetParam">Reset</button>
      </b-card>
    </template>
    <template v-else>
      <div v-if="user.logged">
        <button class="btn btn-dark" style=" margin-bottom: 0" @click="showAddEvent"> Add new event </button><br><br>
        <button class="btn btn-outline-dark" @click="showModifyEvent"> Modify event </button><br><br>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4" v-for="(event) in events" :key="event.id">
            <br>
            <div class="card" style="width: 18rem; border-radius:3%; background-color: #9fcdff">
              <div class="card-body">
                <img v-bind:src="event.image" height="200" width="250" alt="Card image cap">
                <h4 class="card-title">{{event.name}}</h4>
                <p class="card-text">{{event.city}}</p>
                <p class="card-text">{{event.place}}</p>
                <p class="card-text">{{event.date}}</p>
                <p class="card-text">{{event.price}} €</p>
                <p class="card-text">Tickets left: {{event.total_available_tickets}} </p>
                <button v-if="user.logged" class="btn btn-success" style="margin-bottom: 10px" @click="incQuant(event)">Add to cart</button><br>
                <button v-if="user.logged" class="btn btn-secondary" style="margin-bottom: 10px" @click="showAddArtist(event)">Add artist</button><br>
                <button v-if="user.logged" class="btn btn-secondary" style="margin-bottom: 10px" @click="showDelArtist(event)">Delete artist</button><br>
                <button v-if="user.logged" class="btn btn-danger" style="margin-bottom: 10px" @click="deleteEvent(event)">Delete event</button><br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      component: 'login',
      events: [],
      events_added: [],
      event_actual: {},
      show_cart: true,
      add_new_event: false,
      modify_new_event: false,
      add_artist: false,
      del_artist: false,
      user: {
        username: '',
        total_tickets: 0,
        available_money: 0,
        logged: false,
        is_admin: false,
        token: ''
      },
      addEventForm: {
        place: '',
        name: '',
        city: '',
        date: '',
        price: '',
        total_available_tickets: ''
      }
    }
  },
  methods: {
    // Actualitza el total de tikets
    updateTotalQuant () {
      this.user.total_tickets = 0
      for (let i = 0; i < this.events.length; i++) {
        this.user.total_tickets += this.events_added.tickets_bought
      }
    },
    // Metode que actualitza event_actual per que el carret agafi les dades del event
    updateEventActual (id) {
      for (let i = 0; i < this.events.length; i++) {
        if (this.events[i].id === id) {
          this.event_actual = this.events[i]
        }
      }
    },
    // Visualitzar loging
    login () {
      this.$router.replace({ path: '/userlogin' })
    },
    logout () {
      this.user.logged = false
      this.$router.replace({ path: '/', query: { logged: this.user.logged } })
    },
    // Retorna l'event amb l'id passat com a paramentre
    getEvent (id) {
      for (let i = 0; i < this.events.length; i++) {
        if (this.events[i].id === id) {
          return this.events[i]
        }
      }
    },
    showCart () {
      this.show_cart = this.show_cart === false
    },
    showAddEvent () {
      this.add_new_event = this.add_new_event === false
    },
    showModifyEvent () {
      this.modify_new_event = this.modify_new_event === false
    },
    showAddArtist () {
      this.add_artist = this.add_artist === false
    },
    showDelArtist () {
      this.del_artist = this.del_artist === false
    },
    // Decremena el nombre de tickets per l'event. Si aquest resulta 0, elimina l'event de events_added
    incQuant (event) {
      let found = false
      for (let i = 0; i < this.events_added.length; i++) {
        if (this.events_added[i].event_id === event.id) {
          this.events_added[i].tickets_bought += 1
          found = true
        }
      }
      if (!found) {
        let order = { event_id: event.id, tickets_bought: 1 }
        this.events_added.push(order)
      }
    },
    // Incrementa el nombre de tickets per l'event.
    decQuant (event) {
      for (let i = 0; i < this.events_added.length; i++) {
        if (this.events_added[i].event_id === event.id) {
          if (this.events_added[i].tickets_bought > 1) {
            this.events_added[i].tickets_bought -= 1
          } else {
            this.events_added.splice(i, 1)
          }
        }
      }
    },
    // Elimina l'event de events_added.
    deleteQuant (event) {
      for (let i = 0; i < this.events_added.length; i++) {
        if (this.events_added[i].event_id === event.id) {
          this.events_added.splice(i, 1)
        }
      }
    },
    // Per cada ordre, cridem el metode addPurchase
    finalizePurchase () {
      for (let i = 0; i < this.events_added.length; i++) {
        const parameters = {
          id_event: this.events_added[i].id,
          tickets_bought: this.events_added[i].tickets_bought
        }
        this.addPurchase(parameters)
      }
      // Buidem llista
      while (this.events_added.length > 0) { this.events_added.pop() }
    },
    // POST order
    addPurchase (parameters) {
      const path = 'http://localhost:5000/order/'
      axios.post(path + this.user.username, parameters, {
        auth: {username: this.user.token}
      })
        .then(() => {
          alert('Order done')
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
    },
    onSumit () {
      this.$refs.addEventModal.hide()
      const parameters = {
        place: this.addEventForm.place,
        name: this.addEventForm.name,
        city: this.addEventForm.city,
        date: this.addEventForm.date,
        price: this.addEventForm.price,
        total_available_tickets: this.addEventForm.total_available_tickets
      }
      this.addEvent(parameters)
      this.initForm()
    },
    addEvent (parameters) {
      const path = 'http://localhost:5000/event'
      axios.post(path, parameters, {
        auth: {username: this.user.token}
      })
        .then(() => {
          alert('Event added')
        })
        .catch((error) => {
          // eslint-disable-next-line
          alert('Problem has occurred')
          console.log(error)
        })
    },
    initForm () {
      this.addEventForm.place = ''
      this.addEventForm.name = ''
      this.addEventForm.city = ''
      this.addEventForm.date = ''
      this.addEventForm.price = ''
      this.addEventForm.total_available_tickets = ''
    },
    resetParam () {
      this.initForm()
    },
    deleteEvent () {
      const path = 'http://localhost:5000/event'
      axios.post(path, {
        auth: {username: this.token}
      })
        .then(() => {
          alert('Event deleted')
        })
    },
    // GET events
    getEvents () {
      const path = 'http://localhost:5000/events'
      axios.get(path)
        .then((res) => {
          this.events = res.data.events
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  created () {
    this.getEvents()
    this.user.username = this.$route.query.username
    this.user.logged = this.$route.query.logged
    this.user.is_admin = this.$route.query.is_admin
    this.user.token = this.$route.query.token
  }
}

</script>
