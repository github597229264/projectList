<template>
  <div class="DeviceMangement">
    <el-tabs type="border-card">
      <el-tab-pane label="未绑定设备"><UnboundDeviceList></UnboundDeviceList></el-tab-pane>
      <el-tab-pane label="已绑定设备"><BoundedDeviceList></BoundedDeviceList></el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  import BoundedDeviceList from "./BoundedDeviceList";
  import UnboundDeviceList from "./UnboundDeviceList";

  export default {
    name: "DeviceManagement",//设备管理列表
    components: {
      BoundedDeviceList, //已绑定设备
      UnboundDeviceList, //未绑定设备
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>
