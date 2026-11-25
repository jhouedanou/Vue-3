app.component("cart-list", {
  props: {
    items: { type: Array, required: true },
  },
  /*html*/
  template: `<ul class="list-group">
      <li v-if="!items.length" class="list-group-item text-muted">
        Panier vide
      </li>
      <li v-for="(id, index) in items" :key="index"
          class="list-group-item d-flex justify-content-between">
        Article #{{ id }}
      </li>
    </ul>`,
});
