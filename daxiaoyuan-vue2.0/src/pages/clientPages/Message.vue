<template>
  <div class="top-bar">
    <nav-header title="系统消息" :back="true"></nav-header>
    <ul class="main padding-20-20" :class="{noread:item.status==0}" style="margin-bottom:.1rem" v-for="item in msgData" @click="goQue(item.message,item.que_id)">
      <!--<router-link :to="{name:'my_quecon',params:{que_id:item.que_id}}">-->
        <li>{{item.message}}</li>
        <li style="margin-top:.5rem">
          <time class="float-right">{{item.date}}</time>
        </li>
      <!--</router-link>-->
    </ul>

  </div>
</template>

<script>
import NavHeader from '../../components/NavHeader'
export default {
  name: 'home',
  components:{
  	NavHeader
  },
  data () {
    return {
      msgData:[]
    }
  },
  mounted(){

      $.ajax({
        url:'/api/getMessage',
        type:'get',
        dataType:'json',
        data:{
          userId:window.localStorage.userId,
          isAll:true
        },
        success:(data) => {
          this.msgData = data.data;
          console.log(this.msgData)
        },
        error:(err) => {
          console.error(err);
        }
      })
      if(this.$store.state.message.length){
        for(let i=0;i<this.$store.state.message.length;i++){
          this.setRead(this.$store.state.message[i].id);
          console.log(this.$store.state.message[i].id)
        }
      }
      
  },
  methods:{
    setRead(id){
      $.ajax({
        url:'/api/setRead',
        type:'post',
        dataType:'json',
        data:{
          id:id
        },
        success:(data) => {

        },
        error:(err) => {
          console.error(err);
        }
      })
    },
    goQue(msg,que_id){
      console.log(msg[2]);
      if(msg[2]==="回"){
        this.$router.push({name:'my_quecon',params:{que_id}});
      }else{
        this.$router.push({name:'quecon',params:{que_id}});
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.noread{
  background: #b3d9f6
}
</style>
