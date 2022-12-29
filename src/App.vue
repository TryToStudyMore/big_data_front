<template>

  <div id="app" >

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
      result:"SearchResult"
    }
  },
  methods:{
    setVue(vueName)
    {
      console.log(vueName)
      this.result=vueName
    }
  },
  mounted() {
    Bus.$on("getResultVue",this.setVue)
  }
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
