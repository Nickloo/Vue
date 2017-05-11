<template>
  <div class="wrapper body-top">
    <nav-header :back="true" :is-input="true" :search="search"></nav-header>
    <router-link :to="{name:'wenda',params:{id:item.que_id}}" v-for="item in searchMsg">
        <div class="que-con-box wrapper main padding-10-10">
			<h4>{{item.title}}</h4>
            <article class="ans_txt over">
                {{item.content}}
            </article>
        </div>
    </router-link>
    
  </div>
</template>

<script>
import NavHeader from '../../components/NavHeader'
import RollCard from '../../components/RollCard'
import QueList from '../../components/QueList'
export default {
  name: 'home',
  components: {
    NavHeader,QueList
  },
  data () {
    return {
        searchMsg:[]
    }
  },
  mounted(){
    
  },
  methods:{
    search(val){
      console.log(val);
      $.ajax({
        url:'/api/searchQue',
        type:'get',
        dataType:'json',
        data:{
          search_val:val
        },
        success: data => {
          console.log(data.data);
          this.searchMsg = data.data
        }
      })
    }
  },
  watch:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sel-btn-box{
  height: 1.4rem;
  line-height: 1.4rem;
  margin:0 auto;
  border-radius: 0.2rem;
  margin-top: 0.5rem;
  font-size: 14px;
  color: #2b8ff7;
}
.ztc{
  color: #fff;
}
</style>
