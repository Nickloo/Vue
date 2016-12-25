<template>
  <div class="swiper-container part wrapper">
		<div class="swiper-wrapper ">
		    <div class="swiper-slide fullscr" v-for="obj in data">
		    	<a href="https://www.baidu.com" class="fullscr">
			    	<img class="card-img fullscr" :src="obj.imgurl" alt="">
			    	<div class="cont-title" style="color:black">{{obj.contitle}}</div>
		    	</a>
		    </div>
		</div>
		<div class="swiper-pagination"></div>
  </div>
</template>

<script>
import swiper from '../assets/swiper/swiper.min.js'
export default {
  name: 'roll-card',
  data () {
    return {
    }
  },
  props:{
  	data:{
  		type:Array,
  		default(){
  			return[
  			
  			]
  		}
  	}
  },
  mounted(){
  	var mySwiper = new Swiper ('.swiper-container', {
		    direction: 'horizontal',
		    loop: true,
		    slidesPerView:1,
		    // autoplay: 3000,
		    pagination: '.swiper-pagination',
	})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/swiper/swiper.min.css';
.body{
	height: 20rem;
	background: red;
}

.fullscr{
	height: 100%;
	width: 100%;
}
.swiper-container{
	position: relative;
	height: 20rem;
	padding-bottom: 0;
	text-align: center;
}
.swiper-wrapper{

}
.swiper-slide{

}
.card-img{

}
.cont-title{
	position: absolute;
	width: 100%;
	z-index: 10;
	font-size: 1rem;
	top: 3.45rem;
	font-weight: 700;
	color: #fff;
}
</style>
