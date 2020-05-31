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
  :root {
    user: username;
  }

</style>

<template>
  <div id="app">
    <nav class="navbar navbar-dark">
      <h1 class="card-title" style="color: #d3d9df">FestiFinder</h1>
      <b-btn-group style="align-content: end">
        <div v-if="logged">
          <b-dropdown id="dropdown-1" class="m-md-2" style="margin-right: 0">{{username}}
            <b-dropdown-item>Tikets bought: </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item>Money available: {{ avaliable_money }}</b-dropdown-item>
          </b-dropdown>
          <button class="btn btn-outline-light" @click="showCart"> Cart 🛒</button>
          <button class="btn btn-outline-light" @click="logout"> Logout </button>
        </div>
        <div v-else>
          <button class="btn btn-outline-light" @click="login"> Login </button>
        </div>
      </b-btn-group>
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
          <input type="username" id="inputTickets" placeholder="Enter ticket" required autofocus v-model="addEventForm.ticket">
        </div>
        <br>
        <button class="btn btn-primary"  @click="onSumit">Submit</button>
        <button class="btn btn-danger"   @click="resetParam">Reset</button>
      </b-card>
    </template>
    <template v-else>
      <div v-if="logged">
        <button class="btn btn-dark" @click="showAddEvent"> Add new event </button><br><br>
        <button class="btn btn-outline-dark" @click="showModifyEvent"> Modify event </button><br><br>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4" v-for="(event) in events" :key="event.id">
            <br>
            <div class="card" style="width: 18rem; border-radius:3%; background-color: #d3d9df">
              <div class="card-body">
                <img v-bind:src="event.image" height="200" width="250" alt="Card image cap">
                <h4 class="card-title">{{event.name}}</h4>
                <p class="card-text">{{event.city}}</p>
                <p class="card-text">{{event.place}}</p>
                <p class="card-text">{{event.date}}</p>
                <p class="card-text">{{event.price}} €</p>
                <p class="card-text">Tickets left: {{event.total_available_tickets}} </p>
                <button v-if="logged" class="btn btn-success btn-lg" @click="incQuant(event)">Add to cart</button>
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
      events: [
        {
          id: 0,
          name: 'Festival Cruilla 2020',
          artists: [
            {'name': 'Bad Gyal'},
            {'name': 'Txarango'},
            {'name': 'Estopa'}
          ],
          city: 'Barcelona',
          place: 'Parc del Fòrum',
          date: '2020-07-03',
          price: 100,
          image: 'https://www.elperfildelatostada.com/wp-content/uploads/2019/07/cruilla-portada-750x400.jpg',
          total_available_tickets: 100
        },
        {
          id: 1,
          name: 'Canet Rock 2020',
          artists: [
            {'name': 'Txarango'},
            {'name': 'Dvicio'},
            {'name': 'Lola Indigo'}
          ],
          city: 'Barcelona',
          place: 'Parc del Fòrum',
          date: '2020-07-05',
          price: 24,
          image: 'https://www.rac105.cat/assets/uploads/2020/02/canet-rock-2020-1570707429.48.2560x1440-1.jpg',
          total_available_tickets: 500
        },
        {
          id: 2,
          name: 'Iron Maiden Tour',
          artists: [
            {'name': 'Iron Maiden'}
          ],
          city: 'Barcelona',
          place: 'Sant Jordi',
          date: '2020-08-22',
          price: 70,
          image: 'https://indiehoy.com/wp-content/uploads/2018/11/iron-maiden.jpg',
          total_available_tickets: 1000
        },
        {
          id: 3,
          name: 'Tomorrowland 2020',
          place: 'Boom',
          city: 'Boom',
          date: '2020-06-03',
          artists: [
            {name: 'Bad Gyal'},
            {name: 'Steve Aoki'},
            {name: 'David Guetta'}
          ],
          price: 20,
          image: 'https://tomorrowlandlatino.com/wp-content/uploads/2019/12/Tomorrowland-Renueva-Contrato-2034-696x392.jpg.webp',
          total_available_tickets: 2500
        }
      ],
      events_added: [],
      event_actual: {},
      total_tickets: 0,
      avaliable_money: 0,
      show_cart: false,
      add_new_event: false,
      username: '',
      logged: false,
      is_admin: false,
      token: '',
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
      this.total_tickets = 0
      for (let i = 0; i < this.events.length; i++) {
        this.total_tickets += this.events_added.tickets_bought
      }
      return this.total_tickets
    },
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
      this.$router.replace({ path: '/' })
      this.logged = false
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
          event_id: this.events_added[i].id,
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
      axios.post(path + parameters.username, parameters, {
        auth: {username: this.token}
      })
        .then(() => {
          console.log('Order done')
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
    },
    onSumit (evt) {
      evt.preventDefault()
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
        auth: {username: this.token}
      })
        .then(() => {
          console.log('Event Aded')
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
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
    },
    created () {
      this.events = []
      this.username = this.$route.query.username
      this.logged = this.$route.query.logged
      this.is_admin = this.$route.query.is_admin
      this.token = this.$route.query.token
    }
  }
}

</script>
