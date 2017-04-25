<template>
  <div class="body">
    <el-select
    v-if="isSearch"
        v-model="school"
        filterable
        remote
        :placeholder="value"
        :remote-method="getSchool"
        :name = 'name'>
        <el-option
        v-for="item in options"
            :key="item.name"
            :label="item.name"
            :value="item.name">
        </el-option>
    </el-select>
    <el-select v-if="!isSearch" v-model="identy_type" :placeholder="placeholder" :disabled="disabled">
        <el-option
        v-for="item in column"
        :label="item.type"
        :value="item.type">
        <span style="float: left">{{ item.type }}</span>
        <span style="float: right; color: #8492a6;">{{ item.title }}</span>
        </el-option>
    </el-select>
  </div>
</template>

<script>
import { Loading } from 'element-ui'; 
export default {
  name: 'search-select',
  components:{
  	
  },
  data () {
    return {
      school:'',
      identy_type:'',
      options:[],
      
    }
  },
  props:{
    value:'',
    isSearch:true,
    column:'',
    placeholder:'',
    disabled:false,
    name:''
  },
  methods:{
      getSchool(query){
            if(query.length>=2)
            $.ajax({
                url:'/api/getschool',
                type:'get',
                dataType:'json',
                data:{
                    name:query
                },
                success: data => {
                    this.options = data.data;
                },
                error: err => {
                    console.error(err);
                }
            })
    }
  },
  watch:{
      school:function(){
          console.log(this.school+"$$$$$$$$$$$$$");
          global.school = this.school;
      },
      identy_type:function(){
          console.log(this.identy_type+"$$$$$$$$$$$$$");
          global.identy_type = this.identy_type;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
