const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: true,
      toast: null,
    };
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
      this.toast = "article ajouté au panier";
      setTimeout(() => {
        this.toast = null;
      }, 3000);
    },
  },
});
