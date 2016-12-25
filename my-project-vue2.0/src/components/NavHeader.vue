<template>
  <div class="header ztc wrapper">
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
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
	/*height: 200px;*/
	width: 100%;
	height: 5rem;
	line-height: 5rem;
	/*background: #2b8ff7;*/
	font-size: 2.5rem;
	text-align: center;
  color: #fff
}
</style>
