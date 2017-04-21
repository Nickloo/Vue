<template>
  <el-table :data="applyData" style="width: 80%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" class="userMsg-card">
                        <el-form-item label="" style="margin-bottom:.5rem">
                            <div class="user-logo">
                                <img class="fullscr" :src="props.row.user_logo">
                            </div>
                        </el-form-item>
                        <el-form-item label="申请类型">
                            <span>{{ props.row.identy_type }}</span>
                            <!--<span>{{ props.row.identy_type }}</span>-->
                        </el-form-item>
                        <el-form-item label="申请介绍">
                            <span>{{ props.row.introduction }}</span>
                        </el-form-item>
                        <el-form-item label="证件照">
                            <img src="../../assets/imgs/default.png" alt="">
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="userId" label="用户ID" width="180">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="180">
            </el-table-column>
            </el-table-column>
            <el-table-column label="操作" align="right">
                <template scope="scope">
                    <el-button size="small" type="danger" @click="decideApply(scope.$index, scope.row,1)">同意</el-button>
                    <el-button size="small" type="danger" @click="decideApply(scope.$index, scope.row,0)">拒绝</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  name: 'home',
  components:{
  	
  },
  data () {
    return {
      applyData: []
    }
  },
  mounted(){
      this.getApply();
  },
  methods:{
      decideApply(index, row,type){
        console.log(type+"**************");
        console.log(row.index);
        let str = type===0?'拒绝':'同意'
        if(confirm('确认进行'+ str +'操作？')){
            $.ajax({
                url:'/api/decideApply',
                type:'post',
                dataType:'json',
                data:{
                    userId:row.userId,
                    introduction:row.introduction,
                    identy_type:row.identy_type,
                    index:row.index,
                    type:type,
                    token:window.localStorage.token
                },
                success:(data)=>{
                    alert(data.msg);
                    if(data.status === 'OK'){
                        this.getApply();
                        console.log('OK');
                    }
                },error:(err) => {
                    console.error(err);
                }
            });
        }
      },
      getApply(){
          $.ajax({
              url:'/api/getApply',
              type:'get',
              dataType:'json',
              data:{
                  token:window.localStorage.token
              },
              success:(data) => {
                  this.applyData = data.data;
                  console.log(data.data);
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
