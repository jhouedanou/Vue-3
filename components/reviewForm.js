// Fichier : reviewForm.js
// Le nom du fichier n'a pas d'importance pour Vue : il sert seulement
// à le charger avec <script src="./components/reviewForm.js"> dans index.html.

// "review-form" = NOM D'ENREGISTREMENT du composant.
// C'est ce nom qu'on utilise comme balise : <review-form></review-form>
app.component("review-form", {
  template:
    /*html*/
    `<form class="mt-8 flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg" @submit.prevent="onSubmit">
    <!-- @submit.prevent (sur <form>) : à l'envoi du formulaire, appelle la méthode
         onSubmit et empêche le rechargement de la page (.prevent) -->
    <h3 class="text-xl font-bold">Leave a review</h3>

    <!-- v-model="name" : relie ce champ à la donnée "name" (dans data).
         Ce que l'utilisateur tape met à jour this.name, et inversement. -->
    <label for="name" class="text-sm font-medium text-slate-600">Name:</label>
    <input id="name" v-model="name" class="-mt-3 rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200">

    <!-- v-model="review" : relié à la donnée "review" -->
    <label for="review" class="text-sm font-medium text-slate-600">Review:</label>
    <textarea id="review" v-model="review" rows="4" class="-mt-3 rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"></textarea>

    <!-- v-model.number="rating" : relié à "rating".
         .number convertit la valeur choisie en nombre (5 au lieu de "5") -->
    <label for="rating" class="text-sm font-medium text-slate-600">Rating:</label>
    <select id="rating" v-model.number="rating" class="-mt-3 rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
    <!--recommandaiton ou no du pdg-->
    <label for="recommandation" class="text-sm font-medium text-slate-600">Recommanderiez-vous ce produit ?:</label>
<div class="flex gap-6">
  <label class="flex items-center gap-2">
    <input type="radio" value="Yes" v-model="recommandation" class="h-4 w-4 accent-slate-800">
    Yes
  </label>
  <label class="flex items-center gap-2">
    <input type="radio" value="No" v-model="recommandation" class="h-4 w-4 accent-slate-800">
    No
  </label>
</div>
    <!-- type="submit" : un clic envoie le formulaire, ce qui déclenche @submit -->
    <input class="cursor-pointer rounded-xl bg-slate-800 px-6 py-3 font-semibold text-white shadow transition hover:bg-slate-700" type="submit" value="Submit">
  </form>`,

  // data = ÉTAT INTERNE du composant : ce que l'utilisateur est en train de saisir
  data() {
    return {
      name: "",
      review: "",
      rating: null,
      recommandation: "",
    };
  },

  methods: {
    // onSubmit = MÉTHODE appelée par @submit.prevent="onSubmit"
    onSubmit() {
      //valdiation basique
      if (
        this.name === "" ||
        this.review === "" ||
        this.rating === null ||
        this.recommandation === ""
      ) {
        alert("Review is incomplete. Please fill out every field.");
        return;
      }
      // productReview = l'OBJET qui regroupe l'avis saisi
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
        recommandation: this.recommandation,
      };

      // $emit envoie un ÉVÉNEMENT au composant parent (ici product-display).
      // "review-submitted" = NOM DE L'ÉVÉNEMENT
      // productReview      = DONNÉE transmise avec l'événement
      // Le parent l'écoute avec : <review-form @review-submitted="..."></review-form>
      this.$emit("review-submitted", productReview);

      // On vide les champs pour un nouvel avis
      this.name = "";
      this.review = "";
      this.rating = null;
      this.recommandation = "";
    },
  },
});
