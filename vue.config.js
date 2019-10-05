module.exports = {
	publicPath:'/mnshop/',
	outputDir:'dist',
	devServer:{
		port:8080,
		host:"localhost",
		proxy:{
			'/api':{
				target:'http://39.97.33.178',
				changeOrigin:true
			}
		}
	}
}
