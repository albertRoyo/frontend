<template>
  <div id="app">
    <template v-if="!show_cart">
      <button class="btn btn-success btn-lg" @click="showCart"> Cart </button>
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
                <button class="btn btn-success btn-lg" @click="addEventToCart(event)">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <thead v-if="show_cart">
      <tr>
        <th>Event Name</th>
        <th>Quantity</th>
        <th>Price(€)</th>
        <th>Total</th>
      </tr>
      <tr v-for="(event) in events_added" v-if="quantity[event.id]>0" :key="event.id">
        <td v-text="event.name"> </td>
        <td v-text="quantity[event.id]"></td>
        <a href="#" class="btn btn-primary" :disabled="quantity[event.id]<1" @click="decQuant(event.id)">-</a>
        <a href="#" class="btn btn-primary" @click="incQuant(event.id)">+</a>
        <td v-text="event.price"> </td>
        <td v-text="event.price*quantity[event.id]"> </td>
      </tr>
      <button class="btn btn-success btn-lg" @click="closeCart">Back</button>
      <button class="btn btn-success btn-lg" @click="finalizePurchase">Finalize purchase</button>
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
      events_added: [],
      quantity: [0, 0, 0],
      show_cart: false
    }
  },
  methods: {
    addEventToCart (event) {
      if (this.quantity[event.id] < 1) {
        this.events_added.push(event)
      }
      this.quantity[event.id]++
    },
    decQuant (id) {
      if (this.quantity[id] > 0) {
        this.quantity[id] -= 1
      }
    },
    incQuant (id) {
      this.quantity[id] += 1
    },
    showCart () {
      this.show_cart = true
    },
    closeCart () {
      this.show_cart = false
    },
    finalizePurchase () {
      for (let i = 0; i < this.events_added.items.length; i += 1) {
        const parameters = {
          event_id: this.events_added.items[i].event.id,
          tickets_bought: this.events_added.items[i].quantity
        }
        this.addPurchase(parameters)
      }
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
