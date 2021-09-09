<template>
	<div class="home">
		<v-row style="margin-top: 20px; margin-left: 20px">
			<v-btn color="primary" @click="sortItems()">Sort By price</v-btn>
			<v-col col="8" sm="4" justify="center">
				<v-text-field
        flat
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        v-model="search"
	     />
			</v-col>
		</v-row>
		<div id="items">
			<v-row>
				<v-col
				cols="3" 
				sm="3" 
				md="4"
				v-for="item in filtered_items"
				v-bind:key="item.id"
				>
					<v-card
					:loading="loading"
					class="mx-auto my-12"
					max-width="374"
					>
						<template slot="progress">
							<v-progress-linear
							color="deep-purple"
							height="10"
							indeterminate
							></v-progress-linear>
						</template>

						<v-img
						height="250"
						aspect-ratio="1.7"
						contain
						:src="item.src"
						></v-img>

						<v-card-title>{{item.name}}</v-card-title>

						<v-card-text>
						<div class="my-4 subtitle-1">
							$ {{item.price}}
						</div>

						<div>{{item.description}}</div>
						</v-card-text>
						<v-card-actions>
							<v-btn
							color="deep-purple lighten-2"
							text
							@click="addToCard(item)"
							>
								Add To Card
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	// connecting to the firebase database
	import * as firebase from "firebase/app"
	require('firebase/auth')
	require('firebase/database')
	export default {
		name: "home",
		components: {},
		data() {
			return {
				search: "",
				items: [] // all available items
			}
		},
		methods: {
			pushItems(snap) {
				for (let i = 1; i < snap.length; i++) {
					this.items.push(snap[i]);
				}
			},
			// view(ID) {
			// 	this.$router.replace({ path: `/item/${ID}`, params: { id: ID } })
			// },
			addToCard(item) { // adding new item to the card
				var cart = [];
				if (localStorage.getItem('cart') !== null) {
					var get = JSON.parse(localStorage.getItem("cart") || "[]");
					cart = get;
				}
				cart.push(item);
				localStorage.setItem("cart", JSON.stringify(cart)); // update current cart
			},
			sort(l, r) { // recusive implementation of merge sort to sort items by their price
				let tmp = [], mid = (l + r) >> 1;
				if (l == r) {
					tmp.push(this.items[l]);
					return tmp;
				}
				let ls = this.sort(l, mid);
				let rs = this.sort(mid + 1, r);
				let lsz = ls.length, rsz = rs.length, i = 0, j = 0;
				while (i < lsz || j < rsz) {
					if (i == lsz) {
						tmp.push(rs[j++]);
					}
					else if (j == rsz) {
						tmp.push(ls[i++]);
					}
					else {
						if (ls[i].price < rs[j].price) {
							tmp.push(ls[i++]);
						}
						else {
							tmp.push(rs[j++]);
						}
					}
				}
				return tmp;
			},
			sortItems() { 
				this.items = this.sort(0, this.items.length - 1);
			}
		},
		computed: {
			filtered_items() {
				let res = [];
				for (let i = 0; i < this.items.length; i++) { // search items that contain given string
					if (this.search === "" || this.items[i].name.toLowerCase().includes(this.search.toLowerCase())) {
						res.push(this.items[i]);
					}
				}
				return res;
			}
		},
		created() {
			// localStorage.clear();
			firebase.default.database().ref().child("items")
			.get().then((snap) => { // init all items
			  if (snap.exists()) {
			  	this.pushItems(snap.val());
			  } else {
			    console.log("No items available");
			  }
			}).catch((error) => {
			  console.error(error);
			});
		}
	};
</script>
<style >
	div {
		color: inherit;
	}
</style>