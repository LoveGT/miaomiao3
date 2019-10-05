<template>
	<div class="messageBox">
		<h2>{{ title }}</h2>
		<p>{{ content }}</p>
		<div>
			<div @touchstart="handleCancel">{{cancel}}</div>
			<div @touchstart="handleOk">{{ok}}</div>
		</div>
	</div>
</template>

<script>
	name:"MessageBox"
</script>

<style scoped>
	.messageBox{
		z-index: 10;
		width: 200px;
		height: 120px;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #fff;
		box-shadow: 3px 3px 3px 3px #ccc;
		position: absolute;
		top: 50%;
		transform: translateY(-50%); 
		left: 50%;
		transform: translateX(-50%);
	}
	.messageBox h2{
		text-align: center;
		line-height: 40px;
		font-size: 18px;
	}
	.messageBox p{
		text-align: center;
		line-height: 40px;
	}
	.messageBox > div{
		display: flex;
		position: absolute;
		bottom: 0;
		width: 100%;
		border-top: 1px solid #ccc;
	}
	.messageBox > div div{
		flex: 1;
		text-align: center;
		line-height: 30px;
		border-right: 1px solid #ccc;
	}
	.messageBox > div div:last-child{
		border: none;
	}
</style>
