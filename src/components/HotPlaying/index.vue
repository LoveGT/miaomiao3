<template>
	<div class="move_body" ref="move_body">
		<Loading v-if="isLoading"></Loading>
		<Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
			<ul>
				<li class="pullDown">{{pullDownMsg}}</li>
				<li v-for="item in movieList" :key="item.id">
					<div class="pic_show" @tap="handleToDetail(item.id)"><img :src="item.img|setWH('128.180')"></div>
					<div class="info_list">
						<h2 @tap="handleToDetail(item.id)">{{ item.nm }}</h2>
						<p>观众评分<span class="grade">{{ item.sc }}</span><img v-if="item.version" width="20px" src="@/assets/logo.png"></p>
						<p>主演：{{ item.star }}</p>
						<p>{{ item.showInfo }}</p>
					</div>
					<div class="btn-mall">
						购票
					</div>
				</li>
			</ul>
		</Scroller>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	export default {
		name: "HotPlaying",
		data() {
			return {
				movieList: [],
				pullDownMsg: "",
				isLoading:true,
				// 上一次的城市ID
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
			
			this.axios.get('/api/movieOnInfoList?cityId='+cityId).then((res) => {
				var msg = res.data.msg
				if (msg === 'ok') {
					this.movieList = res.data.data.movieList
					this.isLoading = false
					this.prevCityId = cityId
				}
			})
		},
		methods: {
			handleToDetail(movieId) {
				this.$router.push("/movie/detail/1/" + movieId)
			},
			handleToScroll(pos) {
				if (pos.y > 30) {
					this.pullDownMsg = "正在更新中。。。"
				}
			},
			handleToTouchEnd(pos) {
				if (pos.y > 30) {
					this.axios.get('/api/movieOnInfoList?cityId=11').then((res) => {
						var msg = res.data.msg
						if (msg === 'ok') {
							this.pullDownMsg = "更新成功！"
							setTimeout(() => {
								this.movieList = res.data.data.movieList
								this.pullDownMsg = ""
							}, 1000)
						}
					});
				}
			}
		}
	}
</script>

<style scoped>
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

	.move_body .info_list h2 {
		font-size: 17px;
		line-height: 24px;
		width: 150px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.move_body .info_list img {
		position: absolute;
		right: 20px;
		top: 24px;
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

	.movie_menu .btn-mall {
		width: 47px;
		height: 27px;
		line-height: 28px;
		text-align: center;
	}

	.move_body .btn-mall,
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
		background-color: #3c9fe6;
	}

	.move_body .pullDown {
		padding: 0;
		margin: 0;
		border: none;
	}
</style>
