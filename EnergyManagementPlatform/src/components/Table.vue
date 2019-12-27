<template>
<div class="Table">
  <el-table :data="tableData" stripe style="width: 100%;padding:30px 0" :cell-style="cellStyle" :header-cell-style="headerStyle">
    <el-table-column prop="project" label="区域名称">
    </el-table-column>
    <el-table-column prop="state" label="设备数量(个)">
    </el-table-column>
    <el-table-column prop="num" label="总耗能量(kW·h)">
    </el-table-column>
    </el-table-column>
    <el-table-column prop="num" label="当前总功率(kW)">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      // date: '',
      tableData: [{
        project: '2016-05-02',
        state: '王小虎',
        num: '上海市普陀区金沙江路 1518 弄'
      }, {
        project: '2016-05-04',
        state: '王小虎',
        num: '上海市普陀区金沙江路 1517 弄'
      }, {
        project: '2016-05-04',
        state: '王小虎',
        num: '上海市普陀区金沙江路 1517 弄'
      }],
    };
  },
  methods: {
    // 改变表格样式
    cellStyle({
      row,
      column,
      rowIndex,
      columnIndex
    }) {   
      let style = {
        'text-align': 'center',
        'font-size': '14px',
        'height': '74px',
        'background-color': '#ebf1fb',
        'border-left': 'solid 1px #d8d8d8',
      }
      if (window.innerWidth > 1660) {
        if (rowIndex % 2 == 0) {
          if (columnIndex == 2) {
            style['border-right'] = 'solid 1px #d8d8d8';
          }
        } else {
          if (columnIndex == 2) {
            style['border-right'] = 'solid 1px #d8d8d8';
            style['background-color'] = '#f7faff';
          } else {
            style['background-color'] = '#f7faff';
          }
        }
      } else if (window.innerWidth > 1440) {
        if (rowIndex % 2 == 0) {
          if (columnIndex == 2) {
            style['height'] = '52px';
            style['border-right'] = 'solid 1px #d8d8d8';
          } else {
            style['height'] = '52px';
          }
        } else {
          if (columnIndex == 2) {
            style['height'] = '52px';
            style['background-color'] = '#f7faff';
            style['border-right'] = 'solid 1px #d8d8d8';
          } else {
            style['height'] = '52px';
            style['background-color'] = '#f7faff';
          }
        }
      } else {
        if (rowIndex % 2 == 0) {
          if (columnIndex == 2) {
            style['height'] = '20px';
            style['border-right'] = 'solid 1px #d8d8d8';
          } else {
            style['height'] = '20px';
          }
        } else {
          if (columnIndex == 2) {
            style['height'] = '20px';
            style['background-color'] = '#f7faff';
            style['border-right'] = 'solid 1px #d8d8d8';
          } else {
            style['height'] = '20px';
            style['background-color'] = '#f7faff';
          }
        }
      }
      return style;
    },
    headerStyle({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      let style = {
        'background-color': '#f7faff',
        'font-size': '16px',
        'color': '#496fec',
        'text-align': 'center',
        'height': '74px',
        'border-left': 'solid 1px #d8d8d8'
      }
      if (window.innerWidth > 1660) {
        if (columnIndex == 2) {
          style['border-right'] = 'solid 1px #d8d8d8';
        }
      } else if (window.innerWidth > 1440) {
        if (columnIndex == 2) {
          style['border-right'] = 'solid 1px #d8d8d8';
          style['height'] = '52px';
        } else {
          style['font-size'] = '14px';
          style['height'] = '52px';
        }
      } else {
        if (columnIndex == 2) {
          style['font-size'] = '14px';
          style['height'] = '20px';
          style['border-right'] = 'solid 1px #d8d8d8';
        } else {
          style['font-size'] = '14px';
          style['height'] = '20px';
        }
      };
      return style;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
@import "./assets/styles/common";
.Table {
  width: 100%;
  height: 100%;
}
</style>
