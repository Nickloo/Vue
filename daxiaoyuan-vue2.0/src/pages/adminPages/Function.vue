<template>
  <div class="body">
    <el-card class="column box-card float-left">
        <div slot="header" class="clearfix">
            <span style="line-height: 36px;">专栏管理</span>
            <el-button style="float: right;" type="primary" @click="saveCol">保存</el-button>
        </div>
        <ul>
            <li>
                <span class="column-title float-left">添加专栏名称</span>
                <el-input class="column-input" v-model="column_text"></el-input>
            </li>
            <li>
                <span class="column-title float-left">添加专栏字段(英文)</span>
                <el-input class="column-input" v-model="column_field"></el-input>
            </li>
        </ul>
    </el-card>
    <el-card class="lianjie box-card float-left" style="margin-left:2rem">
        <div slot="header" class="clearfix">
            <span style="line-height: 36px;">首页链接管理</span>
            <el-button style="float: right;" type="primary" @click="saveNews">保存</el-button>
        </div>
        <form id="news_msg"  method="post" enctype="multipart/form-data">
            <ul>
                <li>
                    <span class="column-title float-left">标题名</span>
                    <el-input class="column-input" v-model="news_title"></el-input>
                </li>
                <li>
                    <span class="column-title float-left">链接</span>
                    <el-input class="column-input" v-model="link"></el-input>
                </li>
                <li>
                    <span class="column-title float-left">图片上传</span>
                    
                    <input type="file" name="imgFile" accept="image/gif,image/jpeg,,image/png,image/jpg,"
                            id="imgFile" style="width:5rem">
                    <input type="hidden"  name="type" value="news">
                    <input type="hidden"  name="title" :value="news_title">
                    <input type="hidden"  name="link" :value="link">
                </li>
            </ul>
        </form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'home',
  components:{
  	
  },
  data () {
    return {
      column_text:'',
      column_field:'',
      news_title:'',
      file:'',
      link:''
    }
  },
  methods:{
      saveCol(){
          if(this.column_text.trim()==''){
              alert('专栏名称不能为空');
              return false;
          }else if(this.column_field.trim()==''){
              alert('字段不能为空');
              return false;
          }else{
              $.ajax({
                  url:'/api/insertCol',
                  type:'post',
                  dataType:'json',
                  data:{
                      title:this.column_text,
                      type:this.column_field,
                      token:localStorage.Adtoken
                  },
                  success: data => {
                      if(data.status=='OK'){
                          alert('保存成功');
                          this.column_text='';
                          this.column_field='';
                      }else{
                          alert(data.msg);
                      }
                  }
              })
          }
      },
      saveNews(){
        var formData = new FormData($("#news_msg")[0]);
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
                if(data.status == 'OK'){
                    alert('添加成功');
                    this.link="";
                    this.title="";
                    document.getElementsByName('imgFile').values=""
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
.column-title{
    width:7rem;
}
.column-input{
    width:10rem
}
.box-card li{
    overflow: hidden;
    height:3rem;
    line-height: 3rem;
}
/**/
.box-card{
    width:20rem;
}
</style>
