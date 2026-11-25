app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `<div>
  <!-- div racine : un template a un seul élément racine,
       il entoure la carte produit ET le formulaire d'avis -->

  <!-- ===== CARTE PRODUIT ===== -->
  <div class="overflow-hidden rounded-2xl bg-white shadow-lg">
    <div class="grid md:grid-cols-2">

      <!-- Colonne gauche : l'image.
           v-bind:src="image" : la source vient de la propriété calculée "image" (computed).
           :alt est le raccourci de v-bind:alt -->
      <div class="flex items-center justify-center bg-slate-50 p-8">
        <img v-bind:src="image" :alt="title" class="w-full max-w-sm rounded-xl">
      </div>

      <!-- Colonne droite : les informations -->
      <div class="flex flex-col gap-6 p-8 lg:p-10">

        <!-- {{ title }} : interpolation, affiche la computed "title" (brand + product) -->
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>

        <div class="flex flex-wrap items-center gap-2 text-sm font-medium">
          <!-- v-if / v-else : affiche l'un OU l'autre selon la computed "inStock" -->
          <span v-if="inStock" class="rounded-full bg-green-100 px-3 py-1 text-green-700">In Stock</span>
          <span v-else class="rounded-full bg-red-100 px-3 py-1 text-red-700">Out of Stock</span>
          <!-- "shipping" : computed qui dépend de la PROP "premium" reçue du parent -->
          <span class="rounded-full bg-slate-100 px-3 py-1 text-slate-600">Shipping: {{ shipping }}</span>
        </div>

        <div>
          <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Details</h2>
          <ul class="divide-y divide-slate-100">
            <!-- v-for : crée un <li> pour chaque élément du tableau "details" (data) -->
            <li v-for="detail in details" class="py-2">{{ detail }}</li>
          </ul>
        </div>

        <div>
          <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Colors</h2>
          <div class="flex gap-3">
            <!-- v-for avec index : une pastille par variante.
                 :key        = identifiant unique, aide Vue à suivre chaque élément
                 @mouseover  = au survol, appelle la méthode updateVariant(index)
                 :class      = classes ajoutées si la pastille est la variante sélectionnée
                 :style      = la couleur de fond vient de variant.color -->
            <div
              v-for="(variant, index) in variants"
              :key="variant.id"
              @mouseover="updateVariant(index)"
              class="h-10 w-10 cursor-pointer rounded-full border-2 transition hover:scale-110"
              :class="index === selectedVariant ? 'border-slate-800 ring-2 ring-slate-300' : 'border-slate-200'"
              :style="{ backgroundColor: variant.color }">
            </div>
          </div>
        </div>

        <!-- :disabled  = bouton désactivé quand il n'y a plus de stock
             v-on:click = au clic, appelle la méthode addToCart,
                          qui émet l'événement "add-to-cart" vers le parent (index.html) -->
        <button
          class="w-full rounded-xl bg-slate-800 px-6 py-3 text-lg font-semibold text-white shadow transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          :disabled="!inStock"
          v-on:click="addToCart">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  <!-- ===== FIN CARTE PRODUIT ===== -->
  <!-- ===== LISTE DES AVIS ===== -->
  <review-list v-if="reviews.length" :reviews="reviews"></review-list>


  <!-- ===== FORMULAIRE D'AVIS ===== -->
  <!-- <review-form> = BALISE du composant enregistré sous le nom "review-form"
       (voir app.component("review-form", ...) dans reviewForm.js).
       product-display est son PARENT : c'est ici qu'on pourra écouter
       l'événement qu'il émet, avec @review-submitted="..." -->
  <review-form @review-submitted="addReview"></review-form>
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
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addReview(review) {
      this.reviews.push(review);
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
