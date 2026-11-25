app.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true,
    },
  },
  template:
    /*html*/
    `<ul class="list-group list-group-flush mb-3">
      <li v-for="detail in details" class="list-group-item">{{ detail }}</li>
    </ul>`,
  data() {
    return {
      details: ["50% cotton", "30% wool", "20% polyester"],
    };
  },
});
