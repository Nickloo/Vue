<template>
  <div class="card-body wrapper">
    <input type="text" class="input-box" placeholder="标题">
    <textarea class="text-box" placeholder="问题内容"></textarea>
    <span class="tishi" style="font-size:0.6rem;margin-left:0.5rem">*注意：此提问为公共问题，可被所有人查看与回答</span><button class="button">提交</button>
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
	height:12.5rem;
	width:100%;
	background: #fff;
	/*padding:0 2.5rem;*/
}
.input-box{
	height: 2.5rem;
	width:100%;
	font-size: 0.9rem;
	padding: 0 0.5rem
}
.text-box{
	width:100%;
	height: 7.5rem;
	font-size: 0.75rem;
	padding:0.25rem 0.5rem;
}
.button{
	height: 1.5rem;
	width: 3.5rem;
	font-size: 0.75rem;
	float: right;
}
</style>
