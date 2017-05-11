<template>
  <div class="body-top">
    <nav-header title="问题详情" :back="true"></nav-header>
    <div class="que-box main">
      <h3>{{queData.title}}</h3>
    	<p>{{queData.content}}</p>
    </div>
    <!--问题的回答-->
    <div class="ans-list">

    </div>
    <!--选择回答类型-->
    <div class="sel width-50">
      <div class="sel-text width-50 text-center" :class="{active:index===0}" @click="changIndex(0)">文字回答</div>
      <div class="sel-voice width-50 text-center" :class="{active:index===1}" @click="changIndex(1)">语音回答</div>
    </div>
    <!--文字回答-->
    <div class="answ-box main" v-if="this.index==0">
    	<el-input
        type="textarea"
        :rows="8"
        :placeholder="placeholder"
        v-model="answer_con"
        :disabled="can_ans">
      </el-input>
    </div>
    <!--语音回答-->
    <div class="vioce-box main" v-if="this.index==1">
      这里是录音功能
    </div>
	<el-button class="sub-btn" type="primary" @click="submit">提交</el-button>
  <!--<textarea class="" name="" id="" cols="30" rows="10"></textarea>-->
  </div>
</template>

<script>
import NavHeader from '../../components/NavHeader'
export default {
  name: 'que-con',
  components:{
  	NavHeader
  },
  data () {
    return {
      index:0,
      que_id:'',
      queData:{},
      voice_src:'',
      que_con:'',
      que_title:'',
      answer_con:'',
      que_userId:'',
      can_ans:false,
      placeholder:'请输入内容。。。'
    }
  },
  mounted(){

    this.que_id = this.$route.params.que_id
    console.log(this.$route.params.que_id+"###############")
    $.ajax({
        url: '/api/getQuestion/queCon',
        type:'get',
        dataType: 'json',
        crossDomain: true,
        cache: true,
        data: {que_id:this.$route.params.que_id},
        success: function(data) {
            console.log(data);
            if(data.status === 'OK'){
              this.queData = data.data;
              this.que_title = data.data.title;
              this.que_con = data.data.content;
              this.que_userId = data.data.user_id;
              console.log('que_userId:',this.que_userId);
              if(window.localStorage.userId === JSON.stringify(this.que_userId)){
                this.can_ans = true;
                this.placeholder = "这是你自己的问题。。。。。。"
              }
            }else{
              alert(data.msg)
            }
        }.bind(this),
        error: function(xhr, status, err) {
            console.log(err)
        }.bind(this)
    });

  },
  methods:{
    changIndex(id){
      this.index=id;
    },
    gradeChange(oSelec){
        alert(oSelec.value);
    },
    submit(){
      console.log("提交"+window.localStorage.userId)
      if(window.localStorage.userId === JSON.stringify(this.que_userId)){
        alert('不能回答自己的提问');
        return false;
      }else if(this.answer_con === '' && this.index === 0){
        alert('回答内容不能为空');
        return false
      }else{
        $.ajax({
          url: '/api/answer',
          type:'post',
          dataType: 'json',
          crossDomain: true,
          cache: true,
          data: {
            ans_con:this.answer_con,
            que_id:this.que_id,
            user_id:window.localStorage.userId,
            is_voice:this.index,
            voice_src:this.voice_src,
            que_con:this.que_con,
            que_title:this.que_title
          },
          success: function(data) {
              console.log(data);
              if(data.status === 'OK'){
                alert('回答成功');
                this.$router.go(-1)
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
.que-box{
	/*height: 10.0rem;*/
  padding:.5rem .5rem;
  margin-bottom: 0.5rem
}
.sel{
  height: 1.8rem;
  line-height: 1.8rem;
  margin:0 auto;
  background: #fff;
  border-radius: 0.5rem;
  overflow: hidden;
}
.sel-text{
  float:left;

}
.sel-voice{
  float: left;
}
.active{
  color: #fff;
  font-weight: 600;
  background: #2b8ff7;
}
.answ-box{
	/*height: 4.0rem;*/
	margin-top: 0.5rem;
  padding:1.0rem 0.5rem;
}
.vioce-box{
  /*height: 10.0rem;*/
  margin-top: 0.5rem;
  padding:1.0rem 0.5rem;
}
.sub-btn{
	font-size: .8rem;
  padding:.2rem .5rem;
	/*width: 3.5rem;*/
	margin-top: 0.5rem;
	margin-right: 0.5rem;
	float: right;
  /*border-radius:0.25rem;*/
}
</style>
