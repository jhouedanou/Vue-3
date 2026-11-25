app.component("review-list", {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  template:
    /*html*/
    `
  <div class="mt-8 rounded-2xl bg-white p-8 shadow-lg">
    <!-- Même style de carte que la fiche produit et le formulaire d'avis -->
    <h3 class="mb-4 text-xl font-bold">
      Reviews
      <!-- reviews.length : nombre d'avis reçus via la PROP "reviews" -->
      <span class="ml-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">{{ reviews.length }}</span>
    </h3>

    <ul class="divide-y divide-slate-100">
      <!-- v-for : un <li> par avis du tableau "reviews" -->
      <li v-for="(review, index) in reviews" :key="index" class="py-4">
        <div class="flex items-center justify-between">
          <span class="font-semibold">{{ review.name }}</span>
          <!-- review.rating : la note choisie dans le formulaire -->
          <span class="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
            {{ review.rating }} ★
          </span>
        </div>
        <p class="mt-2 italic text-slate-600">"{{ review.review }}"</p>
        <br />
                <hr />
        <br />
        <p>Recommanderiez vous ce produit ?</p>
        <p class="font-semibold">{{review.recommandation}}</p>
      </li>
    </ul>
  </div>
`,
});
