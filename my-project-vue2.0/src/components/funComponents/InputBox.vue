<template>
<div class="main wrapper" :style="{padding:padding}">
	<div class="inputbox-body wrapper">
  		<span :id="titleId" class="inputbox-title" :style="{color:TitleColor}">{{title}}</span>
	  	<div class="item-input">
	  		<input v-if="type==='text'" type="text" class="inputbox-text" :placeholder="placeholder" :name="name" :style="{color:TextColor}"></input>
	  		<input v-if="type==='password'" type="password" class="inputbox-text" :placeholder="placeholder" :name="name" :style="{color:TextColor}"></input>
	  	</div>	
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
  		titleId:{type:String,default:null},
		title:{type:String},//输入框的标题
		TitleSize:{type:String},
		btnname:{type:String,default:''},//右侧是否有按钮如果有则写上
		placeholder:{type:String},//输入框默认值
		placewhere:{type:String,default:'right'},
		name:{type:String},//输入框name
		TitleColor:{type:String},//标题颜色
		TextColor:{type:String},//输入字体颜色
		// imodel:{type:String,default:'imodel'},
		value:{type:String},
		type:{type:String,default:'text'},//输入框类型
		padding:{type:String,default:'0'},//输入框padding
		letterSpacing:{type:String,default:'0rem'},//字间距
	},
	mounted(){
		
		if(this.titleId){
			let title = document.getElementById( this.titleId );
			title.style.letterSpacing=this.letterSpacing;
			title.style.wordSpacing="0.0rem"
		}
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
	/*overflow: hidden;*/
	width: 100%;
	height: 2.5rem;
	background-color: #fff;
	font-size: 0.9rem;
}
.inputbox-title{
	float: left;
	line-height: 2.5rem;
	color: #eee;
}
.item-input{
	margin-left: 0.25rem;
	/*mix-width:100%;*/
	display:block;
	overflow :hidden
}
.inputbox-text{
	font-size: 0.9rem;
	float: left;
	color: #000;
	height: 2.5rem;
	padding-left: 0.5rem;
	border:0;
	width: 100%;
}
input:focus{
    border:0;
}

</style>
