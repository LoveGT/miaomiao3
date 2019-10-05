<template>
	<header id="header">
		<slot></slot>
		<h1>{{title}}</h1>
	</header>
</template>

<script>
	export default {
		name:'Header',
		props:{
			title:{
				type : String,
				default : '喵喵电影'
			}
		}
	}
</script>

<style scoped>
	#header{
		display:flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 50px;
		color: #fff;
		background: #E54847;
		border-bottom: 1px solid #E54847;
		position: relative;
	}
	#header i.icon-zuojiantou{
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		font-size: 30px;
	}
	#header h1{
		font-size: 18px;
		text-align: center;
		line-height: 50px;
		font-weight: normal;
	}
	/*#header i{
		position: absolute;
		left: 5px;
		top: 50%;
		margin-top: -13px;
		font-size: 26px;
	}*/
	
</style>