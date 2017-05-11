<template>
  <div class="body">
    <nav-header title="专栏"></nav-header>
    <div class="top-bar"></div>
    <router-link :to="{name:'consult',params:{type:item.type,title:item.title}}"
    id="column-box" class="width-25 column-box float-left wrapper"
    :style="{height:box_height}" v-for="item in datas">
    	<div class="column-card">
    		<div class="fullsrc room">
    			{{item.title}}
    		</div>
    	</div>
    </router-link>
  </div>
</template>

<script>
import NavHeader from '../../components/NavHeader'
import { Loading } from 'element-ui';
export default {
  name: 'column',
  components:{
  	NavHeader
  },
  data () {
    return {
      box_height:'',
      box_width:'',
      datas:[
      	{
      		type:'all',
      		title:'综合'
      	},
      ]
    }
  },
	created(){
    let loadingInstance = Loading.service({
      text:'疯狂加载中。。。'
    });
    setTimeout(() => {

    })
		$.ajax({
        url: '/api/getColumn',
        type:'get',
        dataType: 'json',
        crossDomain: true,
        cache: true,
        success: function(data) {
            console.log(data);
            if(data.status === 'OK'){
              this.datas=this.datas.concat(data.data);
              this.datas.splice(0, 1);
              loadingInstance.close();
            }else{
              alert(data.msg)
            }
        }.bind(this),
        error: function(xhr, status, err) {
            console.log(err)
        }.bind(this)
    });
	},
  mounted(){
  	var column_box = document.getElementById('column-box');
  	// var column_box_cla = document.getElementsByClassName('column-box')
  	var col_width = column_box.offsetWidth;
    // column_box.style.padding = col_width+"px";
  	this.box_height = col_width-20+"px";
  	this.box_width = this.box_height;
  	// column_box_cla.style.padding = "5px";
  	console.log('**********',this.box_height);

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.column-box{
	overflow: hidden;
	/*height: 5.0rem*/
	/*background: red;*/
	/*margin-bottom: 0.5rem;*/
	/*border-radius: 0.5rem;*/
	/*padding:10px;*/
}
.column-card{
	padding:0.5rem 0.5rem 0 0.5rem;
	/*background: blue;*/
	height: 100%
}
.room{
	background: #fff;
}
</style>
