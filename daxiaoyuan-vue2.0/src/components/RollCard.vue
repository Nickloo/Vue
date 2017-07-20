<template>
  <div class="swiper-container part wrapper main">
		<div class="swiper-wrapper ">
		    <div class="swiper-slide fullscr" v-for="obj in roll_datas">
		    	<a :href="obj.link" class="fullscr">
			    	<img class="card-img fullscr" :src="obj.picture" alt="">
			    	<div class="cont-title" style="color:black">{{obj.title}}</div>
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
		roll_datas:[]
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
  created(){
	   $.ajax({
        url:'/api/getNews',
        type:'get',
        dataType:'json',
        success: data => {
          this.roll_datas = data.data;
          console.log('news is',data.data)
        }
      })
  },
  mounted(){
  	var mySwiper = new Swiper ('.swiper-container', {
		    direction: 'horizontal',
		    loop: true,
		    slidesPerView:1,
		    autoplay: 3000,
		    pagination: '.swiper-pagination',
		})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/swiper/swiper.min.css';
.body{
	/*height: 9rem;*/
	background: red;
}

.fullscr{
	height: 100%;
	width: 100%;
}
.swiper-container{
	position: relative;
	height: 8rem;
	padding-bottom: 0;
	text-align: center;
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
