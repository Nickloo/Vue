<template>
  <div class="body-top">
    <nav-header title="问题详情" :back="true"></nav-header>
    <div class="que-box main">
    	
    </div>
    <div class="answ-box main">
    	<textarea class="fullsrc" name="" id="" cols="30" rows="10"></textarea>
    </div>
	<button class="sub-btn">提交</button>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
export default {
  name: 'home',
  components:{
  	NavHeader
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea{
	outline: none;
}
.que-box{
	height: 10.0rem
}
.answ-box{
	height: 10.0rem;
	margin-top: 5rem
}
.sub-btn{
	font-size: 1rem;
	width: 3.5rem;
	margin-top: 0.5rem;
	margin-right: 0.5rem;
	float: right;
}
</style>
