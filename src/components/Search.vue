<template>
  <div class="search_area">
    <el-tooltip content="查询" placement="top">
      <el-switch
          @change="change1"
          v-model="choose[0]">
      </el-switch>
    </el-tooltip>
    <el-form :disabled="!(choose[0])"  ref="form" :model="form" label-width="80px">
      <el-form-item label="选择时间">
          <el-time-picker is-range start-placeholder="起始时间" end-placeholder="结束时间" range-separator="至" v-model="form.time" style="width: 370px"></el-time-picker>
      </el-form-item>
      <el-form-item label="用户ID">
          <el-input v-model="form.userId" placeholder="默认为全部用户" clearable></el-input>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="form.keyword" placeholder="默认为任意关键字" clearable></el-input>
      </el-form-item>
      <el-form-item label="网址">
        <el-input v-model="form.url" placeholder="默认为任意网址" clearable></el-input>
      </el-form-item>
      <el-form-item label="查询上限">
        <el-input v-model.number="form.num" oninput="value=value.replace(/\D/g,'')" maxlength="10" placeholder="默认全部查询" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <div style="display: flex;justify-content: space-between">
          <div style="flex: 1">
            <el-button style="flex: 1;width: 100%"  type="primary" @click="emitForm">查询</el-button>
          </div>
          <div >
            <el-tooltip content="底层查询选择" placement="top">
              <el-switch
                  content="查询模式选择"
                  style="flex: 1"
                  v-model="form.choose_hbase"
                  active-text="hbase"
                  inactive-color="#13ce66"
                  inactive-text="spark">
              </el-switch>
            </el-tooltip>
          </div>
        </div>
      </el-form-item>
    </el-form>


    <el-tooltip content="时段流量统计" placement="top">
      <el-switch
          @change="change2"
          v-model="choose[1]">
      </el-switch>
    </el-tooltip>
    <el-form :disabled="!(choose[1])"  :model="count" label-width="80px">
      <el-form-item label="选择时间">
        <el-time-picker is-range start-placeholder="起始时间" end-placeholder="结束时间" range-separator="至" v-model="count.time" style="width: 370px"></el-time-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="emitCount" style="width: 100%">统计</el-button>
      </el-form-item>
    </el-form>


    <el-tooltip content="用户使用频率统计" placement="top">
      <el-switch
          @change="change3"
          v-model="choose[2]">
      </el-switch>
    </el-tooltip>
    <el-form :disabled="!(choose[2])"  :model="user" label-width="80px">
      <el-form-item label="用户ID">
        <div style="display: flex">
          <el-input v-model="user.userId" style="flex: 8"/>
          <el-button @click="emitUser" type="primary" style="flex: 1;margin-left: 5px">统计</el-button>
        </div>
      </el-form-item>
    </el-form>


    <el-tooltip content="访问行为统计" placement="top">
      <el-switch
          @change="change4"
          v-model="choose[3]">
      </el-switch>
    </el-tooltip>
    <el-form :disabled="!(choose[3])"  label-width="80px">
      <el-form-item label="排名统计">
          <el-button type="primary" @click="emitNothing" style="width: 100%">统计</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Bus from "@/js/bus";
import axios from "axios";
export default {
  name: "Search",
  data()
  {
    return {
      choose:[true,false,false,false],
      form:{
        time:[new Date(2022,12,26,0,0,0), new Date(2022,12,26,23,59,59)],
        userId:'',
        keyword:'',
        url:'',
        num:'',
        choose_hbase:true
      },
      count:{
        time:[new Date(2022,12,26,0,0,0), new Date(2022,12,26,23,59,59)],
      },
      user:{
        userId:''
      }
    }
  },
  methods:{
    emitForm()
    {
      Bus.$emit('getFormInfo',this.form);
    },
    emitCount()
    {
      Bus.$emit('getCountTimeKeyword',this.count);
      Bus.$emit('getCountTimeUrl',this.count);
    },
    emitUser()
    {
      Bus.$emit('getUseId',this.user);
    },
    emitNothing()
    {
      Bus.$emit('getNothing',"");
    },
    test(data)
    {
      console.log(data)
    },
    setSingleOne(index)
    {
      for(let i = 0;i<4;i++)
      {
        this.choose[i]=false
      }
      this.choose[index]=true
    },
    change1(selected)
    {
      if(selected)
      {
        this.setSingleOne(0);
        Bus.$emit("getResultVue","SearchResult")
      }
    },
    change2(selected)
    {
      if(selected)
      {
        this.setSingleOne(1);
        Bus.$emit("getResultVue","SelectTimeResult")
      }
    },
    change3(selected)
    {
      if(selected)
      {
        this.setSingleOne(2);
        Bus.$emit("getResultVue","UserIdResult")

      }
    },
    change4(selected)
    {
      if(selected)
      {
        this.setSingleOne(3);
        Bus.$emit("getResultVue","RankResult")
      }
    },
    dealRecallForm(locateLog)
    {
      // this.form.time[0]=new Date('2022-12-16 '+locateLog.startTime)
     // console.log(this.form.time[0])
      this.$set(this.form.time,0,new Date('2022-12-16 '+locateLog.startTime))
      this.form.time[1]=new Date('2022-12-16 '+locateLog.endTime)
      //console.log(this.form.time[1])
      this.$set(this.form.time,1,new Date('2022-12-16 '+locateLog.endTime))
      this.form.keyword=locateLog.keyword;
      this.form.url=locateLog.shortUrl;
      this.form.userId=locateLog.userId;
      if(locateLog.limit!=-1)this.form.num=locateLog.limit;
      if(locateLog.type ==="SPARK")this.form.choose_hbase=false
    }
  },
  mounted() {
    Bus.$on("getRecallForm",this.dealRecallForm)
  }
}
</script>

<style scoped>
.search_area{
  margin-right: 20px;
  margin-left: 20px;
}
.el-form .el-form-item{
  width: 450px;
}
/*.el-form .el-time-picker*/
/*{*/
/*  width: 700px;*/
/*}*/
</style>