<template>
	<div id="main">
		<Header title="喵喵电影"></Header>
		<div id="content">
			<div class="movie_menu">
				<router-link tag="div" to="/movie/city" class="city_name">
					<span>{{$store.state.city.nm}}</span><i class="iconfont icon-xiala"></i>
				</router-link>
				<div class="hot_switch">
					<router-link tag="div" to="/movie/hotPlaying" class="hot_item">正在热映</router-link>
					<router-link tag="div" to="/movie/comingSoon" class="hot_item">即将上映</router-link>
				</div>
				<router-link tag="div" to="/movie/search" class="search_entry">
					<i class="iconfont icon-sousuo"></i>
				</router-link>
			</div>
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
		<TabBar></TabBar>
		<!-- 命名视图路由 -->
		<router-view name="detail"></router-view>
	</div>
</template>

<script>
	import Header from '@/components/Header'
	import TabBar from '@/components/TabBar'
	import {
		messageBox
	} from '@/components/JS'
	export default {
		name: 'Movie',
		components: {
			Header,
			TabBar,
		},
		mounted() {
			setTimeout(() => {
				this.axios.get('/api/getLocation').then((res) => {
					var msg = res.data.msg
					if (msg === 'ok') {
						var nm = res.data.data.nm
						var id = res.data.data.id
						// this.$store.state.city.id是字符串
						// id是数字，不能用===
						if(this.$store.state.city.id == id){
							return;
						}
						messageBox({
							title: "定位",
							content: nm,
							cancel: "取消",
							ok: '切换定位',
							handleCancel() {
								console.log("cancel")
							},
							handleOk() {
								// 改变本地存储的城市名称
								window.localStorage.setItem('nowNm',nm)
								window.localStorage.setItem('nowId',id)
								window.location.reload()
							}
						})
					}
				})
			}, 3000)


		}
	}
</script>

<style scoped>
	#content .movie_menu {
		width: 100%;
		height: 45px;
		border-bottom: 1px solid #E6E6E6;
		display: flex;
		justify-content: space-between;
	}

	.movie_menu .city_name {
		margin-left: 20px;
		height: 100%;
		line-height: 45px;
	}

	.movie_menu .city_name.active {
		color: #ef4238;
		border-bottom: 2px solid #EF4238;
	}

	.movie_menu .city_name.router-link-active {
		border-bottom: 2px solid #EF4238;
	}

	.movie_menu .hot_switch {
		display: flex;
		height: 100%;
		line-height: 45px;
	}

	.movie_menu .hot_item {
		font-size: 15px;
		color: #666;
		width: 80px;
		text-align: center;
		margin: 0 12px;
		font-weight: 700p;
	}

	.movie_menu .hot_item.active {
		color: #EF4238;
		border-bottom: 2px solid #EF4238;
	}

	.movie_menu .hot_item.router-link-active {
		color: #EF4238;
		border-bottom: 2px solid #EF4238;
	}

	.movie_menu .search_entry {
		margin-right: 20px;
		height: 100%;
		line-height: 45px;
	}

	.movie_menu .search_entry.active {
		color: #EF4238;
		border-bottom: 2px solid #EF4238;
	}

	.movie_menu .search_entry.router-link-active {
		color: #EF4238;
		border-bottom: 2px solid #EF4238;
	}

	.movie_menu .search_entry i {
		font-size: 24px;
		color: red;
	}
</style>
