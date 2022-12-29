<template>
<div style="overflow-y: scroll">
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
        label="网页">
    </el-table-column>
    <el-table-column
        prop="num"
        label="数量"
        >
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import Bus from "@/js/bus";
import axios from "axios";

export default {
  name: "CountUrl",
  data()
  {
    return {
      tableData:[],
      currentPage:1,
      PageSize:10,
      singleHidden:true
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
    getInfo(countData)
    {
      this.loadIfo=true

      console.log(countData);
      axios.post("/api/spark/count_url",this.$qs.stringify({
        "startTime":(countData.time[0]).toLocaleTimeString(),
        "endTime":(countData.time[1]).toLocaleTimeString(),
      })).then((res)=>{
        //console.log("this",this);
        console.log("data",res.data);
        this.tableData=res.data;
        this.loadIfo=false
      })
    }
  },
  mounted() {
    Bus.$on("getCountTimeUrl",this.getInfo)
  }
}
</script>

<style scoped>

</style>