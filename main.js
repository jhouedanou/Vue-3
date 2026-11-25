const app = Vue.createApp({
  data() {
    return {
      onSale: true,
      cart: 0,
      selectedVariant: 0,
      product: "Socks",
      brand: "Vue Mastery",
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 59,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 0,
        },
      ],
    };
  },
  methods: {
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addToCart() {
      this.cart += 1;
    },
  },
  computed: {
    title() {
      const name = this.brand + " " + this.product;
      return this.onSale ? name + " is on sale " : name;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
  },
});
