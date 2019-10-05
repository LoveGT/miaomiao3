<template>
	<div class="search_body">
		<div class="search_input">
			<div class="search_input_wapper">
				<i class="iconfont icon-sousuo"></i>
				<input type="text" v-model="message" />
			</div>
		</div>
		<div class="search_result">
			<h3>电影/电视剧、综艺</h3>
			<ul>
				<li v-for="item in moviesList" :key="item.id">
					<div class="img"><img :src="item.img|setWH('128.180')" /></div>
					<div class="info">
						<p><span>{{item.nm}}</span><span>{{item.sc}}</span></p>
						<p>{{item.enm}}<img v-if="item.version" src="@/assets/logo.png"></p>
						<p>{{item.cat}}</p>
						<p>{{item.rt}}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Search",
		data() {
			return {
				moviesList: [],
				message: ""
			}
		},
		methods: {
			// axios终止多次请求的方式
			cancelRequest() {
				if (typeof this.source === 'function') {
					this.source('终止请求')
				}
			}
		},
		watch: {
			message(newVal) {
				var that = this
				// 取消上一次请求
				this.cancelRequest();
				
				// var CancelToken = this.axios.CancelToken
				// var source = CancelToken.source()

				this.axios.get('/api/searchList?cityId=10&kw=' + newVal, {
					cancelToken: new this.axios.CancelToken(function executor(c) {
						that.source = c
					})
				}).then((res) => {
					var msg = res.data.msg
					var movies = res.data.data.movies
					if (msg && movies) {
						this.moviesList = res.data.data.movies.list
					}
				}).catch((err) => {
					if (this.axios.isCancel(err)) {
						console.log('Rquest canceled', err.message); //请求如果被取消，这里是返回取消的message
					} else {
						//handle error
						console.log(err);
					}
				})
			}
		}
	}
</script>

<style scoped>
	#content .search_body {
		flex: 1;
		overflow: auto;
	}

	.search_body .search_input {
		padding: 8px 10px;
		background-color: #f5f5f5;
		border-bottom: 1px solid #e5e5e5;
	}

	.search_body .search_input_wapper {
		padding: 0 10px;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		background-color: #fff;
		display: flex;
		line-height: 40px;
	}

	.search_body .search_input_wapper i {
		font-size: 16px;
		padding: 4px 0;
	}

	.search_body .search_input_wapper input {
		border: none;
		font-size: 13px;
		color: #333;
		padding: 4px 0;
		outline: none;
		margin-left: 5px;
		width: 100%;
	}

	.search_body .search_result h3 {
		font-size: 15px;
		color: #999;
		padding: 9px 15px;
		border-bottom: 1px solid #E6E6E6;
	}

	.search_body .search_result li {
		border-bottom: 1px dashed #c9c9c9;
		padding: 10px 15px;
		box-sizing: border-box;
		display: flex;
	}

	.search_body .search_result .img {
		width: 60px;
		float: left;
	}

	.search_body .search_result .img img {
		width: 100%;
	}

	.search_body .search_result .info {
		float: left;
		margin-left: 15px;
		flex: 1;
	}

	.search_body .search_result p {
		height: 22px;
		display: flex;
		line-height: 22px;
		font-size: 12px;
	}

	.search_body .search_result .info img {
		height: 20px;
		position: absolute;
		right: 70px;
	}

	.search_body .search_result p:nth-of-type(1) span:nth-of-type(1) {
		font-size: 18px;
		flex: 1;
	}

	.search_body .search_result p:nth-of-type(1) span:nth-of-type(2) {
		font-size: 16px;
		color: #fc7103;
	}
</style>
