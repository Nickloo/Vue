<template>
  <nav class="bottom-body wrapper ztc">
  	<div class="bottom">
  		<router-link :to="{name:'home'}">
  			<i class="iconfont logo" :class="{active:index==1}" @click="changPage(1)">&#xe602;</i>
  		</router-link>
  	</div>
  	<div class="bottom">
  		<router-link to="/column">
  			<i class="iconfont logo" :class="{active:index==2}" @click="changPage(2)">&#xe699;</i>
  		</router-link>
  	</div>
  	<div class="bottom">
  		<router-link to="/person">
  			<i class="iconfont logo" :class="{active:index==3}" @click="changPage(3)">&#xe607;</i>
  		</router-link>
  	</div>
  </nav>
</template>
<script>
export default {
  name: 'nav-bottom',
  data () {
    return {
      index:'',
    }
  },
  methods:{
    changPage(id){
      this.index=id
    },
    getPath(){
      if(this.$route.path==="/home"){
        this.index=1
      }else if(this.$route.path==="/column"){
        this.index=2
      }else if(this.$route.path==="/person"){
        this.index=3
      }
    }
  },
  mounted(){
    this.getPath();
  },
  watch:{
    $route:function(){
      this.getPath();
    }
  },
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
.active{
  color: blue
}
</style>
