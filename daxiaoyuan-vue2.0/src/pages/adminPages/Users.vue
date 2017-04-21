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
                        <el-form-item label="" style="margin-bottom:.5rem">
                            <!--<span>{{ props.row.user_logo }}</span>-->
                            <div class="user-logo">
                                <img class="fullscr" :src="props.row.user_logo">
                            </div>
                        </el-form-item>
                        <el-form-item label="学校">
                            <span>{{ props.row.school }}</span>
                        </el-form-item>
                        <el-form-item label="专业">
                            <span>{{ props.row.profession }}</span>
                        </el-form-item>
                        <el-form-item label="爱好">
                            <span>{{ props.row.insterest }}</span>
                        </el-form-item>
                        <el-form-item label="擅长">
                            <span>{{ props.row.good_skill }}</span>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <span>{{ props.row.email }}</span>
                        </el-form-item>
                        <el-form-item label="答人简介" v-if="props.row.identy === 1">
                            <span>{{ props.row.introduction }}</span>
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
                    <el-button size="small" type="danger" @click="handleEdit(scope.$index, scope.row)">封停</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'users',
    data() {
        return {
          usersData:[],
          searchVal:'',
          searchType:''
        }
    },
    methods: {
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row.userId);
            if(confirm('删除后将不能恢复，确认删除？') === true)
            $.ajax({
                url:'/api/deleteUser',
                type:'delete',
                dataType:'json',
                data:{
                    token:window.localStorage.token,
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
                    token:window.localStorage.token
                },
                success:(data) => {
                    if(data.status === 'OK'){
                        this.usersData = data.data;
                        this.usersData.splice(0, 1);
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
                    data:{token:'111',data},
                    success:(data) => {
                        this.usersData = data.data;
                    },
                    error:(err) => {
                        console.error(err)
                    }
                });
            }
        }
    },
    mounted(){
        this.getUsers();
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
.el-select .el-input {
    width: 110px;
}
</style>