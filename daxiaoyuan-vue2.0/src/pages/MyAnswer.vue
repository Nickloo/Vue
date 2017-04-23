<template>
  <div class="body padding-bodytop">
      <nav-header title="我的回答" :back="true"></nav-header>
      <div v-for="item in ans_msg">
        <que-list :item="item"></que-list>
      </div>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
import QueList from '../components/QueList'
export default {
  name: 'my-answer',
  components:{
  	NavHeader,QueList
  },
  data () {
    return {
        userId:'',
        user:'',
        ans_msg:[]
    }
  },
  created(){
    this.getUser();
  },
  mounted(){
      this.userId = window.localStorage.userId;
    //   this.user = JSON.parse(window.localStorage.user);
      this.getMsg();
  },
  methods:{
      getUser(){
        $.ajax({
            url:'/api/getUser',
            type:'get',
            dataType:'json',
            data:{
                userId:window.localStorage.userId,
                token:window.localStorage.token,
            },
            success:(data) => {
                if(data.status === 'OK'){
                    this.user = data.data;
                    console.log(data.data);
                }else{
                    alert(data.msg);
                }
                
            },
            error:(error) => {
                console.error(error)
            }
        });
      },
      getMsg(){
        $.ajax({
            url:'/api/getMyAns',
            type:'get',
            dataType:'json',
            crossDomain:true,
            data:{
                userId:window.localStorage.userId,
                page:1
            },
            success:(data) => {
                this.ans_msg = data.data;
                for(let i=0;i<data.data.length;i++){
                    this.ans_msg[i].ans_username = this.user.username;
                    this.ans_msg[i].ans_user_logo = this.user.user_logo;
                }
                console.log(data.data)
            },
            error:(error) => {
                console.error(error)
            }
        });
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
