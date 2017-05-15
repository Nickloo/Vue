<template>
  <header>
    <div class="header ztc wrapper">
      <span class="back" @click="$router.go(-1)" v-if="back">返回</span>
      <span>{{title}}</span>
      <span class="ask-dr" v-if="isSearch"><i class="el-icon-search"  @click="gosearch"></i></span>
      <input type="text" style="height:1.3rem;width:60%;border:0;border-radius: 0.3rem" v-if="isInput" v-model="search_val">
      <span class="ask-dr" v-if="isInput" @click="search(search_val)">确认</span>
      <span class="ask-dr" v-if="password" @click="revPsd">修改密码</span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'nav-header',
  data () {
    return {
      search_val:''
    }
  },
  props:{
  	title:{
  		type:String,
  		default:'',
  	},
    back:{
      type:Boolean,
      default(){
        return false
      }
    },
    isSearch:{
      type:Boolean,
      default(){
        return false
      }
    },
    isInput:{
      type:Boolean,
      default(){
        return false
      }
    },
    search:{
      type:Function
    },
    password:{
      type:Boolean,
      default(){
        return false
      }
    }
  },
  methods:{
    gosearch(){
      this.$router.push('/search')
    },
    revPsd(){
      this.$router.push('/revpsd')
    }
    // search(){
    //   console.log(this.search_val);
    //   $.ajax({
    //     url:'/api/searchQue',
    //     type:'get',
    //     dataType:'json',
    //     data:{
    //       search_val:this.search_val
    //     },
    //     success: data => {
    //       console.log(data.data)
    //     }
    //   })
    // }
  },
  watch:{
    search_val:function(){
      // console.log(this.search_val);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
	/*height: 200px;*/
	width: 100%;
	height: 2rem;
	line-height: 2rem;
	text-align: center;
  color: #fff;
  position: fixed;
  top:0;
  z-index: 1000;
  font-weight: 500;
  
}
.back,.ask-dr{
  position: absolute;
  font-size:0.8rem;
}
.back{
  left: 1rem;
}
.ask-dr{
  right: 1rem;
}
</style>
