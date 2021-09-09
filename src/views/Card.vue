<template>
	<v-app>
		<h4>Total Price: {{sum}}</h4>
			<v-data-table
	    :headers="headers"
	    :items="items"
	    v-model="selected"
	    item-key="name"
      show-select
	    class="elevation-1"
	    :hide-default-footer="true"
	  >
	  	
	  </v-data-table>
	  <br>
	  <div>
      <v-btn color="primary" @click="deleteItem">Delete</v-btn>
    </div>
	</v-app>
</template>

<script>
	import Vue from 'vue'
	import * as firebase from "firebase/app"
	require('firebase/auth')
	require('firebase/database')
	export default {
		name: "card",
		components: {},
		data() {
			return {
				items: [],
				selected: [],
				headers: [
          { text: 'Name', value: 'name'},
          { text: 'Price', value: 'price' },
        ]
			}
		},
		computed: {
			sum() {
				let res = 0;
				this.items.forEach(item => res += item.price);
				return res;
			}
		},
		methods: {
			deleteItem () {
		  	if(this.selected.length > 0 && 
		  		confirm('Are you sure you want to delete this item?')){
				  for(var i = 0; i <this.selected.length; i++){
			      const index = this.items.indexOf(this.selected[i]);
			      this.items.splice(index, 1);
				  }
				  this.selected = []
				  localStorage.setItem("cart", JSON.stringify(this.items));
				  var cart = [];
					if (localStorage.getItem('cart') !== null) {
						var get = JSON.parse(localStorage.getItem("cart") || "[]");
						cart = get;
					}
					this.items = cart;
    		}
    	}
		},
		created() {
			// localStorage.clear();
			var cart = [];
			if (localStorage.getItem('cart') !== null) {
				var get = JSON.parse(localStorage.getItem("cart") || "[]");
				cart = get;
			}
			this.items = cart;
		}
	}
</script>

<style scoped>
	#app {
		margin: 100px auto;
	}
</style>