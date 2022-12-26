<template>
  <div class="search_area">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="选择时间">
          <el-time-picker is-range start-placeholder="起始时间" end-placeholder="结束时间" range-separator="至" v-model="form.time" style="width: 370px"></el-time-picker>
      </el-form-item>
      <el-form-item label="用户ID">
          <el-input v-model="form.userId" clearable></el-input>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="form.keyword" clearable></el-input>
      </el-form-item>
      <el-form-item label="网址">
        <el-input v-model="form.url" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="emitForm">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Bus from "@/js/bus";
export default {
  name: "Search",
  data()
  {
    return {
      form:{
        time:[new Date(2022,12,26,0,0,0), new Date(2022,12,26,23,59,59)],
        userId:'',
        keyword:'',
        url:''
      }
    }
  },
  methods:{
    emitForm()
    {
      Bus.$emit('getFormInfo',this.form);
    }
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