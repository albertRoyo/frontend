<style>
  th, td {
    padding: 15px;
    text-align: center;
  }
  img {
    border-radius: 10%;
  }
  .navbar {
    z-index: 1;
    background-color: #333;
    position: fixed;
    top: 0;
    width: 100%;
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
        <div v-for="(user) in user_money_tickets" :key="user.username">
          <div class="navbar-nav" style="position: absolute; left: 70%; color: #d3d9df">
            <div class="dropdown" style="position: absolute;">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false" style="width: 170px">
                {{user.username}}
                <span class="caret"></span>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Total tickets: {{user.total_tickets}}</a>
                <a class="dropdown-item" href="#">Money available: {{user.available_money}}</a>
              </div>
            </div>
          </div>
        </div>
        <button v-if="!user.is_admin" class="btn btn-outline-light floated" @click="showCart"> Cart 🛒</button>
        <button class="btn btn-outline-light floated" @click="logout"> Logout </button>
      </div>
      <div v-else >
        <div class="navbar-nav">
          <button class="btn btn-outline-light" @click="login"> Login </button>
        </div>
      </div>
    </nav><br><br>
    <template v-if="show_cart">
      <thead style="border-bottom: 5px solid #000;">
        <tr>
          <th>Event Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
        <tr v-for="(event) in events_added" :key="event.event_id" v-onfocus="updateEventActual(event.event_id)" >
          <td>{{ event_actual.name }}</td>
          <td>
            {{event.tickets_bought}}
            <button class="btn b-icon btn-sm" @click="decQuant(getEvent(event.event_id))">-</button>
            <button class="btn b-icon btn-sm" @click="incQuant(getEvent(event.event_id))">+</button>
          </td>
          <td>{{ event_actual.price }} €</td>
          <td>{{ event_actual.price*event.tickets_bought}} €</td>
          <button class="btn btn-danger"  @click="deleteQuant(getEvent(event.event_id))">Delete ticket</button>
        </tr>
      </thead>
      <hr style="width: 500px; margin-left: 0">
      <div style="width:max-content ;left: 50%">
        <button class="btn btn-lg" @click="showCart">Back</button>
        <button class="btn btn-success btn-lg" @click="finalizePurchase">Finalize purchase</button>
      </div>
    </template>
    <template v-else-if="add_new_event" id="label_left">
      <b-card style="width:250px; margin:auto; overflow: hidden">
        <h3> Add new event</h3>
        <button class="btn btn-outline-danger btn-sm" style="margin-block-end: 10px; position:absolute;top:0;right:0;" @click="add_new_event=false">x</button>
        <div class="form-label-group">
          <label for="inputName" style="float: left; margin-bottom: 0; margin-top: 10px;">Name:</label>
          <input type="username" id="inputName" style="width: 200px" placeholder="Enter event name" required autofocus v-model="addEventForm.name">
        </div>
        <div class="form-label-group">
          <label for="inputPrice" style="float: left; margin-bottom: 0; margin-top: 10px;">Price:</label><br>
          <input type="username" id="inputPrice" style="width: 200px" placeholder="Enter price" required autofocus v-model="addEventForm.price">
        </div>
        <div class="form-label-group">
          <label for="inputDate" style="float: left; margin-bottom: 0; margin-top: 10px;">Date:</label><br>
          <input type="username" id="inputDate" style="width: 200px" placeholder="Enter date" required autofocus v-model="addEventForm.date">
        </div>
        <div class="form-label-group">
          <label for="inputCity" style="float: left; margin-bottom: 0; margin-top: 10px;">City:</label><br>
          <input type="username" id="inputCity" style="width: 200px" placeholder="Enter city" required autofocus v-model="addEventForm.city">
        </div>
        <div class="form-label-group">
          <label for="inputPlace" style="float: left; margin-bottom: 0; margin-top: 10px;">Place:</label><br>
          <input type="username" id="inputPlace" style="width: 200px" placeholder="Enter place" required autofocus v-model="addEventForm.place">
        </div>
        <div class="form-label-group">
          <label for="inputTickets" style="float: left; margin-bottom: 0; margin-top: 10px;">Tickets:</label><br>
          <input type="username" id="inputTickets" style="width: 200px" placeholder="Enter ticket" required autofocus v-model="addEventForm.total_available_tickets">
        </div>
        <br>
        <button class="btn btn-primary"  @click="onSubmit">Submit</button>
        <button class="btn btn-outline-danger"   @click="onResetNew">Reset</button>
      </b-card>
    </template>
    <template v-else-if="modify_event">
      <b-card style="width:250px; margin:auto">
        <h3> Modify event</h3>
        <button class="btn btn-outline-danger btn-sm" style="margin-block-end: 10px; position:absolute;top:0;right:0;" @click="modify_event=false">x</button>
        <div class="form-label-group">
          <label for="inputIdM" style="float: left; margin-bottom: 0; margin-top: 10px;">Id:</label><br>
          <input type="username" id="inputIdM" style="width: 200px" placeholder="Enter id" required autofocus v-model="editEventForm.id">
        </div>
        <div class="form-label-group">
          <label for="inputName" style="float: left; margin-bottom: 0; margin-top: 10px;">Name:</label>
          <input type="username" id="inputNameM" style="width: 200px" placeholder="Enter event name" required autofocus v-model="addEventForm.name">
        </div>
        <div class="form-label-group">
          <label for="inputPriceM" style="float: left; margin-bottom: 0; margin-top: 10px;">Price:</label><br>
          <input type="username" id="inputPriceM" style="width: 200px" placeholder="Enter price" required autofocus v-model="editEventForm.price">
        </div>
        <div class="form-label-group">
          <label for="inputDateM" style="float: left; margin-bottom: 0; margin-top: 10px;">Date:</label><br>
          <input type="username" id="inputDateM" style="width: 200px" placeholder="Enter date" required autofocus v-model="editEventForm.date">
        </div>
        <div class="form-label-group">
          <label for="inputCityM" style="float: left; margin-bottom: 0; margin-top: 10px;">City:</label><br>
          <input type="username" id="inputCityM" style="width: 200px" placeholder="Enter city" required autofocus v-model="editEventForm.city">
        </div>
        <div class="form-label-group">
          <label for="inputPlaceM" style="float: left; margin-bottom: 0; margin-top: 10px;">Place:</label><br>
          <input type="username" id="inputPlaceM" style="width: 200px" placeholder="Enter place" required autofocus v-model="editEventForm.place">
        </div>
        <div class="form-label-group">
          <label for="inputTicketsM" style="float: left; margin-bottom: 0; margin-top: 10px;">Tickets:</label><br>
          <input type="username" id="inputTicketsM" style="width: 200px" placeholder="Enter ticket" required autofocus v-model="editEventForm.total_available_tickets">
        </div>
        <br>
        <button class="btn btn-primary"  @click="onSubmitUpdate">Modify event</button>
        <button class="btn btn-outline-danger"   @click="onResetUpdate">Reset</button>
      </b-card>
    </template>
    <template v-else-if="add_artist">
      <b-card style="width:250px; margin:auto">
        <h3> Add artist to event</h3>
        <button class="btn btn-outline-danger btn-sm" style="margin-block-end: 10px; position:absolute;top:0;right:0;" @click="add_artist=false">x</button>
        <div class="form-label-group">
          <label for="inputNameAristAdd" style="float: left; margin-bottom: 0; margin-top: 10px;">Name:</label>
          <input type="username" id="inputNameAristAdd" style="width: 200px" placeholder="Enter artist name" required autofocus v-model="addEventForm.name">
        </div>
        <div class="form-label-group">
          <label for="inputPriceAristAdd" style="float: left; margin-bottom: 0; margin-top: 10px;">Country:</label><br>
          <input type="username" id="inputPriceAristAdd" style="width: 200px" placeholder="Enter country" required autofocus v-model="addEventForm.price">
        </div>
        <div class="form-label-group">
          <label for="inputDateAristAdd" style="float: left; margin-bottom: 0; margin-top: 10px;">Genre:</label><br>
          <input type="username" id="inputDateAristAdd" style="width: 200px" placeholder="Enter genre" required autofocus v-model="addEventForm.date">
        </div>
        <button class="btn btn-primary"  @click="onSubmitAddArtistInEvent">Add artist</button>
        <button class="btn btn-outline-danger"   @click="onResetAddArtist">Reset</button>
      </b-card>
    </template>
    <template v-else-if="del_artist">
      <b-card style="width:250px; margin:auto">
        <h3> Delete artist from event</h3>
        <button class="btn btn-outline-danger btn-sm" style="margin-block-end: 10px; position:absolute;top:0;right:0;" @click="del_artist=false">x</button>
        <div class="form-label-group">
          <label for="inputIdArtist" style="float: left; margin-bottom: 0; margin-top: 10px;">Id:</label>
          <input type="username" id="inputIdArtist" style="width: 200px" placeholder="Enter artist id" required autofocus v-model="addEventForm.name">
        </div>
        <button class="btn btn-danger"  @click="onSubmitDeleteArtistInEvent">Delete artist</button>
        <button class="btn btn-outline-danger"   @click="onResetDeleteArtist">Reset</button>
      </b-card>
    </template>
    <template v-else>
      <div v-if="user.logged && user.is_admin">
        <button class="btn btn-dark" style=" margin-bottom: 0" @click="showAddEvent"> Add new event </button><br><br>
        <button class="btn btn-outline-dark" @click="showModifyEvent"> Modify event </button><br><br>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4" v-for="(event) in events" :key="event.id">
            <br>
            <div class="card" style="width: 18rem; border-radius:3%; background-color: #e0e0e0">
              <div class="card-body">
                <img v-bind:src="event.image" height="200" width="250" alt="Card image cap">
                <h4 class="card-title">{{event.name}}</h4>
                <p class="card-text">{{event.city}}</p>
                <p class="card-text">{{event.place}}</p>
                <p class="card-text">{{event.date}}</p>
                <p class="card-text">{{event.price}} €</p>
                <p class="card-text">Tickets left: {{event.total_available_tickets}} </p>
                <button v-if="user.logged && !user.is_admin" class="btn btn-secondary" style="margin-bottom: 10px" @click="incQuant(event)">Add to cart</button><br>
                <button v-if="user.logged && user.is_admin" class="btn btn-secondary" style="margin-bottom: 10px" @click="eventWhereModifyArtist(event)">Add artist</button><br>
                <button v-if="user.logged && user.is_admin" class="btn btn-secondary" style="margin-bottom: 10px" @click="eventWhereDeleteArtist(event)">Delete artist</button><br>
                <button v-if="user.logged && user.is_admin" class="btn btn-outline-danger" style="margin-bottom: 10px" @click="eventToDelete(event)">Delete event</button><br>
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
      event_to_modify: null,
      show_cart: false,
      add_new_event: false,
      modify_event: false,
      add_artist: false,
      del_artist: false,
      user_money_tickets: [ {username: '', available_money: 0, total_tickets: 0} ],
      user: {
        username: '',
        logged: false,
        is_admin: false,
        token: null
      },
      addEventForm: {
        place: '',
        name: '',
        city: '',
        date: '',
        price: '',
        total_available_tickets: ''
      },
      editEventForm: {
        id: '',
        name: '',
        place: '',
        city: '',
        date: '',
        price: '',
        total_available_tickets: ''
      },
      addArtistForm: {
        id: '',
        name: '',
        country: '',
        genre: ''
      },
      deleteArtistForm: {
        id: '',
        name: ''
      }
    }
  },
  methods: {
    // Actualitza el total de tikets
    updateTotalQuant () {
      this.user_money_tickets[0].total_tickets = 0
      for (let i = 0; i < this.events_added.length; i++) {
        this.user_money_tickets[0].total_tickets += this.events_added[i].tickets_bought
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
      this.user.logged = this.show_cart = this.add_new_event = this.modify_event = this.add_artist = this.del_artist = false
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
      this.modify_event = this.modify_event === false
    },
    // Incrementa el nombre de tickets per l'event. Si aquest resulta 0, elimina l'event de events_added
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
    // Decrementa el nombre de tickets per l'event.
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
          event_id: this.events_added[i].event_id,
          tickets_bought: this.events_added[i].tickets_bought
        }
        this.addPurchase(parameters)
      }
      // Buidem llista
      this.events_added = []
      alert('Order done')
    },
    // POST order
    addPurchase (parameters) {
      const path = `http://localhost:5000/orders/${this.user.username}`
      axios.post(path, parameters, {
        auth: {username: this.user.token}
      })
        .then(() => {
        })
        .catch((error) => {
          alert(error)
          // eslint-disable-next-line
          console.log(error)
        })
    },
    onSubmit () {
      const parameters = {
        name: this.addEventForm.name,
        place: this.addEventForm.place,
        city: this.addEventForm.city,
        date: this.addEventForm.date,
        price: this.addEventForm.price,
        total_available_tickets: this.addEventForm.total_available_tickets
      }
      this.addEvent(parameters)
      this.initFormNew()
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
    initFormNew () {
      this.addEventForm.place = ''
      this.addEventForm.name = ''
      this.addEventForm.city = ''
      this.addEventForm.date = ''
      this.addEventForm.price = ''
      this.addEventForm.total_available_tickets = ''
    },
    onResetNew (evt) {
      evt.preventDefault()
      this.initFormNew()
      this.add_new_event = false
      this.$nextTick(() => {
        this.add_new_event = true
      })
    },
    onSubmitUpdate () {
      const parameters = {
        name: this.editEventForm.name,
        place: this.editEventForm.place,
        city: this.editEventForm.city,
        date: this.editEventForm.date,
        price: this.editEventForm.price,
        total_available_tickets: this.editEventForm.total_available_tickets
      }
      this.updateEvent(parameters)
      this.initFormUpdate()
    },
    updateEvent (parameters) {
      const path = `http://localhost:5000/event/${this.editEventForm.id}`
      axios.post(path, parameters, {
        auth: {username: this.user.token}
      })
        .then(() => {
          alert('Event modified')
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
    },
    initFormUpdate () {
      this.editEventForm.place = ''
      this.editEventForm.name = ''
      this.editEventForm.city = ''
      this.editEventForm.date = ''
      this.editEventForm.price = ''
      this.editEventForm.total_available_tickets = ''
    },
    onResetUpdate (evt) {
      evt.preventDefault()
      this.initFormUpdate()
      this.modify_event = false
      this.$nextTick(() => {
        this.modify_event = true
      })
    },
    eventWhereModifyArtist (event) {
      this.event_to_modify = event
      this.add_artist = true
    },
    onSubmitAddArtistInEvent () {
      const parameters = {
        name: this.addArtistForm.name,
        country: this.addArtistForm.country,
        genre: this.addArtistForm.genre
      }
      this.addNewArtist(parameters)
      this.addArtistInEvent(parameters)
      this.initFormAddArtist()
    },
    addNewArtist (parameters) {
      const path = `http://localhost:5000/artist/`
      axios.post(path, parameters, {
        auth: {username: this.user.token}
      })
        .then(() => {
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
    },
    addArtistInEvent (parameters) {
      const path = `http://localhost:5000/event/${this.event_to_modify.id}/artist`
      axios.post(path, parameters, {
        auth: {username: this.user.token}
      })
        .then(() => {
          alert('Artist added')
        })
        .catch((error) => {
          // eslint-disable-next-line
          alert('Problem has occurred')
          console.log(error)
        })
    },
    initFormAddArtist () {
      this.addArtistForm.id = ''
      this.addArtistForm.name = ''
      this.addArtistForm.country = ''
      this.addArtistForm.genre = ''
    },
    onResetAddArtist (evt) {
      evt.preventDefault()
      this.initFormAddArtist()
      this.add_artist = false
      this.$nextTick(() => {
        this.add_artist = true
      })
    },
    eventWhereDeleteArtist (event) {
      this.event_to_modify = event
      this.del_artist = true
    },
    onSubmitDeleteArtistInEvent (evt) {
      evt.preventDefault()
      this.$refs.deleteArtistModal.hide()
      this.deleteArtistInEvent()
      this.initFormDelArtist()
    },
    deleteArtistInEvent () {
      const parameters = {
        id: this.deleteArtistForm.id
      }
      const path = `http://localhost:5000/event/${this.event_to_modify.id}/artist/${parameters.id}`
      axios.delete(path, {
        auth: {username: this.user.token}
      })
        .then(() => {
          alert('Artist deleted')
        })
        .catch((error) => {
          // eslint-disable-next-line
          alert('Problem has occurred')
          console.log(error)
        })
    },
    initFormDelArtist () {
      this.deleteArtistForm.id = ''
      this.deleteArtistForm.name = ''
    },
    onResetDeleteArtist (evt) {
      evt.preventDefault()
      this.initFormDelArtist()
      this.add_new_event = false
      this.$nextTick(() => {
        this.add_new_event = true
      })
    },
    // GET events
    getEvents () {
      const path = `http://localhost:5000/events`
      axios.get(path)
        .then((res) => {
          this.events = res.data.events
        })
        .catch((error) => {
          console.error(error)
        })
    },
    eventToDelete (event) {
      this.event_to_modify = event
      this.deleteEvent()
    },
    deleteEvent () {
      const path = `http://localhost:5000/event/${this.event_to_modify.id}`
      axios.delete(path, {
        auth: {username: this.user.token}
      })
        .then(() => {
          alert('Event deleted')
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
    }
  },
  created () {
    this.getEvents()
    this.user.username = this.$route.query.username
    this.user.logged = this.$route.query.logged
    this.user.is_admin = this.$route.query.is_admin
    this.user.token = this.$route.query.token
    this.updateTotalQuant()
    this.user_money_tickets[0].username = this.user.username
    this.user_money_tickets[0].available_money = this.$route.query.money
  }
}

</script>
