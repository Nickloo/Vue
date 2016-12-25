<template>
  <div class="inputbox-body">
  	<span class="inputbox-title" :style="{color:TitleColor}">{{title}}</span>
  	<div class="item-input">
  	<input type="text" class="inputbox-text" :placeholder="placeholder" :name="name" :style="{color:TextColor}" v-model="model"></input>

  	</div>	
  </div>
</template>

<script>
export default {
  name: 'inputbox',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:{
		title:{type:String},//输入框的标题
		TitleSize:{type:String},
		btnname:{type:String,default:''},//右侧是否有按钮如果有则写上
		placeholder:{type:String},//输入框默认值
		placewhere:{type:String,default:'right'},
		name:{type:String},//输入框name
		TitleColor:{type:String},//标题颜色
		TextColor:{type:String},//输入字体颜色
		model:{type:String},
		value:{type:String}
	},
	methods:{
		handleClick(){
			console.log("click the button")
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input::-webkit-input-placeholder {text-align:right}
.inputbox-body{
	overflow: hidden;
	width: 100%;
	height: 10.0rem;
	background-color: #fff;
	font-size: 1.8rem;
}
.inputbox-title{
	float: left;
	line-height: 2.5rem;
	color: #d4d4d4;
}
.item-input{
	margin-left: 0.25rem;
	mix-width:100%;
	display:block;
	overflow :hidden
}
.inputbox-text{
	float: left;
	color: #d4d4d4;
	height: 2.5rem;
	padding-left: 0.5rem;
	border:0;
	width: 100%;
}
input:focus{
    border:0;
}

</style>
