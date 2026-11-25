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
    `<div class="card product-card shadow-sm border-0">
      <div class="row g-0 align-items-center">
        <div class="col-md-6 p-4 text-center bg-white">
          <img :src="image" class="img-fluid rounded" :alt="title" />
        </div>

        <div class="col-md-6">
          <div class="card-body p-4 p-lg-5">
            <h1 class="card-title h2 fw-bold mb-3">{{ title }}</h1>

            <div class="d-flex align-items-center gap-2 mb-3">
              <span v-if="inStock" class="badge bg-success">In Stock</span>
              <span v-else class="badge bg-danger">Out of Stock</span>
              <span class="badge bg-light text-dark border">
                Shipping: {{ shipping }}
              </span>
            </div>

            <h2 class="h6 text-uppercase text-muted mt-4">Details</h2>
            <ul class="list-group list-group-flush mb-4">
              <li v-for="detail in details" class="list-group-item px-0">
                {{ detail }}
              </li>
            </ul>

            <h2 class="h6 text-uppercase text-muted">Colors</h2>
            <div class="d-flex gap-2 mb-4">
              <div
                v-for="(variant, index) in variants"
                :key="variant.id"
                @mouseover="updateVariant(index)"
                class="color-circle"
                :class="{ active: index === selectedVariant }"
                :style="{ backgroundColor: variant.color }"
              ></div>
            </div>

            <button
              class="btn btn-primary btn-lg w-100"
              :disabled="!inStock"
              @click="addToCart"
            >
              Add to Cart
            </button>
            <button 
            class="mt-4 btn btn-secondary btn-lg w-100"
            :disabled="!inStock"
            @click="removeFromCart">
            Remove from Cart
            </button>
          </div>
        </div>
      </div>
    </div>`,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      selectedVariant: 0,
      details: ["50% cotton", "30% wool", "20% polyester"],

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
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    removeFromCart() {
      this.$emit("remove-from-cart", this.variants[this.selectedVariant].id);
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
