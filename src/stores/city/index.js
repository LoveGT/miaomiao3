const state ={
	nm: window.localStorage.getItem('nowNm') || "北京",
	id: window.localStorage.getItem('nowId') || 1
}

const action ={
	
}

const mutations = {
	// 规定这里的方法需要大写
	CITY_INFO(state,payload){
		state.nm = payload.nm
		state.id = payload.id
	}
}

export default{
	namespaced:true,
	state,
	action,
	mutations
}