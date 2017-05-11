<template>
  <div class="top-bar">
    <nav-header title="申请答人" :back="true"></nav-header>
    <ul class="main padding-20-20">
        <li>
            <h4>首先简短介绍一下自己吧</h4>
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="introduction">
            </el-input>
        </li>
        <li>
            <h4>答人类型</h4>
            <el-select v-model="identy_type" placeholder="请选择">
                <el-option
                v-for="item in typeData"
                :label="item.title"
                :value="item.type">
                </el-option>
            </el-select>
        </li>
        <li>
            <h4>来张图片证明自己<span style="font-size:.5rem">(可选，添加可以提高通过率)</span></h4>
            <div class="per-logo" @click="selImg" style="height:9.5rem">
                    <img class="fullsrc" src="../../assets/imgs/default.png" id="picture" >
            </div>
            <form id="userimg"  method="post" enctype="multipart/form-data">
                <input type="file" name="imgFile" accept="image/gif,image/jpeg,,image/png,image/jpg,"
                    id="imgFile" hidden v-on:change="changImg($event)">
                <input type="hidden"  name="userId" :value="userId">
                <input type="hidden"  name="type" value="apply">
            </form>
            <!--<input type="file" accept="image/gif,image/jpeg,,image/png,image/jpg"  id="imgFile" hidden v-on:change="changImg($event)">-->
        </li>
        <li>

        </li>
    </ul>
    <el-button type="primary" class="float-right" @click="submit()">提交</el-button>
    <div class="bom"></div>
  </div>
</template>

<script>
import NavHeader from '../../components/NavHeader';
export default {
  name: 'apply-dr',
  components:{
  	NavHeader
  },
  data () {
    return {
      introduction: '',
      identy_type:'',
      typeData:[],
      userId:''
    }
  },
  created(){
    this.userId = window.localStorage.userId
  },
  mounted(){
      this.getDrType();
  },
  methods:{
      getDrType(){
          $.ajax({
              url:'/api/getColumn',
              type:'get',
              dataType:'json',
              data:{},
              success:(data) => {
                this.typeData = data.data;
              }
          })
      },
      submit(){
        if(this.introduction === ''){
            alert('简介不能为空');
            return false;
        }else if(this.identy_type === ''){
            alert('答人类型不能为空');
            return false;
        }else{
            $.ajax({
                url:'/api/applyDr',
                type:'post',
                dataType:'json',
                data:{
                    userId:window.localStorage.userId,
                    introduction:this.introduction,
                    identy_type:this.identy_type,
                    picture:''
                },
                success:(data) => {
                    if(data.status === 'OK'){
                        alert('提交成功');
                        this.uploadImg();
                    }
                },error:(err) => {
                    console.error(err)
                }
            })
        }
      },
      changImg(event){
		    let files = event.target.files, file;
		    if (files && files.length > 0) {
		        file = files[0];// 文件大小校验的动作
		        let URL = window.URL || window.webkitURL;
		        let imgURL = URL.createObjectURL(file);
		        $("#picture").attr("src",imgURL);
		    }
	},
    selImg(){
      console.log('click img');
      let file = document.getElementById('imgFile');
      file.click()
    },
    imgClick(){
      this.test_logo = document.getElementById('imgFile').value;
    },
    uploadImg(){
      var formData = new FormData($("#userimg")[0]);
      console.log('img upload',formData);
      $.ajax({
        url:'/api/uploadImage',
        type:'post',
        dataType:'json',
        processData: false,
        contentType: false,
        data:formData,
        success: data => {
          console.log('imgsuccess',data.msg);
          if(data.status=='OK'){
              this.$router.push('/person');
          }
        },
        error: err => {
          console.error(err)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-button{
    margin-top: .5rem;
    margin-right: .2rem;
}
</style>
