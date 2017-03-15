<template>
  <div class="bottom-body wrapper ztc">
  	<div class="bottom">
  		<router-link to="/home">
  			<i class="iconfont logo" :class="{active:index==1}" @click="changPage(1)">&#xe602;</i>
  		</router-link>
  	</div>
  	<div class="bottom">
  		<router-link to="/consult">
  			<i class="iconfont logo" :class="{active:index==2}" @click="changPage(2)">&#xe699;</i>
  		</router-link>
  	</div>
  	<div class="bottom">
  		<router-link to="/person">
  			<i class="iconfont logo" :class="{active:index==3}" @click="changPage(3)">&#xe607;</i>
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
      index:'',
      pathname:''
    }
  },
  methods:{
    changPage(id){
      this.index=id
    }
  },
  updated(){
    // this.pathname = window.location.pathname
    // if(pathname==="/home"){
    //   this.index=1
    // }else if(pathname==="/consult"){
    //   this.index=2
    // }else if(pathname==="/person"){
    //   this.index=3
    // }
  },
  mounted(){
    this.pathname = window.location.pathname
    // let pathname = window.location.pathname
    if(this.pathname==="/home"){
      this.index=1
    }else if(this.pathname==="/consult"){
      this.index=2
    }else if(this.pathname==="/person"){
      this.index=3
    }
  },
  before(){
    this.pathname = window.location.pathname
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom-body{
	position: fixed;
	bottom:0;
	margin-top: 0.25rem;
	height: 2.5rem;
	width:100%;
	line-height: 2.5rem;
  color: #fff
}
.bottom{
	overflow: hidden;
	width: 33.33%;
	float: left;
	text-align: center;
}
.logo{
	font-size: 1.25rem;
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
