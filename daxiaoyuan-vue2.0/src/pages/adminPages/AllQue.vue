<template>
    <div>
        <el-input placeholder="请输入内容" v-model="searchVal" style="width: 50%;margin:0 0 .1rem 0">
                <el-select v-model="searchType" slot="prepend" placeholder="请选择" style="width:6rem">
                    <el-option label="全部" value="all"></el-option>
                    <el-option label="问题标题" value="title"></el-option>
                    <el-option label="问题类型" value="type"></el-option>
                </el-select>
                <el-button slot="append" icon="search" @click="search()"></el-button>
        </el-input>
        <el-table :data="quesData" style="width: 80%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" class="userMsg-card">
                      <el-form-item class="item-style" label="内容">
                            <div class="float-left half">
                                {{props.row.content}}
                            </div>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="user_id" label="问题ID" width="180">
            </el-table-column>
            <el-table-column prop="title" label="问题标题" width="180">
            </el-table-column>
            <el-table-column prop="type" label="问题类型" width="180">
            </el-table-column>
            <el-table-column prop="username" label="提问用户" width="180">
            </el-table-column>
            <el-table-column label="操作" align="right">
                <template scope="scope">
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import SearchSelect from "../../components/SearchSelect"
export default {
    name: 'users',
    components:{
  	    SearchSelect
    },
    data() {
        return {
          quesData:[],
          type:'all',
          page:1,
          searchVal:'all',
          searchType:'',
          searchData:{}
        }
    },
    methods: {
      test(){
        console.log('click test')
      },
      handleDelete(index,row){
        console.log('删除问题',row.que_id);
        if(confirm('确认删除该问题？')){
            $.ajax({
                url:'/api/deleteque',
                type:'post',
                dataType:'json',
                data:{
                    token:window.localStorage.Adtoken,
                    que_id:row.que_id
                },
                success: (data) => {
                    if(data.status=='OK'){
                        delete this.quesData[index];
                        console.log('删除成功',this.quesData);
                        this.search();
                    }else{
                        alert(data.msg);
                    }
                },
                error: (err) => {
                    console.error(err);
                }
            });
        }
        
      },
      search(){
        this.page=1;
        let data={};
        data[this.searchType.toString()] = this.searchVal;
        console.log(data);
        if(this.searchVal=='all'){
          $.ajax({
            url:'/api/getAllQuestion',
            type:'get',
            dataType:'json',
            data:{
              token:window.localStorage.Adtoken,
              page:this.page
            },
            success: (data) => {
              this.quesData = data.data;
              this.page++;
              console.log(this.quesData)
            }
          })
        }else{
          this.getQue(data);
        }
      },
      getQue(data){
        $.ajax({
          url:'/api/getQuestion',
          type:'get',
          dataType:'json',
          data:{
            data:data,
            page:this.page,
            is_admin:true,
          },
          success:(data) => {
            this.quesData = data.data;
            this.page++;
            console.log(this.quesData)
          },
          error:(err) => {
            console.error(err);
          }
        })
      }
    },
    mounted(){
      this.search();
    }
}
</script>
<style scoped>
.userMsg-card lable{
    width: 90px;
    color: #99a9bf;
}
.userMsg-card .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    color:black;
    width: 100%;
    
}
.item-style{
    height:48px;
    overflow: hidden;
}
</style>