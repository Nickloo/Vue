<template>
  <div class="card-body wrapper">
		<button class="ask-btn text-center ztc" @click="open()">{{askBtnText}}</button>
		<div v-if="is_ask === 1">
			<input-box placeholder="标题" name = 'title'></input-box>
			<div style="height:2rem">
				<span style = "float:left;font-size:0.8rem">问题类型</span>
				<select class="sel-box" id="sel-type" name="que_type">
					<option value="all">综合</option>
					<option :value="item.type" v-for="item in datas">{{item.title}}</option>
				</select>
			</div>
			<textarea class="text-box" placeholder="问题内容" name = 'content'></textarea>
			<span class="tishi">*注意：此提问为公共问题，可被所有人查看与回答</span>
			<button class="submit" @click="submit">提交</button>
			
		</div>
		
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
      title:'',
			askBtnText:'提问',
			is_ask:0,
			datas:[
				
			]
    }
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
			console.log('提交问题类型'+$("select[name='que_type']").val())
			if($("input[name='title']").val() === ''){
				alert('标题不能为空')
				return false
			}else if($("textarea[name='content']").val() === ''){
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
						username:JSON.parse(window.localStorage.user).username,
						title:$("input[name='title']").val(),
						content:$("textarea[name='content']").val(),
						que_date:new Date().toLocaleDateString(),
						user_id:JSON.parse(window.localStorage.user).userId,
						is_private:0,
						type:$("select[name='que_type']").val()
					},
          success: function(data) {
              console.log(data);
              if(data.status === 'OK'){
								alert('问题提交成功')
								this.open();
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
	/*width:100%;*/
	/*height:10rem;*/
	background: #fff;
	padding:0 0.5rem;
	padding-bottom:0.5rem
}
/*.input-box{
	height: 2.5rem;
	width:100%;
	font-size: 0.9rem;
	padding: 0 0.5rem
}*/
.sel-box{
	letter-spacing:0.8rem;
	border:0;
	margin-left:0.5rem;
	font-size: 0.8rem;
	float:left;
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
	/*letter-spacing: 1rem*/
}
</style>
