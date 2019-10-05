<template>
  <div id="app">
  	<keep-alive><!--切换时会读取缓存，不会重新渲染-->
  		<router-view />
  	</keep-alive>
  </div>
</template>
