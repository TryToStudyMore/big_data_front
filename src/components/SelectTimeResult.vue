<template>
  <div v-loading="loadIfo" element-loading-text="可能需要亿点点时间" element-loading-background="rgba(255, 255, 255, 1)" class="total" >
  这里是选择时间的结果{{totalNum}}
  <CountKeyword style="flex: 1"></CountKeyword>
  <CountUrl style="flex: 1"></CountUrl>
</div>
</template>

<script>
import CountKeyword from "@/components/CountKeyword";
import CountUrl from "@/components/CountUrl";
import Bus from "@/js/bus";
import axios from "axios";
export default {
  name: "SelectTimeResult",
  components: {CountUrl, CountKeyword},
  data()
  {
    return {
      loadIfo:false,
      totalNum:0
    }
  },
  methods:{
    getInfo(countData)
    {
      this.loadIfo=true
      console.log(countData);
      axios.post("/api/spark/count_total",this.$qs.stringify({
        "startTime":(countData.time[0]).toLocaleTimeString(),
        "endTime":(countData.time[1]).toLocaleTimeString(),
      })).then((res)=>{
        //console.log("this",this);
        console.log("main",res.data);
        this.totalNum=res.data[0].num
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
.total{
  border-left: solid 5px grey;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>