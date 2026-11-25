app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["add-to-cart"],
  template:
    /*html*/
    `<div class="card shadow-sm h-100">
      <img :src="image" class="card-img-top" :alt="title" />
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text text-muted">Shipping: {{ shipping }}</p>
        <span v-if="inStock" class="badge bg-success mb-3">In Stock</span>
        <span v-else class="badge bg-danger mb-3">Out of Stock</span>

        <product-details :details="details"></product-details>

        <div class="d-flex gap-2 mb-3">
          <div
            v-for="(variant, index) in variants"
            :key="variant.id"
            @mouseover="updateVariant(index)"
            class="color-circle border"
            :style="{ backgroundColor: variant.color }"
          ></div>
        </div>

        <button
          class="btn btn-primary w-100"
          :disabled="!inStock"
          @click="addToCart"
        >
          Add to Cart
        </button>
      </div>
    </div>`,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      selectedVariant: 0,

      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 50,
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
    addToCart() {
      this.$emit("add-to-cart");
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
});
