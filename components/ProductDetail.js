app.component('product-details', {
	props: {
		details: {
			type: array,
		}
	},

	template:
		/*html*/
		`	<ul>
				<li v-for="detail in details">{{ detail }}</li>
			</ul>`,
	data() {
		return {

		}
	}
})