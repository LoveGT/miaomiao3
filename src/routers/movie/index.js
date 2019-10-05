export default{
	path:'/movie',
	component:()=> import('@/views/Movie'),
	children: [
		{
			path : "city",
			component: () => import('@/components/City')
		},{
			path : "hotPlaying",
			component: () => import('@/components/HotPlaying')
		},{
			path : "comingSoon",
			component: () => import('@/components/ComingSoon')
		},{
			path : "search",
			component: () => import('@/components/Search')
		},
		{ //动态路由，如果是命名视图，则要用components
			path:"detail/1/:movieId",
			components: {
				default: () => import('@/components/HotPlaying'),
				detail: () => import('@/views/Movie/detail')
			},
			props:{
				detail:true
			}
		},
		{ //动态路由，如果是命名视图，则要用components
			path:"detail/2/:movieId",
			components: {
				default: () => import('@/components/ComingSoon'),
				detail: () => import('@/views/Movie/detail')
			},
			props:{
				detail:true
			}
		},
		{
			path:"/movie",
			redirect:"movie/hotPlaying"
		}
	]
	
}
