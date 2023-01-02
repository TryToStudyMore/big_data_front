<template>

  <div id="app" v-loading="dialogVisible" element-loading-text="可能需要亿点点时间" element-loading-background="rgba(255, 255, 255, 1)" >
-
    <Search style="flex: 1"></Search>
<!--    <Result style="flex: 2;"></Result>-->
    <component :is="result" style="flex: 2"></component>
  </div>

</template>

<script>


import Search from "@/components/Search";
import Bus from "@/js/bus";
import SearchResult from "@/components/SearchResult";
import RankResult from "@/components/RankResult";
import UserIdResult from "@/components/UserIdResult";
import SelectTimeResult from "@/components/SelectTimeResult";
import axios from "axios";
export default {
  name: 'App',
  components: {
    Search,
    SearchResult,
    RankResult,
    UserIdResult,
    SelectTimeResult
  },
  data()
  {
    return {
      result:"SearchResult",
      dialogVisible: false,
    }
  },
  methods:{
    setVue(vueName)
    {
      console.log(vueName)
      this.result=vueName
    },
    reQuery()
    {
      axios.post("/api/requery").then((res)=>{
        console.log(res.data)
        Bus.$emit("getRecallForm",res.data.locateLog)
        Bus.$emit("getRecallData",res.data.data)
      })
    },
    problem()
    {
      axios.post("/api/problem_num").then((res)=>{
        if(res.data>0)this.hello(res.data)
      })
    },
    hello(num) {
      this.$confirm('检测到'+num+'个异常查询，是否全部回复？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '进行查询，请耐心等待'
        });
        console.log(this.dialogVisible)
        //this.dialogVisible=true
        console.log("hello");
        this.reQuery()

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消恢复'
        });
      });
    }
  },
  mounted() {
    Bus.$on("getResultVue",this.setVue)
    this.problem()
  },

}
</script>

<style>
#app {
  padding: 0px;
  margin: 0px;
  display: flex;
}
html,body{
  padding: 0px;
  margin: 0px;
}
</style>
