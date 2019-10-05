<template>
	<div class="move_body">
		<Loading v-if="isLoading"></Loading>
		<scroller v-else>
			<ul>
				<li v-for="item in comingList" :key="item.id">
					<div class="pic_show" @tap="handleToDetail(item.id)"><img :src="item.img|setWH('128.180')"></div>
					<div class="info_list">
						<h2 @tap="handleToDetail(item.id)">{{ item.nm }}<img v-if="item.version" style="height: 20px;" src="@/assets/logo.png"></h2>
						<p><span class="person">{{ item.wish }}</span>人想看</p>
						<p>主演：{{ item.star }}</p>
						<p>{{item.showInfo}}</p>
					</div>
					<div class="btn-pre">
						预售
					</div>
				</li>
			</ul>
		</scroller>
	</div>
</template>

<script>
	export default {
		name: "ComingSoon",
		data() {
			return {
				comingList: [],
				isLoading:true,
				prevCityId:-1
			}
		},
		activated() {
			var cityId = this.$store.state.city.id;
			
			if(this.prevCityId === cityId){
				return;
			}
			this.isLoading = true
			
			console.log(cityId)
			this.axios.get('/api/movieComingList?cityId='+cityId).then((res) => {
				var msg = res.data.msg
				if(msg === 'ok') {
					this.comingList = res.data.data.comingList
					this.isLoading = false
					this.prevCityId = cityId
				}
			})
		},
		methods:{
			handleToDetail(movieId){
				this.$router.push("/movie/detail/2/" + movieId)
			}
		}
	}
</script>

<style scoped="scoped">
	#content .move_body {
		/* flex: 1; */
		height: 520px;
		overflow: auto;
	}
	
	.move_body ul {
		margin: 0 12px;
		overflow: hidden;
	}
	
	.move_body ul li {
		margin-top: 12px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #e6e6e6;
		padding-bottom: 10px;
	}
	
	.move_body .pic_show {
		width: 64px;
		height: 90px;
	}
	
	.move_body .pic_show img {
		width: 100%;
	}
	
	.move_body .info_list {
		margin-left: 10px;
		flex: 1;
		position: relative;
	}
	
	.move_body .info_list img {
		position: absolute;
		top: 24px;
		right: 20px;
	}
	
	.move_body .info_list h2 {
		font-size: 17px;
		line-height: 24px;
		width: 150px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.move_body .info_list p {
		font-size: 13px;
		color: #666;
		line-height: 22px;
		width: 200px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.move_body .info_list .grade {
		font-weight: 700px;
		color: #faaf00;
		font-size: 15px;
	}
	
	.move_body .btn-pre,
	.move_body .btn-pre {
		width: 47px;
		height: 27px;
		line-height: 28px;
		text-align: center;
		background-color: #f03d37;
		color: #fff;
		border-radius: 5px;
		font-size: 12px;
		cursor: pointer;
	}
	
	.move_body .btn-pre {
		background-color: #3C9FE6;
	}
</style>