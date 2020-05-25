<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 mb-4" v-for="(event) in events" :key="event.id">
          <br>
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <img class="card-img-top" src="event.image" alt="Card image cap">
              <h5 class="card-title">{{event.name}}</h5>
              <p class="card-text">{{event.city}}</p>
              <p class="card-text">{{event.place}}</p>
              <p class="card-text">{{event.date}}</p>
              <p class="card-text">{{event.price}} €</p>
              <a href="#" class="btn btn-primary" @click="add_event_to_cart(event)">Add to cart</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    // S'ha de separar el llistat de events i el carret amb un condicional...
    <thead>
      <tr>
        <th>Event Name</th>
        <th>Quantity</th>
        <th>Price(€)</th>
        <th>Total</th>
      </tr>
      <tr v-for="(event) in getEvents()" :key="event.id">
        <td v-text="event.name"></td>
        <td v-text="event.name"></td>
      </tr>
    </thead>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
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
          image: 'images/festival_cruilla.jpg'
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
          image: 'images/festival_cruilla.jpg'
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
          image: 'images/iron_maiden.jpg'
        }
      ],
      events_added: []
    }
  },
  methods: {
    addEventToCart (event) {
      this.events_added.push(event)
    },
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
      this.getEvents()
    }
  }
}

</script>
