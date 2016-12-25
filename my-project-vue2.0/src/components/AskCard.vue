<template>
  <div class="card-body wrapper">
    <input type="text" class="input-box" placeholder="标题">
    <textarea class="text-box" placeholder="问题内容"></textarea>
    <span class="tishi" style="font-size:1.3rem;margin-left:1rem">*注意：此提问为公共问题，可被所有人查看与回答</span><button class="button">提交</button>
  </div>
</template>

<script>
import InputBox from './funComponents/InputBox'
export default {
  name: 'ask-card',
  components:{
  	InputBox
  },
  data () {
    return {
      title:''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-body{
	height:25.0rem;
	width:100%;
	background: #fff;
	/*padding:0 2.5rem;*/
}
.input-box{
	height: 5.0rem;
	width:100%;
	font-size: 1.8rem;
	padding: 0 1rem
}
.text-box{
	width:100%;
	height: 15.0rem;
	font-size: 1.5rem;
	padding:0.5rem 1.0rem;
}
.button{
	height: 3rem;
	width: 7rem;
	font-size: 1.5rem;
	float: right;
}
</style>
