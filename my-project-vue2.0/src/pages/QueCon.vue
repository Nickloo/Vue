<template>
  <div class="body-top">
    <nav-header title="问题详情" :back="true"></nav-header>
    <div class="que-box main">
    	<p></p>
    </div>
    <div class="sel width-50">
      <div class="sel-text width-50 text-center" :class="{active:index===1}" @click="changIndex(1)">文字回答</div>
      <div class="sel-voice width-50 text-center" :class="{active:index===2}" @click="changIndex(2)">语音回答</div>
    </div>
    <div class="answ-box main" v-if="this.index==1">
    	<textarea class="fullsrc" name="" id="" cols="30" rows="10"></textarea>
    </div>
    <div class="vioce-box main" v-if="this.index==2">
      这里是录音功能
    </div>
	<button class="sub-btn">提交</button>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
export default {
  name: 'home',
  components:{
  	NavHeader
  },
  data () {
    return {
      index:1
    }
  },
  mounted(){
    // alert('11111')
   
  },
  methods:{
    changIndex(id){
      this.index=id;
    },
    gradeChange(oSelec){
        // var checkText=$("#pid").find("option:selected").text();
        alert(oSelec.value);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.que-box{
	height: 10.0rem;
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
	height: 10.0rem;
	margin-top: 0.5rem;
  padding:1.0rem 0.5rem;
}
.vioce-box{
  /*height: 10.0rem;*/
  margin-top: 0.5rem;
  padding:1.0rem 0.5rem;
}
.sub-btn{
	font-size: 1rem;
	width: 3.5rem;
	margin-top: 0.5rem;
	margin-right: 0.5rem;
	float: right;
  border-radius:0.25rem;
}
</style>
