<template>
<div id="main">
	<Header title="喵喵影院"></Header>
	<div id="content">
		<div class="cinema_menu">
			<div class="city_switch">
				全城<i class="iconfont icon-xiala"></i>
			</div>
			<div class="brand_switch">
				品牌<i class="iconfont icon-xiala"></i>
			</div>
			<div class="feature_switch">
				特色<i class="iconfont icon-xiala"></i>
			</div>
		</div>		
		 <CiList></CiList>
	</div>
	<TabBar></TabBar>
</div>
</template>

<script>
	import Header from '@/components/Header'
	import TabBar from '@/components/TabBar'
	import CiList from '@/components/CiList'
	export default{
		name:'Cinema',
		components:{
			Header,
			TabBar,
			CiList
		}
	}
</script>

<style>
	#content .cinema_menu{
		width: 100%;
		height: 45px;
		border-bottom: 1px solid #E6E6E6;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background: white;
	}
</style>