<template>
  <div class="header ztc wrapper">
    <span class="back" @click="$router.go(-1)" v-if="back">返回</span>
    <span>{{title}}</span>
  </div>
</template>

<script>
export default {
  name: 'nav-header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:{
  	title:{
  		type:String,
  		default:'',
  	},
    back:{
      type:Boolean,
      default(){
        return false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
	/*height: 200px;*/
	width: 100%;
	height: 2rem;
	line-height: 2rem;
	/*background: #2b8ff7;*/
	font-size: 1.25rem;
	text-align: center;
  color: #fff;
  position: fixed;
  top:0;
  z-index: 1000;
  /*margin-bottom: 5rem;*/
}
.back{
  position: absolute;
  left: 1rem;
  font-size:16px
}
</style>
