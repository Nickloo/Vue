<template>
  <header>
    <div class="header ztc wrapper">
      <span class="back" @click="$router.go(-1)" v-if="back">返回</span>
      <span>{{title}}</span>
      <span class="ask-dr" size="mini" v-if="isAsk">提问</span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'nav-header',
  data () {
    return {
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
    isAsk:{
      type:Boolean,
      default(){
        return false
      }
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
	/*background: #2b8ff7;*/
	font-size: 1.25rem;
	text-align: center;
  color: #fff;
  position: fixed;
  top:0;
  /*bottom: 2rem;*/
  z-index: 1000;
  /*margin-bottom: 5rem;*/
}
.back,.ask-dr{
  position: absolute;
  font-size:16px
}
.back{
  left: 1rem;
}
.ask-dr{
  right: 1rem;
}
</style>
