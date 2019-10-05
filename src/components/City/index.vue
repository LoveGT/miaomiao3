<template>
	<div class="city_body">
		<div class="city_list">
			<Loading v-if="isLoading"></Loading>
			<scroller v-else ref="city_list">
				<div>
					<div class="city_hot">
						<h2>热门城市</h2>
						<ul class="clearfix">
							<li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm,item.id)">{{item.nm}}</li>
						</ul>
					</div>
					<div class="city_sort" ref="city_sort">
						<div v-for="item in cityList" :key="item.index">
							<h2>{{item.index}}</h2>
							<ul>
								<li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm,itemList.id)">{{itemList.nm}}</li>
							</ul>
						</div>
					</div>
				</div>
			</scroller>
		</div>
		<div class="city_index">
			<ul>
				<li v-for="(item,index) in cityList" :key="item.index" @click="handletoIndex(index)">{{item.index}}</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: "City",
		data() {
			return {
				cityList: [],
				hotList: [],
				isLoading:true
			}
		},
		mounted() {
			var cityList = window.localStorage.getItem("cityList")
			var hotList = window.localStorage.getItem("hotList")
			if(cityList&&hotList){
				this.cityList = JSON.parse(cityList)
				this.hotList = JSON.parse(hotList)
				this.isLoading = false 
			}
			else{
				this.axios.get('/api/cityList').then((res) => {
					var msg = res.data.msg
					if(msg === 'ok') {
						this.isLoading = false
						var cities = res.data.data.cities
						//[{index:'A',list:[{nm:'阿城',id:123}]}]
						// 使用了es6的解构
						var {
							cityList,
							hotList
						} = this.formatCityList(cities)
						this.cityList = cityList
						this.hotList = hotList
						window.localStorage.setItem("cityList",JSON.stringify(cityList))
						window.localStorage.setItem("hotList",JSON.stringify(hotList))
					}
				})
			}
		},
		methods: {
			formatCityList(cities) {
				var cityList = []
				var hotList = []

				for(var i = 0; i < cities.length; i++) {
					if(cities[i].isHot === 1) {
						hotList.push(cities[i])
					}
				}
				for(var i = 0; i < cities.length; i++) {
					var firstLetter = cities[i].py.substring(0, 1).toUpperCase()
					if(toCom(firstLetter)) { //新添加index
						cityList.push({
							index: firstLetter,
							list: [{
								nm: cities[i].nm,
								id: cities[i].id
							}]
						})
					} else { //累加的已有的index
						for(var j = 0; j < cityList.length; j++) {
							if(cityList[j].index === firstLetter) {
								cityList[j].list.push({
									nm: cities[i].nm,
									id: cities[i].id
								})
							}
						}
					}
				}
				cityList.sort((n1, n2) => {
					if(n1.index > n2.index) {
						return 1
					} else if(n1.index < n2.index) {
						return -1
					} else {
						return 0
					}

				})

				function toCom(firstLetter) {
					for(var i = 0; i < cityList.length; i++) {
						if(cityList[i].index === firstLetter) {
							return false
						}
					}
					return true
				}
				return {
					cityList,
					hotList
				}
			},
			handletoIndex(index) { 
				console.log(111)
				var h2 = this.$refs.city_sort.getElementsByTagName("h2")
				//				this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
				this.$refs.city_list.toScrollTop(-h2[index].offsetTop)
			},
			handleToCity(nm,id){
				this.$store.commit("city/CITY_INFO",{nm,id})
				// 记录上一次的城市的功能
				window.localStorage.setItem('nowNm',nm)
				window.localStorage.setItem('nowId',id)
				this.$router.push("/movie/hotPlaying")
			}

		}
	}
</script>

<style scope>
	.city_body {
		margin-top: 0px;
		display: flex;
		width: 100%;
		height: 520px;
		/*position: absolute;
		top: 0;
		bottom: 0*/
	}
	
	.city_body .city_list {
		/* flex: 1; */
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: #fff5f0;
		position: relative;
	}
	
	.city_body .city_list::-webkit-scrollbar {
		background-color: transparent;
		width: 0;
	}
	
	.city_body .city_hot {
		margin-top: 20px;
	}
	
	.city_body .city_hot h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 15px;
		background-color: #f0f0f0;
		font-weight: normal;
	}
	
	.city_body .city_hot ul li {
		float: left;
		background-color: #fff;
		width: 29%;
		height: 33px;
		margin-top: 15px;
		margin-left: 3%;
		padding: 0 4px;
		border: 1px solid #E6E6E6;
		line-height: 33px;
		text-align: center;
		box-sizing: border-box;
	}
	
	.city_body .city_sort div {
		margin-top: 20px;
	}
	
	.city_body .city_sort h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		background-color: #f0f0f0;
		font-weight: normal;
	}
	
	.city_body .city_sort ul {
		padding-left: 10px;
		margin-top: 10px;
	}
	
	.city_body .city_sort ul li {
		line-height: 30px;
	}
	
	.city_index {
		width: 20px;
		position: fixed;
		right: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		border: 1px solid #E6E6E6;
	}
</style>