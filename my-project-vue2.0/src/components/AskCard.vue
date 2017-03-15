<template>
  <div class="card-body wrapper">
    <input-box placeholder="标题"></input-box>
    <textarea class="text-box" placeholder="问题内容"></textarea>
    <span class="tishi">*注意：此提问为公共问题，可被所有人查看与回答</span><button class="submit">提交</button>
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
	/*width:100%;*/
	background: #fff;
	padding:0 0.5rem;
}
/*.input-box{
	height: 2.5rem;
	width:100%;
	font-size: 0.9rem;
	padding: 0 0.5rem
}*/
.text-box{
	width:100%;
	height: 7.5rem;
	font-size: 0.8rem;
	/*padding:0.25rem 0.5rem;*/
	/*overflow:auto;*/
	/*background-attachment:fixed;*/
	/*background-repeat:no-repeat;*/
	/*border-style:solid; */
	border-color:#FFFFFF
}
.submit{
	height: 1.4rem;
	width: 3.2rem;
	font-size: 0.75rem;
	float: right;
	border: 0;
	border-radius: 0.25rem
}
.tishi{
	font-size: 0.6rem;
}
</style>
