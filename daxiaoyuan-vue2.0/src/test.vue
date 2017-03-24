<template>
  <div class="body">
    <input type="button" value="获取数据" @click="getData()">
	<div id="div"></div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components:{
  	
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
  	getData(){
  			console.log('********')
			var xhr = new XMLHttpRequest();
			xhr.open("post","http://localhost:1337/",true);
			xhr.onreadystatechange = function(){
				if(xhr.readyState ==4){
					if(xhr.status ==200){
						document.getElementById("div").innerHTML = xhr.responseText;
					}
				}
			}
			xhr.send(null);
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
