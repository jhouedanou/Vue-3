app.component('review-form',{
	template:
	/*html*/
	`<form class="review-form" @submit.prevent="onSubmit">
    <h3>Leave a review</h3>
    <label for="name">Name:</label>
    <input id="name" v-model="name">

    <label for="review">Review:</label>      
    <textarea id="review" v-model="review"></textarea>
    <label for="rating">Rating:</label>
	<!--dotnumber typecasts the model as a number-->
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
	<p>Would you recommend this product?</p>
	<fieldset >
	<input type="radio" name="recommend" v-model="recommend" value="yes"> Yes
	<input type="radio" name="recommend" v-model="recommend" value="no"> No
	</fieldset>
    <input class="button" type="submit" value="Submit">  
  </form>`,
  data(){
	return{
		name:"",review:"",rating:null,recommend:""
	}
  },
  methods:{
	onSubmit(){
		//validation 
		if(this.name==="" || this.review==="" || this.rating===null){
			alert('Review is incomplete, please fill out every fields');
			return
		}
		let productReview={
			name:this.name,
			review:this.review,
			rating:this.rating,
			recommend:this.recommend,
		}
		this.$emit('review-submitted',productReview)
		this.name=""
		this.review=""
		this.rating=""
		this.recommend=""
	}
  }
})