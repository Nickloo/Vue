<template>
  <div class="top-bar">
    <nav-header title="系统消息" :back="true"></nav-header>
    <ul class="main padding-20-20" style="margin-bottom:.1rem" v-for="item in msgData">
      <li>{{item.message}}</li>
      <li style="margin-top:.5rem">
        <time class="float-right">{{item.date}}</time>
      </li>
    </ul>
    
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
        },
        error:(err) => {
          console.error(err);
        }
      })
      for(let i=0;i<this.$store.state.message.length;i++){
        this.setRead(this.$store.state.message[i].id);
        
        console.log(this.$store.state.message[i].id)
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
