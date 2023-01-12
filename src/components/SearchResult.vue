<template>
  <div v-loading="loadIfo" element-loading-text="可能需要亿点点时间" element-loading-background="rgba(255, 255, 255, 1)" style="border-left: solid 5px grey;height: 100vh;overflow-y:scroll" v>
    <div style="display: flex;justify-content: center;align-items: center">
      <el-pagination
          :hide-on-single-page="singleHidden"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length">
      </el-pagination>
      <label v-show="limit!=-1" style="margin-left: 30px;color: royalblue;font-weight: bold">数据仅截取了{{this.limit}}个，可能还有</label>
    </div>
    <el-table
        :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
        style="width: 100%">
      <el-table-column
          prop="time"
          label="时间"
          width="170">
      </el-table-column>
      <el-table-column
          prop="userId"
          label="用户id"
          width="170">
      </el-table-column>
      <el-table-column
          width="170"
          prop="keyword"
          label="搜索的关键字">
      </el-table-column>
      <el-table-column
          width="200"
          prop="exactUrl"
          label="搜索的网址">
      </el-table-column>
      <el-table-column
          width="170"
          prop="rank"
          label="排名">
      </el-table-column>
      <el-table-column
          prop="orderNum"
          label="顺序号">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import Bus from "@/js/bus";
import axios from 'axios'
export default {
  name: "Result",
  data()
  {
    return {
      tableData:[],
      currentPage:1,
      PageSize:10,
      loadIfo:false,
      singleHidden:true,
      limit:-1
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
    getInfo(formData)
    {
      console.log("limit"+typeof (formData.num))
      if(typeof (formData.num)=="string")this.limit=-1;
      else this.limit=formData.num
      console.log(typeof (formData.num)==="string")
      this.loadIfo=true
      let url = "/api/hbase/search";
      if(!formData.choose_hbase)url="/api/spark/search";
      axios.post(url,this.$qs.stringify({
        "startTime":(formData.time[0]).toLocaleTimeString(),
        "endTime":(formData.time[1]).toLocaleTimeString(),
        "userId":formData.userId,
        "keyword":formData.keyword,
        "shortUrl":formData.url,
        "limit":typeof (formData.num)==="string"?-1:formData.num
      })).then((res)=>{
        //console.log("this",this);
        console.log("data",res.data);
        this.tableData=res.data;
        this.loadIfo=false
      })
    },
    dealRecallData(data)
    {
      this.tableData=data.data
      console.log(typeof (data.locateLog.limit),data.locateLog.limit)
      if(data.locateLog.limit!=-1)this.limit = data.locateLog.limit
    }
  },
  mounted() {
    Bus.$on("getFormInfo",this.getInfo)
    Bus.$on("getRecallData",this.dealRecallData)
  }
}
</script>

<style scoped>

</style>