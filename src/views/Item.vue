<template>
	<div>
		LMAO
		{{item.name}}
	</div>
</template>
<script>
	import Vue from 'vue'
	import * as firebase from "firebase/app"
	require('firebase/auth')
	require('firebase/database')
	export default {
		name: "item",
		components: {},
		methods: {
			
		},
		data() {
			return {
				id: 0,
				item: {

				}
			}
		},
		created() {
      this.id = this.$route.params.id;
      firebase.default.database().ref().child("items/" + this.id).get().then((snap) => {
			  if (snap.exists()) {
			  	this.item = snap.val();
			  	// console.log(snap.val());
			  } else {
			    console.log("No data available");
			  }
			}).catch((error) => {
			  console.error(error);
			});
    }
	};
</script>