<template>
	<div class="cinema_body">
		<Loading v-if="isLoading"></Loading>
		<scroller v-else>
			<ul>
				<li v-for="item in cinemaList" :key="item.id">
					<div>
						<span>{{item.nm}}</span>
						<span class="q"><span class="price">{{item.sellPrice}}</span>元起</span>
					</div>
					<div class="address">
						<span>{{item.addr}}</span>
						<span>{{item.distance}}</span>
					</div>
					<div class="card">
						<div v-for="(num,key) in item.tag" v-if="num===1" :key="key" :class="key|classCard">{{key|formatCard}}</div>
						<!-- <div class="or">小吃</div>
				<div class="dl">折扣卡</div> -->
					</div>
				</li>
			</ul>
		</scroller>
	</div>
</template>

<script>
	export default {
		name: 'CiList',
		data() {
			return {
				cinemaList: [],
				isLoading:true,
				prevCityId:-1
			}
		},
		activated() {
			var cityId = this.$store.state.city.id
			if(this.prevCityId === cityId){
				return;
			}
			this.isLoading = true
			
			this.axios.get('/api/cinemaList?cityId='+cityId).then((res) => {
				var msg = res.data.msg
				if(msg === 'ok') {
					this.isLoading = false
					this.cinemaList = res.data.data.cinemas
					this.prevCityId =cityId
				}
			})
		},
		filters: {
			formatCard(key) {
				// 定义数据结构
				var card = [{
						key: 'allowRefund',
						value: '改签'
					},
					{
						key: 'endorse',
						value: '退'
					},
					{
						key: 'sell',
						value: '折扣卡'
					},
					{
						key: 'snack',
						value: '小吃'
					}
				];
				for(var i = 0; i < card.length; i++) {
					if(card[i].key === key) {
						return card[i].value
					}
				}
				return '';
			},
			classCard(key) {
				var card = [{
						key: 'allowRefund',
						value: 'bl'
					},
					{
						key: 'endorse',
						value: 'bl'
					},
					{
						key: 'sell',
						value: 'or'
					},
					{
						key: 'snack',
						value: 'or'
					}
				];
				for(var i = 0; i < card.length; i++) {
					if(card[i].key === key) {
						return card[i].value
					}
				}
				return '';
			}
		}
	}
</script>

<style scoped>
	#content .cinema_body {
		height: 520px;
		flex: 1;
		overflow: auto;
	}
	
	.cinema_body ul {
		padding: 20px;
	}
	
	.cinema_body ul li {
		border-bottom: 1px solid #E6E6E6;
		margin-bottom: 20px;
	}
	
	.cinema_body div {
		margin-bottom: 10px;
	}
	
	.cinema_body .q {
		font-size: 11px;
		color: #F03D37;
	}
	
	.cinema_body .price {
		font-size: 18px;
	}
	
	.cinema_body .address {
		font-size: 13px;
		color: #666;
	}
	
	.cinema_body .address span:nth-of-type(2) {
		float: right;
	}
	
	.cinema_body .card {
		display: flex;
	}
	
	.cinema_body .card div {
		padding: 0 3px;
		height: 15px;
		line-height: 15px;
		border-radius: 2px;
		color: #f90;
		border: 1px solid #f90;
		font-size: 13px;
		margin-right: 5px;
	}
	
	.cinema_body .card div.or {
		color: #FF9900;
		border: 1px solid #f90;
	}
	
	.cinema_body .card div.bl {
		color: #589daf;
		border: 1px solid #589DAF;
	}
</style>