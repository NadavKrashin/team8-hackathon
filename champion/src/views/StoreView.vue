<template>
  <div id="app">
    <section class="shop">
      <div class="products">
        <h2>!בחר את המתנה שלך</h2>
        <div v-for="product in products" :key="product.id">
          <img :src="product.image" alt="" />
          <p>{{ product.name }}</p>
          <button @click="addToCart(product.id)">
            !מחיר: {{ product.price }} גביעים
          </button>
        </div>
      </div>
      <div class="cart" v-if="cart.length > 0">
        <h2>Your Cart</h2>
        <ul>
          <li v-for="item in cart" :key="item.id">
            {{ item.name }} (x{{ item.quantity }})
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import TeddyBear from "../assets/teddybear.jpg";
import ToyCar from "../assets/car.png";
import BarbieDoll from "../assets/barbie_doll.jpg";
export default {
  data() {
    return {
      products: [
        { id: 1, name: "דובי חמוד", image: TeddyBear, price: 100 },
        { id: 2, name: "מכונית צעצוע", image: ToyCar, price: 80 },
        { id: 3, name: "בובת ברבי", image: BarbieDoll, price: 150 },
      ],
      cart: [],
    };
  },
  methods: {
    addToCart(productId) {
      const existingItem = this.cart.find((item) => item.id === productId);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        const product = this.products.find((p) => p.id === productId);
        this.cart.push({ ...product, quantity: 1 });
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f8ff; /* Light blue background */
}

header {
  background-color: #ffc107; /* Orange header */
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 3em;
  margin: 0;
  color: #fff; /* White text */
}

.shop {
  display: flex;
  flex-direction: row; /* Stack products and cart vertically */
  padding: 20px;
}

.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px;
  text-align: center;
}

.products img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: 10px, 0px, 10px, 0px;
}

.products p {
  font-size: 1.2em;
  margin-bottom: 5px;
}

.price {
  font-weight: bold;
  color: #333;
}

button {
  background-color: #4caf50; /* Green button */
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cart {
  border: 1px solid #ddd;
  padding: 10px;
}
</style>
