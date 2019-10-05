<template>
	<div id="detailContainer" class="enter-slide-active">
		<Header title="影片详情">
			<i class="iconfont icon-zuojiantou" @touchstart="handleToBack"></i>
		</Header>
		<div id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="detailMovie.img |setWH('148.208')" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{detailMovie.nm}}</h2>
						<p>{{detailMovie.enm}}</p>
						<p>{{detailMovie.sc}}</p>
						<p>{{detailMovie.cat}}</p>
						<p>{{detailMovie.src}}/{{detailMovie.dur}}分钟</p>
						<p>{{detailMovie.pubDesc}}</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>{{detailMovie.dra}}</p>
			</div>
			<div class="detail_player swiper_container" ref="detail_player">
				<ul class="swiper_wrapper">
					<li class="swiper_slide"  v-for="item in detailMovie.photos">
						<div>
							<img :src="item|setWH('40.27')" alt="">
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from "@/components/Header"
	export default{
		name:"Detail",
		data() {
			return {
				detailMovie: {}
			}
		},
		components:{
			Header
		},
		props:['movieId'],
		methods: {
			handleToBack() {
				this.$router.back()
			},
			getData() {
				this.axios.get("/api/detailmovie?movieId=" + this.movieId).then((res) => {
					var msg = res.data.msg
					if(msg === 'ok'){
						// 可以优化下 筛选出只需要的数据
						this.detailMovie = res.data.data.detailMovie
						//数据加载完才开始下一步
						this.$nextTick(()=>{
							new Swiper(this.$refs.detail_player,{
								slidesPerView:'auto',
								freeMode:true,
								freeModeSticky:true
							});
						});
					}
				})
			}
		},
		mounted(){
			this.getData()
		}
	}
</script>

<style scoped>
	#detailContainer{
		position: absolute;
		left: 0;
		top: 0;
		z-index: 100;
		width: 100%;
		min-height: 100%;
		background-color: #fff;
	}
	#detailContainer.enter-slide-active{
		animation: slideMove .3s;
	}
	@keyframes slideMove{
		0%{transform: translateX(100%);}
		100%{transform: translateX(0);}
	}
	#content .contentDetail{
		display: block;
		margin-bottom: 0;
	}
	#content .detail_list{
		height: 200px;
		width: 100%;
		position: relative;
		overflow: hidden;
	}
	.detail_list .detail_list_bg{
		width: 100%;
		height: 100%;
		background: url() 0 40%;
		filter: blur(20px);
		background-color: deepskyblue;
	}
	.detail_list .detail_list_filter{
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: #40454d;
		opacity: .55;
		position: relative;
	}
	.detail_list .detail_list_content{
		display: flex;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
	}
	.detail_list .detail_list_img{
		width: 108px;
		height: 150px;
		border: 1px solid #f0f2f3;
		margin: 20px;
	}
	.detail_list .detail_list_img img{
		width: 100%;
		height: 100%;
	}
	.detail_list .detail_list_info{
		margin: 20px;
	}
	.detail_list .detail_list_info h2{
		font-size: 20px;
		color: #e62135;
		font-weight: normal;
		line-height: 40px;
	}
	.detail_list .detail_list_info p{
		color: #fff;
		line-height: 20px;
		font-size: 14px;
		color: #ccc;
	}
	#content .detail_intro{
		padding: 10px;
	}
	#content .detail_player{
		margin: 20px;
		border: 1px solid red;
	}
	li.swiper_slide div{
		width: 70px;
		 height: 80px; 
		margin-right: 20px;
		text-align: center;
		font-size: 14px;
	}
	.detail_player .swiper_slide img{
		width: 100%;
		height: 100%;
		margin-bottom: 5px;
	}
	.detail_player .swiper_slide p:nth-of-type(2){
		color: #999;
	}
	.detail_player .swiper_wrapper {
	 	display: flex;
		justify-content: flex-start;
		/* align-items: center; */
	}
</style>
