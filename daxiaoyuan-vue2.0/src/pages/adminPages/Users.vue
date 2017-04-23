<template>
    <div>
        <el-input placeholder="请输入内容" v-model="searchVal" style="width: 50%;margin:0 0 .1rem 0">
                <el-select v-model="searchType" slot="prepend" placeholder="请选择" style="width:6rem">
                    <el-option label="全部用户" value="all"></el-option>
                    <el-option label="用户名" value="username"></el-option>
                    <el-option label="用户ID" value="userId"></el-option>
                    <el-option label="用户类型" value="identy"></el-option>
                </el-select>
                <el-button slot="append" icon="search" @click="search()"></el-button>
        </el-input>
        <el-table :data="usersData" style="width: 80%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" class="userMsg-card">
                        <el-form-item  label="" style="margin-bottom:.5rem">
                            <!--<span>{{ props.row.user_logo }}</span>-->
                            <div class="user-logo">
                                <img class="fullsrc" :src="props.row.user_logo">
                            </div>
                        </el-form-item>
                        <el-form-item class="item-style" label="用户名">
                            <div class="float-left half">
                                <el-input v-model="username"  :placeholder="props.row.username" ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item class="item-style" label="用户类型">
                            <div class="float-left half">
                                <el-select v-model="props.row.identy">
                                    <el-option
                                        label="1"
                                        value="1">
                                        <span style="float: left">答人</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px">1</span>
                                    </el-option>
                                    <el-option
                                        label="0"
                                        value="0">
                                        <span style="float: left">普通</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px">0</span>
                                    </el-option>
                                </el-select>
                                <span>1为答人，0为普通用户</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="item-style" label="答人类型">
                            <div class="float-left half">
                                <!--<el-input v-model="identy_type"  :placeholder="props.row.identy_type"></el-input>-->
                                <search-select :is-search="false" 
                                    :placeholder = 'props.row.identy_type' 
                                    :disabled = "props.row.identy==1?false:true"
                                    :column = "column"></search-select>
                            </div>
                        </el-form-item>
                        <el-form-item class="item-style" label="学校">
                            <div class="float-left half">
                                <search-select :is-search="true"  :value = 'props.row.school'></search-select>
                            </div>
                        </el-form-item>
                        <el-form-item class="item-style" label="专业">
                            <div class="float-left half">
                                <el-input v-model="profession" :placeholder="props.row.profession"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item class="item-style" label="爱好">
                            <div class="float-left half">
                                <el-input v-model="interest" :placeholder="props.row.interest"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item class="item-style" label="擅长">
                            <div class="float-left half">
                                <el-input v-model="good_skill" :placeholder="props.row.good_skill"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item class="item-style" label="邮箱">
                            <div class="float-left half">
                                <el-input type="email" v-model="email" :placeholder="props.row.email"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item style="height:6.6rem" label="答人简介" >
                            <div class="half">
                                <el-input :rows="4" type="textarea" 
                                v-model="introduction" :placeholder="props.row.introduction"
                                :disabled="props.row.identy == 1?false:true"></el-input>
                            </div>
                        </el-form-item>                        
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="userId" label="用户ID" width="180">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="180">
            </el-table-column>
            <el-table-column prop="identy" label="用户类型" width="180">
            </el-table-column>
            </el-table-column>
            <el-table-column label="操作" align="right">
                <template scope="scope">
                    <el-button size="small" type="primary" @click="handleSave(scope.$index, scope.row)">保存</el-button>
                    <el-button size="small" type="danger" @click="handleStop(scope.$index, scope.row)">{{scope.row.status?'封停':'解封'}}</el-button>
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
          usersData:[],
          searchVal:'',
          searchType:'',
          username:'',
          identy_type:'',
          school:'',
          profession:'',
          interest:'',
          good_skill:'',
          email:'',
          introduction:'',
          options:[],
          column:[],
        //   identys:[
        //       {label:'答人',value:'1'}
        //       {label:'答人',value:'1'}
        //   ]
        }
    },
    methods: {
        handleSave(index, row){
            console.log(index, row);
            $.ajax({
                url:'/api/setUser',
                type:'post',
                dataType:'json',
                data:{
                    token:window.localStorage.Adtoken,
                    userId:row.userId,
                    username:this.username,
                    identy:row.identy,
                    identy_type:global.identy_type,
                    school:global.school,
                    profession:this.profession,
                    interest:this.interest,
                    good_skill:this.good_skill,
                    email:this.email,
                    introduction:this.introduction
                },
                success: data => {
                    if(data.status === 'OK'){
                        alert(data.msg);
                        this.getUsers();
                    }else{
                        alert(data.msg)
                    }
                }
            })
        },
        handleStop(index, row) {
            console.log(index, row);
            
            $.ajax({
                url:'/api/setUser',
                type:'post',
                dataType:'json',
                data:{
                    token:window.localStorage.Adtoken,
                    userId:row.userId,
                    status:row.status==1?0:1
                },
                success: data => {
                    if(data.status === 'OK'){
                        this.getUsers();
                        alert(row.status==1?'封停成功':'解封成功')
                    }
                },
                error:err => {
                    console.error(err);
                }
            })
        },
        handleDelete(index, row) {
            console.log(index, row.userId);
            if(confirm('删除后将不能恢复，确认删除？') === true)
            $.ajax({
                url:'/api/deleteUser',
                type:'delete',
                dataType:'json',
                data:{
                    token:window.localStorage.Adtoken,
                    userId:row.userId
                },
                success:(data) => {
                    if(data.status === "OK"){
                        alert('删除成功');
                        this.getUsers();
                    }
                },
                error:(err) => {
                    console.error(err)
                }
            })
        },
        getUsers(){
            $.ajax({
                url:'/api/getAllUsers',
                type:'get',
                dataType:'json',
                data:{
                    token:window.localStorage.Adtoken
                },
                success:(data) => {
                    if(data.status === 'OK'){
                        this.usersData = data.data;
                    }else{
                        this.$router.push('/adlogin')
                    }
                },
                error:(err) => {
                    console.error(err)
                }
            });
        },
        search(){
            let data={
            };
            if(this.searchType === 'all'){
                this.getUsers();
            }else{
                data[this.searchType.toString()] = this.searchVal;
                $.ajax({
                    url:'/api/getTypeuser',
                    type:'get',
                    dataType:'json',
                    data:{token:window.localStorage.Adtoken,data},
                    success:(data) => {
                        this.usersData = data.data;
                    },
                    error:(err) => {
                        console.error(err)
                    }
                });
            }
        },
        getCol(){
            $.ajax({
                url: '/api/getColumn',
                type:'get', 
                dataType: 'json',
                crossDomain: true,
                cache: true,
                success: function(data) {
                    console.log(data);
                    if(data.status === 'OK'){
                    this.column=data.data;
                    }else{
                    alert(data.msg)
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    console.log(err)
                }.bind(this)
            });
        }
        
    },
    created(){
        this.getCol();
    },
    mounted(){
        this.getUsers();
        
        // this.getSchool();
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
/*.el-form-item{
    height:48px;
    overflow: hidden;
}*/
.item-style{
    height:48px;
    overflow: hidden;
}
/*.el-select .el-input {
    width: 110px;
}
.el-input{
    float: left;
}*/
</style>