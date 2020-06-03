<style>
  th, td {
    padding: 15px;
    text-align: center;
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
        <button v-if="user.is_admin === 0" class="btn btn-outline-light floated" @click="showCart"> Cart 🛒</button>
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
          <th>Price(€)</th>
          <th>Total</th>
        </tr>
        <tr v-for="(event) in events_added" :key="event.event_id" v-onfocus="updateEventActual(event.event_id)" >
          <td>{{ event_actual.name }}</td>
          <td>
            {{event.tickets_bought}}
            <button class="btn b-icon btn-sm" @click="decQuant(getEvent(event.event_id))">-</button>
            <button class="btn b-icon btn-sm" @click="incQuant(getEvent(event.event_id))">+</button>
          </td>
          <td>{{ event_actual.price }} </td>
          <td>{{ event_actual.price*event.tickets_bought}} €</td>
          <button class="btn btn-danger"  @click="deleteQuant(getEvent(event.event_id))">Delete ticket</button>
        </tr>
      </thead>
      <hr style="width: 500px; margin-left: 0">
      <div v-if="money_purchase>0" style="position: absolute; left: 270px; font-weight: bold;">Total : {{money_purchase}}€</div><br><br>
      <div style="width:max-content ;left: 50%">
        <button class="btn btn-lg" @click="showCart">Back</button>
        <button class="btn btn-success btn-lg" @click="finalizePurchase">Finalize purchase</button>
      </div>
    </template>
    <template v-else-if="add_new_event" id="label_left">
      <b-card style="width:250px; margin:auto; overflow: hidden">
        <h3> Add new event</h3>
        <button class="btn btn-outline-dark btn-sm" style="margin-block-end: 10px; position:absolute;top:0;right:0;" @click="add_new_event=false">x</button>
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
        <button class="btn btn-outline-dark"   @click="onResetNew">Reset</button>
      </b-card>
    </template>
    <template v-else-if="modify_event">
      <b-card style="width:250px; margin:auto">
        <h3> Modify event</h3>
        <button class="btn btn-outline-dark btn-sm" style="margin-block-end: 10px; position:absolute;top:0;right:0;" @click="modify_event=false">x</button>
        <div class="form-label-group">
          <label for="inputIdM" style="float: left; margin-bottom: 0; margin-top: 10px;">Id:</label><br>
          <input type="username" id="inputIdM" style="width: 200px" placeholder="Enter id" required autofocus v-model="editEventForm.id">
        </div>
        <div class="form-label-group">
          <label for="inputName" style="float: left; margin-bottom: 0; margin-top: 10px;">Name:</label>
          <input type="username" id="inputNameM" style="width: 200px" placeholder="Enter event name" required autofocus v-model="editEventForm.name">
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
        <button class="btn btn-outline-dark"   @click="onResetUpdate">Reset</button>
      </b-card>
    </template>
    <template v-else-if="add_artist">
      <b-card style="width:250px; margin:auto">
        <h3> Add artist to event</h3>
        <button class="btn btn-outline-dark btn-sm" style="margin-block-end: 10px; position:absolute;top:0;right:0;" @click="add_artist=false">x</button>
        <div class="form-label-group">
          <label for="inputNameAristAdd" style="float: left; margin-bottom: 0; margin-top: 10px;">Name:</label>
          <input type="username" id="inputNameAristAdd" style="width: 200px" placeholder="Enter artist name" required autofocus v-model="addArtistForm.name">
        </div>
        <div class="form-label-group">
          <label for="inputCityArtistAdd" style="float: left; margin-bottom: 0; margin-top: 10px;">Country:</label><br>
          <input type="username" id="inputCityArtistAdd" style="width: 200px" placeholder="Enter country" required autofocus v-model="addArtistForm.country">
        </div>
        <div class="form-label-group">
          <label for="inputGenreArtistAdd" style="float: left; margin-bottom: 0; margin-top: 10px;">Genre:</label><br>
          <input type="username" id="inputGenreArtistAdd" style="width: 200px" placeholder="Enter genre" required autofocus v-model="addArtistForm.genre">
          Write one of this genres: [REGGAE, POP, TRAP, HIP HOP, ROCK, INDIE, HEAVY, ELECTRONIC, OTHER]
        </div>
        <br>
        <button class="btn btn-primary"  @click="onSubmitAddArtistInEvent">Add artist</button>
        <button class="btn btn-outline-dark"   @click="onResetAddArtist">Reset</button>
      </b-card>
    </template>
    <template v-else-if="del_artist">
      <b-card style="width:250px; margin:auto">
        <h3> Delete artist from event</h3>
        <button class="btn btn-outline-dark btn-sm" style="margin-block-end: 10px; position:absolute;top:0;right:0;" @click="del_artist=false">x</button>
        <div class="form-label-group">
          <label for="inputIdArtist" style="float: left; margin-bottom: 0; margin-top: 10px;">Id:</label>
          <input type="username" id="inputIdArtist" style="width: 200px" placeholder="Enter artist id" required autofocus v-model="deleteArtistForm.id">
        </div>
        <br>
        <button class="btn btn-danger"  @click="onSubmitDeleteArtistInEvent">Delete artist</button>
        <button class="btn btn-outline-dark"   @click="onResetDeleteArtist">Reset</button>
      </b-card>
    </template>
    <template v-else>
      <div v-if="user.logged && (user.is_admin === 1)">
        <button class="btn btn-dark" style=" margin-right: 0" @click="showAddEvent"> Add new event </button>
        <button class="btn btn-outline-dark" @click="showModifyEvent"> Modify event </button><br><br>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4" v-for="(event) in events" :key="event.id">
            <br>
            <b-card
              :title="event.name"
              :img-src="event.image"
              img-alt="Image"
              img-top
              img-height="200px"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>
                <p class="card-text">{{event.city}}</p>
                <p class="card-text">{{event.place}}</p>
                <p class="card-text">{{event.date}}</p>
                <p class="card-text">{{event.price}} €</p>
                <p class="card-text">Tickets left: {{event.total_available_tickets}} </p>
              </b-card-text>
              <button v-if="user.logged && (user.is_admin === 0)" class="btn btn-secondary" style="margin-bottom: 10px; width: 150px" @click="incQuant(event)">Add to cart</button><br>
              <button v-if="user.logged && (user.is_admin === 1)" class="btn btn-secondary" style="margin-bottom: 10px; width: 150px" @click="eventWhereModifyArtist(event)">Add artist</button><br>
              <button v-if="user.logged && (user.is_admin === 1)" class="btn btn-secondary" style="margin-bottom: 10px; width: 150px " @click="eventWhereDeleteArtist(event)">Delete artist</button><br>
              <button v-if="user.logged && (user.is_admin === 1)" class="btn btn-outline-danger" style="margin-bottom: 10px; width: 150px" @click="eventToDelete(event)">Delete event</button><br>
            </b-card>
          </div>
        </div>
      </div>
    </template>
    <footer v-if="!show_cart && !add_new_event && !modify_event && !del_artist && !add_artist">
      <p>
        Stay up to date on new events with our telegram bot at:
        <a href="https://t.me/a10events" target="_blank">https://t.me/a10events</a>
      </p>
      <p>
        © 2020 FestiFinder FrontEnd, Inc
      </p>
      <p>
        Authors: Joan Travé, Albert Royo
      </p>
    </footer>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      component: 'login',
      events: [{image: ''}, {image: ''}],
      events_added: [],
      event_actual: {},
      event_to_modify: null,
      show_cart: false,
      add_new_event: false,
      modify_event: false,
      add_artist: false,
      del_artist: false,
      money_purchase: 0,
      user_money_tickets: [ {username: '', available_money: 0, total_tickets: 0} ],
      user: {
        username: '',
        logged: false,
        is_admin: 0,
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
        id: ''
      },
      images: [
        'https://ep01.epimg.net/elpais/imagenes/2019/07/03/estilo/1562141943_716738_1562142230_noticia_normal.jpg',
        'https://fotografias.lasexta.com/clipping/cmsimages02/2018/04/20/B22581CB-ADAE-4C9E-9D90-4A2427F31435/58.jpg',
        'https://sonarplusd.com/system/attached_images/27370/medium/FatboySlim_SonarClub_sonar2016_Leafhopper_006.jpg?1554395672',
        'https://image.ondacero.es/clipping/cmsimages02/2020/04/01/3E1027B0-6D5C-41EF-8625-F138A31FD416/27.jpg',
        'https://lh3.googleusercontent.com/proxy/8XEEKUZb4h3SJxAylCj6HSo0PsASyg_B_XSZ_yFuuJwYd3vQofi1jA0WAI-X_Kep1wHKV87f2C31Eg-mHkdBvuN2nGYlIRcn-34sSniGA0pd9SUUdOqWYzZOQeouf2AxxUFFiCGuqvlmRsxA-lfjFTiofoRRE3BqrdT671SC7_l8xl-_PzNFZAxD95A_ESI4BonWcotI',
        'https://estaticos.elperiodico.com/resources/jpg/0/4/sardana-punts-lliures-palacete-albeniz-1474729318940.jpg',
        'https://img.vixdata.io/pd/jpg-large/es/sites/default/files/btg/musica.batanga.com/files/Los-9-tipos-de-fans-que-siempre-encuentras-en-un-concierto-de-rock%20(copia).jpg',
        'https://www.directivosyempresas.com/wp-content/uploads/2020/01/seguridad-social-actuara%CC%81-en-oh-my-club-de-madrid-680x365_c.jpg'
      ]
    }
  },
  methods: {
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
      let i
      for (i = 0; i < this.events_added.length && !found; i++) {
        if (this.events_added[i].event_id === event.id) {
          this.events_added[i].tickets_bought += 1
          found = true
        }
      }
      if (!found) {
        let order = { event_id: event.id, tickets_bought: 1 }
        this.events_added.push(order)
      }
      this.user_money_tickets[0].total_tickets += 1
      this.money_purchase += event.price * this.events_added[i].tickets_bought
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
      this.user_money_tickets[0].total_tickets -= 1
      this.money_purchase -= event.price
    },
    // Elimina l'event de events_added.
    deleteQuant (event) {
      for (let i = 0; i < this.events_added.length; i++) {
        if (this.events_added[i].event_id === event.id) {
          this.user_money_tickets[0].total_tickets -= this.events_added[i].tickets_bought
          this.money_purchase -= this.events_added[i].tickets_bought * event.price
          this.events_added.splice(i, 1)
        }
      }
    },
    // Per cada ordre, cridem el metode addPurchase
    finalizePurchase () {
      if (this.user_money_tickets >= this.money_purchase) {
        for (let i = 0; i < this.events_added.length; i++) {
          const parameters = {
            event_id: this.events_added[i].event_id,
            tickets_bought: this.events_added[i].tickets_bought
          }
          this.addPurchase(parameters)
        }
        // Buidem llista
        this.events_added = []
        this.user_money_tickets[0].total_tickets = 0
        alert('Order done')
      } else alert('You have not enough money for this purchase')
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
    },
    addEvent (parameters) {
      const path = 'http://localhost:5000/event'
      axios.post(path, parameters, {
        auth: {username: this.user.token}
      })
        .then(() => {
          alert('Event added')
          this.initFormNew()
          this.getEvents()
        })
        .catch((error) => {
          // eslint-disable-next-line
          alert('Fill all the gaps and try again')
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
    },
    updateEvent (parameters) {
      const path = `http://localhost:5000/event/${this.editEventForm.id}`
      axios.put(path, parameters, {
        auth: {username: this.user.token}
      })
        .then(() => {
          alert('Event modified')
          this.initFormUpdate()
          this.getEvents()
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
    },
    initFormUpdate () {
      this.editEventForm.id = ''
      this.editEventForm.name = ''
      this.editEventForm.place = ''
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
    },
    addNewArtist (parameters) {
      const path = `http://localhost:5000/artist`
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
          alert('Artist added to event')
          this.initFormAddArtist()
        })
        .catch((error) => {
          // eslint-disable-next-line
          alert('The artist is already in this event or the genre does not exist')
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
    onSubmitDeleteArtistInEvent () {
      this.deleteArtistInEvent()
    },
    deleteArtistInEvent () {
      const path = `http://localhost:5000/event/${this.event_to_modify.id}/artist/${this.deleteArtistForm.id}`
      axios.delete(path, {
        auth: {username: this.user.token}
      })
        .then(() => {
          alert('Artist deleted')
          this.initFormDelArtist()
        })
        .catch((error) => {
          // eslint-disable-next-line
          alert('Problem has occurred: ' + error)
          console.log(error)
        })
    },
    initFormDelArtist () {
      this.deleteArtistForm.id = ''
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
          this.addImages()
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
          this.getEvents()
        })
        .catch((error) => {
          alert('Try reconect again')
          // eslint-disable-next-line
          console.log(error)
        })
    },
    addImages () {
      for (let i = 0; i < this.events.length; i++) {
        this.events[i].image = this.images[i]
      }
    }
  },
  created () {
    this.getEvents()
    this.user.username = this.$route.query.username
    this.user.logged = this.$route.query.logged
    this.user.is_admin = this.$route.query.is_admin
    this.user.token = this.$route.query.token
    this.user_money_tickets[0].username = this.user.username
    this.user_money_tickets[0].available_money = this.$route.query.money
    this.money_purchase = 0
  }
}

</script>
