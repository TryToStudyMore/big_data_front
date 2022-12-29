<template>
  <div v-loading="loadIfo" element-loading-text="可能需要亿点点时间" element-loading-background="rgba(255, 255, 255, 1)" style="border-left: solid 5px grey;height: 100vh;overflow-y:scroll" >
    <el-pagination
        :hide-on-single-page="singleHidden"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
    </el-pagination>
    <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width: 100%">
      <el-table-column
          prop="describe"
          label="搜索结果中的排名">
      </el-table-column>
      <el-table-column
          prop="num"
          label="访问次数"
      >
      </el-table-column>
    </el-table>
</div>
</template>

<script>
import axios from "axios";
import Bus from "@/js/bus";

export default {
  name: "RankResult",
  data()
  {
    return {
      tableData:[],
      currentPage:1,
      PageSize:10,
      singleHidden:true,
      loadIfo:false
    }
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.PageSize=val
      this.currentPage=1
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val
    },
    getInfo(userData)
    {
      this.loadIfo=true
      console.log(userData)
      axios.post("/api/spark/count_rank",this.$qs.stringify({
        "userId":userData.userId
      })).then((res)=>{
        //console.log("this",this);
        console.log("data",res.data);
        this.tableData=res.data;
        this.loadIfo=false
      })
    }
  },
  mounted() {
    Bus.$on("getNothing",this.getInfo)
  }
}
</script>

<style scoped>

</style>