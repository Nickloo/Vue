<template>
  <div class="card-body wrapper">
		<!--<button class="ask-btn text-center ztc" @click="open()">{{askBtnText}}</button>-->
		<el-button v-if="!home" class="ask-btn text-center ztc" size="mini" type="primary" @click="open()">{{askBtnText}}</el-button>
		<div v-if="is_ask === 1 || home">
			<!--<input-box placeholder="标题" name = 'title'></input-box>-->
			<el-input v-model="input" placeholder="请输入标题" style="margin-top:.5rem"></el-input>
			<div class="que-type" style="margin:.3rem 0;height:1.5rem;line-height:1.5rem" v-if="!isDaren">
				<el-tag class="float-left" type="gray" size="mini">问题类型</el-tag>
				<el-select class="float-left" style="margin-left:.5rem" v-model="type" clearable placeholder="请选择" size="mini">
					<el-option
					v-for="item in datas"
					:label="item.title"
					:value="item.type">
					</el-option>
				</el-select>
			</div>
			<el-input
				type="textarea"
				:rows="6"
				placeholder="请输入内容"
				v-model="textarea"
				class="text-box">
			</el-input>
			<!--<textarea class="text-box" placeholder="问题内容" name = 'content'></textarea>-->
			<span class="tishi" v-if="!isDaren">*注意：此提问为公共问题，可被所有人查看与回答</span>
			<!--<button class="submit" @click="submit">提交</button>-->
			<el-button class="submit" size="mini" type="primary" @click="submit">提交</el-button>
		</div>
  </div>
</template>

<script>
import InputBox from './InputBox'
export default {
  name: 'ask-card',
  components:{
  	InputBox
  },
  data () {
    return {
     	title:'',
		askBtnText:'提问',
		is_ask:0,
		datas:[],
		textarea:'',
		input:'',
		type:''
    }
  },
  props:{
	  isDaren:{
		  type:Boolean,
		  default(){
			  return false
		  }
	  },
	  darenId:'',
	  home:false
  },
	mounted(){

		$.ajax({
			url: '/api/getColumn',
			type:'get',
			dataType: 'json',
			crossDomain: true,
			cache: true,
			success: function(data) {
						this.datas = data.data
			}.bind(this),
			error: function(xhr, status, err) {
				console.log(err)
			}.bind(this)
		})
	},
	methods:{
		sendMsg(){
			this.$socket.emit('')
		},
		open(){
			if(this.askBtnText === "提问"){
				this.askBtnText = "取消提问";
				this.is_ask = 1;
			}else if(this.askBtnText === "取消提问"){
				this.askBtnText = "提问";
				this.is_ask = 0;
			}
		},
		submit(){
			if(this.daren_id){
				this.type = 'private';
			}
			console.log('提交问题类型'+this.type)
			if(this.input === ''){
				alert('标题不能为空')
				return false
			}else if(this.type === '' && !this.isDaren){
				alert('问题类型不能为空')
				return false
			}else if(this.textarea === ''){
				alert('内容不能为空')
				return false
			}else{
				$.ajax({
					url: '/api/createQue',
					type:'post',
					dataType: 'json',
					crossDomain: true,
					cache: true,
					data:{
						title:this.input,
						content:this.textarea,
						// que_date:new Date().toLocaleDateString(),
						user_id:window.localStorage.userId,
						is_private:this.isDaren?1:0,
						type:this.type,
						daren_id:this.darenId,
					},
					success: function(data) {
						console.log(data);
						if(data.status === 'OK'){
							alert('问题提交成功')
							this.open();
							this.$store.PushQue({
								// username:JSON.parse(window.localStorage.user).username,
								title:this.input,
								content:this.textarea,
								que_date:new Date().toLocaleDateString(),
								que_id:data.data.insertId
							})
							this.input = '';
							this.textarea = '';
							global.getMyque = 0;
							console.log('********************')
						}else{
							alert(data.msg)
						}
					}.bind(this),
					error: function(xhr, status, err) {
						console.log(err)
					}.bind(this)
  				});
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-body{
	background: #fff;
	padding:0 0.5rem;
	padding-bottom:0.5rem
}
.sel-box{
	border:0;
	width: 4rem;
	/*margin-left:0.5rem;*/
	font-size: 0.8rem;
	float:left;
	/*background:*/
	padding: .1rem.4rem;
    border-radius: 6px;
    text-align: center;
}

.text-box{
	margin-top:0.1rem;
	width:100%;
	height: 7.5rem;
	font-size: 0.8rem;
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
.ask-btn{
	width: 100%;
	font-size: .8rem;
	/*border-radius: .5rem*/
}
</style>
