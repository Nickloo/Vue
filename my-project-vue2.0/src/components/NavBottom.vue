<template>
  <div class="bottom-body wrapper ztc">
  	<div class="bottom">
  		<router-link to="/home">
  			<i class="iconfont home logo" :class="{active:index==1}" @click="changPage(1)">&#xe602;</i>
  		</router-link>
  	</div>
  	<div class="bottom">
  		<router-link to="/consult">
  			<i class="iconfont home logo" :class="{active:index==2}" @click="changPage(2)">&#xe699;</i>
  		</router-link>
  	</div>
  	<div class="bottom">
  		<router-link to="/person">
  			<i class="iconfont home logo" :class="{active:index==3}" @click="changPage(3)">&#xe607;</i>
  		</router-link>
  	</div>
    
    
  </div>
</template>

<script>
export default {
  name: 'nav-bottom',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      index:1
    }
  },
  methods:{
    changPage(id){
      this.index=id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom-body{
	position: fixed;
	bottom:0;
	margin-top: 0.5rem;
	height: 5.0rem;
	width:100%;
	line-height: 5rem;
  color: #fff
}
.bottom{
	overflow: hidden;
	width: 33.33%;
	float: left;
	text-align: center;
}
.logo{
	font-size: 2.5rem;
  color: #fff
}
.home{
	
}
.person{

}
.active{
  color: blue
}
</style>
