<template>

  <div id="app" >

    <Search style="flex: 1"></Search>
    <Result style="flex: 2;"></Result>
  </div>

</template>

<script>


import Search from "@/components/Search";
import Result from "@/components/Result";
export default {
  name: 'App',
  components: {
    Result,
    Search
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
