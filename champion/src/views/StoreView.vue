<template>
  <section class="shop">
    <div class="products">
      <h2>!בחרו את המתנה שלכם</h2>
      <v-card
        v-for="product in products"
        :key="product.id"
        class="item-card d-flex flex-column justify-center align-center"
        color="primary"
      >
        <v-card-title class="ma-2">
          {{ product.name }}
        </v-card-title>
        <img :src="product.image" alt="" style="border-radius: 10%" />
        <v-card-actions style="align-items: center" class="ma-2">
          <v-btn
            dir="rtl"
            disabled
            v-if="!product.used && !canUserBuyIt(product.price)"
          >
            אין לך מספיק כסף!
          </v-btn>
          <button
            v-else-if="!product.used && canUserBuyIt(product.price)"
            @click="addToCart(product)"
          >
            <v-icon class="ml-2 mb-2" color="white">mdi-hand-coin</v-icon>
            {{ product.price }}
          </button>

          <v-btn v-else disabled>ההטבה מומשה</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </section>
</template>

<script>
import mcdonalds from "../assets/mcdonalds.jpg";
import rebar from "../assets/rebar.png";
import toysrus from "../assets/toysrus.png";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useUsersStore } from "../store/users";
import { nextTick } from "vue";
import { storeToRefs } from "pinia";
import { replaceUser } from "../api/api";
export default {
  setup() {
    const usersStore = useUsersStore();
    const { updateUser } = usersStore;
    const { currentUser } = storeToRefs(usersStore);
    // expose to template and other options API hooks
    return {
      updateUser,
      currentUser,
    };
  },
  data() {
    return {
      products: [
        {
          id: 1,
          name: "ארוחת ילדים חינם במקדונלד'ס",
          image: mcdonalds,
          used: false,
          price: 150,
        },
        {
          id: 2,
          name: "חצי מחיר על הפריט השני בטויס אר אס",
          image: toysrus,
          used: false,
          price: 100,
        },
        {
          id: 3,
          name: "הגדלה חינם בריבר",
          image: rebar,
          price: 80,
          used: false,
        },
      ],
      cart: [],
    };
  },

  methods: {
    canUserBuyIt(productPrice) {
      return productPrice <= this.currentUser.coins;
    },
    async addToCart(product) {
      if (!this.canUserBuyIt(product.price)) {
        Swal.fire({
          title: "אופסי...",
          text: "נראה שאין לך מספיק כסף",
          icon: "error",
          confirmButtonText: "צא",
        });
      } else {
        let randomNumber = "";
        for (let i = 0; i < 9; i++) {
          randomNumber += Math.floor(Math.random() * 10).toString();
        }

        Swal.fire({
          title: "!תהנה מהמתנה",
          text: "הקוד למתנה שלך הוא: " + randomNumber,
          icon: "success",
          confirmButtonText: "צא",
        });

        product.used = true;

        const newUser = {
          ...this.currentUser,
          coins: this.currentUser.coins - product.price,
        };
        this.updateUser(newUser);
        await replaceUser(newUser);
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

.item-card {
  border-radius: 10%;
  margin-bottom: 25px;
  color: "primary";
  width: 100%;
  align-items: center;
  align-content: center !important;
}

.item-card:last-child {
  margin-bottom: 10vh;
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
  background-color: #fcc725; /* Green button */
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
