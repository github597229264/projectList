<template>
  <div class="LightOverview" id="AllBox">
    <div class="topCon">
      <ul>
        <li
          v-for="(item,index) in inTop"
          :class="{activeLi:item.name==surename}"
          @click="clickLi(item,index)"
          :key="index"
        >{{item.name}}</li>
        <!-- <el-button
          type="text"
          size="small"
          class="detailsBtn"
          style="background:#3d619b"
          @click="updateCon"
        >
          <i class="el-icon-edit"></i> 编辑
        </el-button> -->
      </ul>
    </div>
    <div class="changeGr" style="margin-top:30px;text-align: left;">
      <el-button type="text" size="small" @click="ChangeFun" style="background:#3d619b">更换布局</el-button>
    </div>
    <!-- 第一种布局方式 -->
    <div class="centerCon" v-show="totalcon.con1">
      <div class="oneCon commHeight" style="position:relative">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData0" style="width:160px;" @blur="saveTitle('titleData0',titleData0)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con1One')"></i>
        </div>
        <div class="allUp" v-show="upBox">
          <p class="pcon">
            <span class="psapn1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con1[0].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con1[0].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con1[0].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con1[0].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn2" id="idCon">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con1[0].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
            <span class="psapn3">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con1[0].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:63px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con1One')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con1One"></div>
        <div :class="['con1One','commStyle',{ commStyle1: upBox==true}]"></div>
      </div>
    </div>
    <!-- 第二种布局方式 -->
    <div class="centerCon" v-show="totalcon.con2">
      <div class="box1 commHeight" style="position:relative">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData1" style="width:160px;" @blur="saveTitle('titleData1',titleData1)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con2One')"></i>
        </div>
        <div class="allUp allUp1" v-show="upBox">
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con2[0].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con2[0].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con2[0].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con2[0].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con2[0].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con2[0].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:4px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con2One')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con2One"></div>
        <div :class="['con2One','commStyle',{ commStyle1: upBox==true}]"></div>
      </div>
      <div class="box1 commHeight" style="margin-left:2%">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData3" style="width:160px;" @blur="saveTitle('titleData3',titleData3)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con2Two')"></i>
        </div>
        <div class="allUp allUp1" v-show="upBox">
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con2[1].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con2[1].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con2[1].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con2[1].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con2[1].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con2[1].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:4px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con2Two')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con2Two"></div>
        <div :class="['con2Two','commStyle',{ commStyle1: upBox==true}]"></div>
        <!-- <div class="contentGraph" id="con2Two"></div>
        <div class="con2Two commStyle"></div>-->
      </div>
      <div class="box1 commHeight" style="float:right;">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData2" style="width:160px;" @blur="saveTitle('titleData2',titleData2)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con2Three')"></i>
        </div>
        <div class="allUp allUp1" v-show="upBox">
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con2[2].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con2[2].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con2[2].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con2[2].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con2[2].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con2[2].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:4px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con2Three')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con2Three"></div>
        <div :class="['con2Three','commStyle',{ commStyle1: upBox==true}]"></div>
        <!-- <div class="contentGraph" id="con2Three"></div>
        <div class="con2Three commStyle"></div>-->
      </div>
      <div class="bottomCon commHeight" style="position:relative">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData4" style="width:160px;" @blur="saveTitle('titleData4',titleData4)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con2Four')"></i>
        </div>
        <div class="allUp" v-show="upBox">
          <p class="pcon">
            <span class="psapn1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con2[3].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con2[3].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con2[3].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con2[3].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn2" id="idCon">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con2[3].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
            <span class="psapn3">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con2[3].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:63px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con2Four')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con2Four"></div>
        <div :class="['con2Four','commStyle',{ commStyle2: upBox==true}]"></div>
        <!-- <div class="contentGraph" id="con2Four"></div>
        <div class="con2Four commStyle"></div>-->
      </div>
    </div>
    <!-- 第三种布局方式 -->
    <div class="centerCon" v-show="totalcon.con3">
      <div class="box1 commHeight">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData5" style="width:160px;" @blur="saveTitle('titleData5',titleData5)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con3One')"></i>
        </div>
        <div class="allUp allUp1" v-show="upBox">
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con3[0].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con3[0].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con3[0].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con3[0].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con3[0].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con3[0].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:4px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con3One')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con3One"></div>
        <div :class="['con3One','commStyle',{ commStyle1: upBox==true}]"></div>
        <!-- <div class="contentGraph" id="con3One"></div>
        <div class="con3One commStyle"></div>-->
      </div>
      <div class="box1 commHeight" style="margin-left:2%">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData6" style="width:160px;"  @blur="saveTitle('titleData6',titleData6)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con3Two')"></i>
        </div>
        <div class="allUp allUp1" v-show="upBox">
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con3[1].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con3[1].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con3[1].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con3[1].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con3[1].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con3[1].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:4px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con3Two')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con3Two"></div>
        <div :class="['con3Two','commStyle',{ commStyle1: upBox==true}]"></div>
        <!-- <div class="contentGraph" id="con3Two"></div>
        <div class="con3Two commStyle"></div>-->
      </div>
      <div class="box1 commHeight" style="float:right;">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData7" style="width:160px;"  @blur="saveTitle('titleData7',titleData7)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con3Three')"></i>
        </div>
        <div class="allUp allUp1" v-show="upBox">
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con3[2].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con3[2].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con3[2].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con3[2].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con3[2].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con3[2].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:4px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con3Three')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con3Three"></div>
        <div :class="['con3Three','commStyle',{ commStyle1: upBox==true}]"></div>
        <!-- <div class="contentGraph" id="con3Three"></div>
        <div class="con3Three commStyle"></div>-->
      </div>
      <div class="box1 commHeight">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData8" style="width:160px;" @blur="saveTitle('titleData8',titleData8)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con3Four')"></i>
        </div>
        <div class="allUp allUp1" v-show="upBox">
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con3[3].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con3[3].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con3[3].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con3[3].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con3[3].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con3[3].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:4px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con3Four')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con3Four"></div>
        <div :class="['con3Four','commStyle',{ commStyle1: upBox==true}]"></div>
      </div>
      <div class="box1 commHeight" style="margin-left:2%">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData9" style="width:160px;" @blur="saveTitle('titleData9',titleData9)" ></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con3Five')"></i>
        </div>
        <div class="allUp allUp1" v-show="upBox">
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con3[4].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con3[4].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con3[4].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con3[4].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con3[4].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con3[4].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:4px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con3Five')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con3Five"></div>
        <div :class="['con3Five','commStyle',{ commStyle1: upBox==true}]"></div>
      </div>
      <div class="box1 commHeight" style="float:right;">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData10" style="width:160px;" @blur="saveTitle('titleData10',titleData10)"></el-input>

          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con3Six')"></i>
        </div>
        <div class="allUp allUp1" v-show="upBox">
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con3[5].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con3[5].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con3[5].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con3[5].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con3[5].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con3[5].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:4px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con3Six')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con3Six"></div>
        <div :class="['con3Six','commStyle',{ commStyle1: upBox==true}]"></div>
      </div>
    </div>
    <!-- 第四种布局方式 -->
    <div class="centerCon" v-show="totalcon.con4">
      <div class="box1 box2 commHeight">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData11" style="width:160px;" @blur="saveTitle('titleData11',titleData11)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con4One')"></i>
        </div>
        <div class="allUp allUp1" v-show="upBox">
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con4[0].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con4[0].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con4[0].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con4[0].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con4[0].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con4[0].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:4px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con3Six')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con4One"></div>
        <div :class="['con4One','commStyle',{ commStyle1: upBox==true}]"></div>
        <!-- <div class="contentGraph" id="con4One"></div>
        <div class="con4One commStyle"></div>-->
      </div>
      <div class="box1 box2 commHeight">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData12" style="width:160px;" @blur="saveTitle('titleData12',titleData12)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con4Two')"></i>
        </div>
        <div class="allUp allUp1" v-show="upBox">
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con4[1].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con4[1].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con4[1].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con4[1].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con4[1].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con4[1].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:4px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con4Two')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con4Two"></div>
        <div :class="['con4Two','commStyle',{ commStyle1: upBox==true}]"></div>
        <!-- <div class="contentGraph" id="con4Two"></div>
        <div class="con4Two commStyle"></div>-->
      </div>
      <div class="box1 box2 commHeight">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData13" style="width:160px;" @blur="saveTitle('titleData13',titleData13)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con4Three')"></i>
        </div>
        <!-- <div class="contentGraph" id="con4Three"></div>
        <div class="con4Three commStyle"></div>-->
        <div class="allUp allUp1" v-show="upBox">
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con4[2].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con4[2].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con4[2].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con4[2].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con4[2].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con4[2].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:4px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con4Three')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con4Three"></div>
        <div :class="['con4Three','commStyle',{ commStyle1: upBox==true}]"></div>
      </div>
      <div class="box1 box2 commHeight">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData14" style="width:160px;" @blur="saveTitle('titleData14',titleData14)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con4Four')"></i>
        </div>
        <!-- <div class="contentGraph" id="con4Four"></div>
        <div class="con4Four commStyle"></div>-->

        <div class="allUp allUp1" v-show="upBox">
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con4[3].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con4[3].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con4[3].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con4[3].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con4[3].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con4[3].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:4px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con4Four')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con4Four"></div>
        <div :class="['con4Four','commStyle',{ commStyle1: upBox==true}]"></div>
      </div>
      <div class="bottomCon commHeight">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData15" style="width:160px;" @blur="saveTitle('titleData15',titleData15)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con4Five')"></i>
        </div>
        <div class="allUp" v-show="upBox">
          <p class="pcon">
            <span class="psapn1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con4[4].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con4[4].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con4[4].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con4[4].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn2" id="idCon">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con4[4].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
            <span class="psapn3">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con4[4].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:63px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con4Five')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con4Five"></div>
        <div :class="['con4Five','commStyle',{ commStyle2: upBox==true}]"></div>
        <!-- <div class="contentGraph" id="con4Five"></div>
        <div class="con4Five commStyle"></div>-->
      </div>
    </div>
    <!-- 第五种布局方式 -->
    <div class="centerCon" v-show="totalcon.con5">
      <div class="box1 commHeight">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData16" style="width:160px;" @blur="saveTitle('titleData16',titleData16)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con5One')"></i>
        </div>
        <!-- <div class="contentGraph" id="con5One"></div>
        <div class="con5One commStyle"></div>-->
        <div class="allUp allUp1" v-show="upBox">
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con5[0].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con5[0].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con5[0].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con5[0].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con5[0].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con5[0].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:4px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con5One')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con5One"></div>
        <div :class="['con5One','commStyle',{ commStyle1: upBox==true}]"></div>
      </div>
      <div class="box1 commHeight" style="margin-left:2%">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData17" style="width:160px;" @blur="saveTitle('titleData17',titleData17)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con5Two')"></i>
        </div>
        <div class="allUp allUp1" v-show="upBox">
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con5[1].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con5[1].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con5[1].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con5[1].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con5[1].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con5[1].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:4px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con5Two')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con5Two"></div>
        <div :class="['con5Two','commStyle',{ commStyle1: upBox==true}]"></div>
        <!-- <div class="contentGraph" id="con5Two"></div>
        <div class="con5Two commStyle"></div>-->
      </div>
      <div class="box1 commHeight" style="float:right;">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData18" style="width:160px;" @blur="saveTitle('titleData18',titleData18)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con5Three')"></i>
        </div>
        <div class="allUp allUp1" v-show="upBox">
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con5[2].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con5[2].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con5[2].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con5[2].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con5[2].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con5[2].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:4px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con5Three')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con5Three"></div>
        <div :class="['con5Three','commStyle',{ commStyle1: upBox==true}]"></div>
        <!-- <div class="contentGraph" id="con5Three"></div>
        <div class="con5Three commStyle"></div>-->
      </div>
    </div>
    <!-- 第六种布局方式 -->
    <div class="centerCon" v-show="totalcon.con6">
      <div class="box1 box3 commHeight">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData19" style="width:160px;" @blur="saveTitle('titleData19',titleData19)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con6One')"></i>
        </div>
        <!-- <div class="contentGraph" id="con6One"></div>
        <div class="con6One commStyle"></div>-->
        <div class="allUp allUp1" v-show="upBox">
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con6[0].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con6[0].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con6[0].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con6[0].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con6[0].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con6[0].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:4px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con6One')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con6One"></div>
        <div :class="['con6One','commStyle',{ commStyle1: upBox==true}]"></div>
      </div>
      <div class="box1 box3 commHeight">
        <div class="titleCon" v-show="!upBox">
          <el-input v-model="titleData20" style="width:160px;" @blur="saveTitle('titleData20',titleData20)"></el-input>
          <i class="el-icon-circle-plus-outline iconFloat" @click="showGraph('con6Two')"></i>
        </div>
        <div class="allUp allUp1" v-show="upBox">
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">频率</p>
              <el-select v-model="editArr.con6[1].ping" placeholder="请选择">
                <el-option
                  v-for="item in pinglv"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c"></p>
              <el-select v-model="editArr.con6[1].gap" placeholder="请选择">
                <el-option
                  v-for="item in pastMonth"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="removeClass">
              <i class="el-icon-remove-outline"></i>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">趋势类型</p>
              <el-select v-model="editArr.con6[1].trend" placeholder="请选择">
                <el-option
                  v-for="item in trendType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">从</p>
              <el-date-picker v-model="editArr.con6[1].start" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <p class="pcon">
            <span class="psapn1 hengspan1">
              <p class="p1c">查看类型</p>
              <el-select v-model="editArr.con6[1].type" placeholder="请选择">
                <el-option
                  v-for="item in CheckType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </span>
            <span class="psapn3 hengspan2">
              <p class="p1c">至</p>
              <el-date-picker v-model="editArr.con6[1].end" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </span>
          </p>
          <el-button
            type="text"
            style="background:#007acc;margin-top:4px;float:right;margin-right:30px;padding: 0 20px"
            @click="editContent('con6Two')"
          >更新</el-button>
        </div>
        <div :class="[{ contentGraph1: upBox==true }, contentGraph]" id="con6Two"></div>
        <div :class="['con6Two','commStyle',{ commStyle1: upBox==true}]"></div>
      </div>
    </div>
    <!-- 选择图形 -->
    <el-dialog :visible.sync="centergraph" width="600" center>
      <ul>
        <li
          class="graphLi"
          v-for="(item,index) in graphData"
          :key="index"
          @click="graphClick(item)"
        >
          <p>
            <img :src="item.img" alt class="imgGrapj" />
            <img
              src="./assets/img/AllOverview/Choose.png"
              alt
              v-show="item.id==currentgraphId"
              class="twoImg"
            />
          </p>
          <p>
            <span>{{item.text1}}</span>
            <span>{{item.text2}}</span>
          </p>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centergraph = false">取消</el-button>
        <el-button type="primary" @click="saveGraph">确定</el-button>
      </span>
    </el-dialog>
    <!-- 选择布局方式 -->
    <el-dialog :title="Name" :visible.sync="centerDialogVisible" width="800" center>
      <ul class="openCon">
        <li v-for="(item,index) in imgBox" :key="index">
          <img :src="item.img" alt @click="clickImg(item)" />
          <img src="./assets/img/AllOverview/Choose.png" alt v-show="item.id==currentId" />
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveGrid">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import msgIcon from "@/assets/img/LightOverview/sprite.png";
// import msgIcon1 from "@/assets/img/LightOverview/gonglv.png";
// import msgIcon2 from "@/assets/img/LightOverview/nenghao.png";
// import msgIcon3 from "@/assets/img/LightOverview/shebei.png";
// import msgIcon4 from "@/assets/img/LightOverview/yichang.png";
export default {
  name: "LightOverview",

  data() {
    return {
      myChart: null,
      titleData0: localStorage.getItem("titleData0")==null?"报告": localStorage.getItem("titleData0"),
      titleData1: localStorage.getItem("titleData1")==null?"报告": localStorage.getItem("titleData1"),
      titleData2:localStorage.getItem("titleData2")==null?"报告": localStorage.getItem("titleData2"),
      titleData3:localStorage.getItem("titleData3")==null?"报告": localStorage.getItem("titleData3"),
      titleData4:localStorage.getItem("titleData4")==null?"报告": localStorage.getItem("titleData4"),
      titleData5: localStorage.getItem("titleData5")==null?"报告": localStorage.getItem("titleData5"),
      titleData6:localStorage.getItem("titleData6")==null?"报告": localStorage.getItem("titleData6"),
      titleData7:localStorage.getItem("titleData7")==null?"报告": localStorage.getItem("titleData7"),
      titleData8: localStorage.getItem("titleData8")==null?"报告": localStorage.getItem("titleData8"),
      titleData9:localStorage.getItem("titleData9")==null?"报告": localStorage.getItem("titleData9"),
      titleData10:localStorage.getItem("titleData10")==null?"报告": localStorage.getItem("titleData10"),
      titleData11: localStorage.getItem("titleData11")==null?"报告": localStorage.getItem("titleData11"),
      titleData12: localStorage.getItem("titleData12")==null?"报告": localStorage.getItem("titleData12"),
      titleData13: localStorage.getItem("titleData13")==null?"报告": localStorage.getItem("titleData13"),
      titleData14:localStorage.getItem("titleData14")==null?"报告": localStorage.getItem("titleData14"),
      titleData15:localStorage.getItem("titleData15")==null?"报告": localStorage.getItem("titleData15"),
      titleData16:localStorage.getItem("titleData16")==null?"报告": localStorage.getItem("titleData16"),
      titleData17: localStorage.getItem("titleData17")==null?"报告": localStorage.getItem("titleData17"),
      titleData18: localStorage.getItem("titleData18")==null?"报告": localStorage.getItem("titleData18"),
      titleData19: localStorage.getItem("titleData19")==null?"报告": localStorage.getItem("titleData19"),
      titleData20:localStorage.getItem("titleData20")==null?"报告": localStorage.getItem("titleData20"),

      // 频率的数组
      pinglv: [
        {
          name: "频率1",
          id: 1
        },
        {
          name: "频率2",
          id: 2
        }
      ],
      // 过去的几个月
      pastMonth: [
        {
          name: "过去2个月",
          id: 1
        }
      ],
      trendType: [
        {
          name: "趋势1",
          id: 1
        }
      ],
      CheckType: [
        {
          name: "查看类型1",
          id: 1
        }
      ],
      editArr: {
        con1: [
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          }
        ],
        con2: [
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          },
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          },
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          },
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          }
        ],
        con3: [
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          },
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          },
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          },
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          },
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          },
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          }
        ],
        con4: [
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          },
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          },
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          },
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          },
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          }
        ],
        con5: [
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          },
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          },
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          }
        ],
        con6: [
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          },
          {
            ping: "",
            gap: "",
            trend: "",
            type: "",
            start: "",
            end: ""
          }
        ]
      },
      contentGraph: "contentGraph",
      contentGraph1: "contentGraph1",
      upBox: false,
      totalcon: {
        con1: true,
        con2: false,
        con3: false,
        con4: false,
        con5: false,
        con6: false
      }, //选择哪种布局，显示隐藏
      // 存放图形的类型，数据，节点名称
      graphInitData: [
        {
          nodeName: "con1One",
          type: "",
          datay: []
        },
        {
          nodeName: "con2One",
          type: "",
          datay: []
        },
        {
          nodeName: "con2Two",
          type: "",
          datay: []
        },
        {
          nodeName: "con2Three",
          type: "",
          datay: []
        },
        {
          nodeName: "con2Four",
          type: "",
          datay: []
        },
        {
          nodeName: "con3One",
          type: "",
          datay: []
        },
        {
          nodeName: "con3Two",
          type: "",
          datay: []
        },
        {
          nodeName: "con3Three",
          type: "",
          datay: []
        },
        {
          nodeName: "con3Four",
          type: "",
          datay: []
        },
        {
          nodeName: "con3Five",
          type: "",
          datay: []
        },
        {
          nodeName: "con3Six",
          type: "",
          datay: []
        },
        {
          nodeName: "con4One",
          type: "",
          datay: []
        },
        {
          nodeName: "con4Two",
          type: "",
          datay: []
        },
        {
          nodeName: "con4Three",
          type: "",
          datay: []
        },
        {
          nodeName: "con4Four",
          type: "",
          datay: []
        },
        {
          nodeName: "con4Five",
          type: "",
          datay: []
        },
        {
          nodeName: "con4Five",
          type: "",
          datay: []
        },
        {
          nodeName: "con5One",
          type: "",
          datay: []
        },
        {
          nodeName: "con5Two",
          type: "",
          datay: []
        },
        {
          nodeName: "con5Three",
          type: "",
          datay: []
        },
        {
          nodeName: "con6One",
          type: "",
          datay: []
        },
        {
          nodeName: "con6Two",
          type: "",
          datay: []
        }
      ],
      surename: "Supply and Demand",
      centerDialogVisible: false,
      Name: "更改仪表盘布局",
      inTop: [
        {
          name: "主页"
        }
        // {
        //   name: "Opportunities "
        // },
        // {
        //   name: "Ceneration"
        // },
        // {
        //   name: "Report"
        // },
        // {
        //   name: "Weekiy report"
        // }
      ],
      currentId:localStorage.getItem("currentId")==null?"1": localStorage.getItem("currentId"),
      imgBox: [
        {
          id: 1,
          img: require("./assets/img/AllOverview/open1.png")
        },
        {
          id: 2,
          img: require("./assets/img/AllOverview/open2.png")
        },
        {
          id: 3,
          img: require("./assets/img/AllOverview/open3.png")
        },
        {
          id: 4,
          img: require("./assets/img/AllOverview/open4.png")
        },
        {
          id: 5,
          img: require("./assets/img/AllOverview/open5.png")
        },
        {
          id: 6,
          img: require("./assets/img/AllOverview/open6.png")
        }
      ],
      centergraph: false, //图形隐藏显示
      currentgraphId: "", //当前选择的图形id
      divName: "", //点击的是当前的哪一个div弹出图形选择框
      graphData: [
        {
          id: 1,
          img: require("./assets/img/AllOverview/zhexian.jpg"),
          text1: "添加趋势图",
          text2: "显示一段时间内数据的趋势"
        },
        {
          id: 2,
          img: require("./assets/img/AllOverview/zhuzhuang.jpg"),
          text1: "添加条形图",
          text2: "用柱状图表示的图形以显示其如何贴近最近值"
        },
        {
          id: 3,
          img: require("./assets/img/AllOverview/bing.jpg"),
          text1: "添加饼图",
          text2: "圆形图形分成几个部分,每个部分的面积的大小代表它的数量并成比例"
        },
        {
          id: 4,
          img: require("./assets/img/AllOverview/sangji.jpg"),
          text1: "添加桑基图",
          text2: "用桑基图直观的表示图形属于哪个分类"
        },
        {
          id: 5,
          img: require("./assets/img/AllOverview/reli.jpg"),
          text1: "添加热力图",
          text2: "热力图可以直观的表示当前图形占的比例大小"
        },
        {
          id: 6,
          img: require("./assets/img/AllOverview/pan.jpg"),
          text1: "添加仪表盘",
          text2: "仪表盘指标的表示当前图形的所占数据的百分比"
        }
      ],
      // 折线图的option
      zhexian: {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
          //
          axisLine: {
            //x轴
            show: false
          },
          axisTick: {
            //x轴刻度线
            show: false
          }
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { type: ["line", "bar"] }
          }
        },
        color: ["#5fbc68", "#4f9eda", "#2688f9", "#8164fe", "#f8ab31"],
         legend: {
        type: 'scroll', //分页类型
        // y: '8%',
        right:'15%',
        data: (function (){
            var list = [];
            for (var i = 1; i <=2000; i++) {
                list.push(i + 2000 + '');
            }
            return list;
        })()
        },
        yAxis: {
          type: "value",
          name: "kw·h",
          axisLine: {
            //y轴
            show: false
          },
          axisTick: {
            //y轴刻度线
            show: false
          }
        },
        series: [
          // {
          //   name: "1",
          //   data: [820, 932, 901, 934, 1290, 1330, 1320],
          //   type: "line",
          //   smooth: true,
          //   symbol: "none",
          //   areaStyle: {}
          // },
          // {
          //   name: "2",
          //   data: [820, 932, 901, 934, 1290, 1330, 1320],
          //   type: "line",
          //   smooth: true,
          //   symbol: "none",
          //   areaStyle: {}
          // }
        ]
      },
      // 柱状图的option
      zhuzhuang: {
        grid: {
          left: "3%",
          // right: "4%",
          // bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: [0, 0.01],
          name: "月",
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#d8d8d8"
              // width: 8 //这里是为了突出显示加上的
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              color: "#303030",
              fontSize: 13
            }
          },
          data: []
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { type: ["line", "bar"] }
          }
        },
        yAxis: {
          type: "value",
          axisTick: {
            //y轴刻度线
            show: false
          },
          name: "kw·h",
          axisLine: {
            lineStyle: {
              color: "#d8d8d8"
              // width: 8 //这里是为了突出显示加上的
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              color: "#303030",
              fontSize: 13
            }
          },

          data: []
        },
       legend: {
        type: 'scroll', //分页类型
        // y: '8%',
        right:'15%',
        data: (function (){
            var list = [];
            for (var i = 1; i <=2000; i++) {
                list.push(i + 2000 + '');
            }
            return list;
        })()
        },
        color: ["#5fbc68", "#07bc83", "#2688f9", "#8164fe", "#f8ab31"],
        series: [
          // {
          //   name: "2011年",
          //   type: "bar",
          //   data: [18203, 23489, 29034, 104970, 131744, 630230]
          // },
          // {
          //   name: "2012年",
          //   type: "bar",
          //   data: [19325, 23438, 31000, 121594, 134141, 681807]
          // }
        ]
      },
      // 饼图的option
      bing: {
        legend: {
        type: 'scroll', //分页类型
        // bottom: 10,
        data: (function (){
            var list = [];
            for (var i = 1; i <=2000; i++) {
                list.push(i + 2000 + '');
            }
            return list;
        })()
        },
        color: [
          "#f6a949",
          "#dbbb58",
          "#5fbc68",
          "#4f9eda",
          "#4d66c3",
          "#3eb8c0"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["30%", "70%"],
            // avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            label: {
              normal: {
                position: "inner", // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                formatter: "{d}%"
              }
            },
            data: [
              // { value: 335, name: "直接访问" },
              // { value: 310, name: "邮件营销" },
              // { value: 234, name: "联盟广告" },
              // { value: 135, name: "视频广告" },
              // { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      },
      // 桑吉图
      sangji: {
        title: {
          // text: "Sankey Diagram"
        },
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove"
        },
        series: [
          {
            type: "sankey",
            data: [],
            links: [],
            focusNodeAdjacency: true,
            levels: [
              {
                depth: 0,
                itemStyle: {
                  color: "#fbb4ae"
                },
                lineStyle: {
                  color: "source",
                  opacity: 0.6
                }
              },
              {
                depth: 1,
                itemStyle: {
                  color: "#b3cde3"
                },
                lineStyle: {
                  color: "source",
                  opacity: 0.6
                }
              },
              {
                depth: 2,
                itemStyle: {
                  color: "#ccebc5"
                },
                lineStyle: {
                  color: "source",
                  opacity: 0.6
                }
              },
              {
                depth: 3,
                itemStyle: {
                  color: "#decbe4"
                },
                lineStyle: {
                  color: "source",
                  opacity: 0.6
                }
              }
            ],
            lineStyle: {
              normal: {
                curveness: 0.5
              }
            }
          }
        ]
      },
      // 热力图
      reli: {
        // tooltip: {
        //   position: "top"
        // },
        animation: false,
        grid: {
          height: "50%",
          y: "20%"
        },
        xAxis: {
          type: "category",
          data: [],
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: "category",
          data: [],
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: "horizontal",
          left: "center"
          // bottom: "15%"
        },
        series: [
          {
            name: "Punch Card",
            type: "heatmap",
            data: [],
            label: {
              normal: {
                show: true
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      // 仪表图
      yibiao: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [
              // { value: 50, name: "hahha" },
            ]
          }
        ]
      }
    };
  },
  methods: {
    //点击更新按钮
    editContent(e) {
      console.log(e);
      console.log(this.editArr);
    },
    // 编辑
    updateCon() {
      this.upBox = !this.upBox;
      // $(".contentGraph").css("height","calc(100% - 50px - 20px - 100px)")
      // $(".commStyle").css("height","calc(100% - 90px  - 100px)")
      // $(".commStyle").css("top","150px")
      this.initload();
    },
    // 点击导航栏的切换
    clickLi(item, index) {
      this.surename = item.name;
      console.log(index);
      index = index + 1;
      if (index == 1) {
        this.totalcon = {
          con1: true,
          con2: false,
          con3: false,
          con4: false,
          con5: false,
          con6: false
        };
      } else if (index == 2) {
        this.totalcon = {
          con1: false,
          con2: true,
          con3: false,
          con4: false,
          con5: false,
          con6: false
        };
      } else if (index == 3) {
        this.totalcon = {
          con1: false,
          con2: false,
          con3: true,
          con4: false,
          con5: false,
          con6: false
        };
      } else if (index == 4) {
        this.totalcon = {
          con1: false,
          con2: false,
          con3: false,
          con4: true,
          con5: false,
          con6: false
        };
      } else if (index == 5) {
        this.totalcon = {
          con1: false,
          con2: false,
          con3: false,
          con4: false,
          con5: true,
          con6: false
        };
      }
      this.initload();
    },
    // 选择布局方式
    clickImg(item) {
      // console.log(item);
      this.currentId = item.id;
      localStorage.setItem("currentId",this.currentId)
    },
    // 保存选择的布局方式
    saveGrid() {
      if (this.currentId == 1) {
        this.totalcon = {
          con1: true,
          con2: false,
          con3: false,
          con4: false,
          con5: false,
          con6: false
        };
      } else if (this.currentId == 2) {
        this.totalcon = {
          con1: false,
          con2: true,
          con3: false,
          con4: false,
          con5: false,
          con6: false
        };
      } else if (this.currentId == 3) {
        this.totalcon = {
          con1: false,
          con2: false,
          con3: true,
          con4: false,
          con5: false,
          con6: false
        };
      } else if (this.currentId == 4) {
        this.totalcon = {
          con1: false,
          con2: false,
          con3: false,
          con4: true,
          con5: false,
          con6: false
        };
      } else if (this.currentId == 5) {
        this.totalcon = {
          con1: false,
          con2: false,
          con3: false,
          con4: false,
          con5: true,
          con6: false
        };
      } else if (this.currentId == 6) {
        this.totalcon = {
          con1: false,
          con2: false,
          con3: false,
          con4: false,
          con5: false,
          con6: true
        };
      }
      this.centerDialogVisible = false;
      // console.log("kkkk");
      this.initload();
    },
    //选择哪种图形
    graphClick(item) {
      this.currentgraphId = item.id;
    },
    // 点击选择的图形
    showGraph(name) {
      this.centergraph = true;
      this.currentgraphId = "";
      // 当前哪一个div
      this.divName = name;
    },
    saveGraph() {
      // console.log(this.currentgraphId)
      // console.log(this.divName)
      this.centergraph = false;
      var grData = JSON.parse(localStorage.getItem("initData"));
      if (grData != null) {
        this.graphInitData = grData;
      }
      this.graphInitData.forEach((k, v) => {
        if (k.nodeName == this.divName) {
          k.datay = [];
          if (this.currentgraphId == 1) {
            k.type = "zhexian";
            document.getElementById(this.divName).innerHTML = "折线图";
          } else if (this.currentgraphId == 2) {
            k.type = "zhuzhuang";
            document.getElementById(this.divName).innerHTML = "柱状图";
          } else if (this.currentgraphId == 3) {
            k.type = "bing";
            document.getElementById(this.divName).innerHTML = "饼图";
          } else if (this.currentgraphId == 4) {
            k.type = "sang";
            document.getElementById(this.divName).innerHTML = "桑吉图";
          } else if (this.currentgraphId == 5) {
            k.type = "re";
            document.getElementById(this.divName).innerHTML = "热力图";
          } else if (this.currentgraphId == 6) {
            k.type = "yibiao";
            document.getElementById(this.divName).innerHTML = "仪表盘";
          } else {
            k.type = "";
          }
        }
      });
      // console.log(this.graphInitData);
      localStorage.setItem("initData", JSON.stringify(this.graphInitData));
    },
    // 改变布局
    ChangeFun() {
      this.centerDialogVisible = true;
      this.upBox = false;
      this.initload();
    },
    initload() {
      // console.log("lll");
      let that = this;
      var myChart = "";
      setTimeout(function() {
        var he = $(".commHeight").innerHeight() - 50;
        // console.log(he);
        $(".contentGraph div").css("width", "100%");
        $(".contentGraph div").css("height", he + "px");
        $(".contentGraph canvas").css("width", "100%");
        $(".contentGraph canvas").css("height", he + "px");
        $(".contentGraph canvas").attr("height", he);
      }, 10);
      setTimeout(function() {
        var datare1 = [];
        var tcon = JSON.parse(localStorage.getItem("datare1"));
        // console.log(tcon);
        if (tcon != null) {
          datare1 = tcon;
        } else {
          datare1 = [];
        }
        var initCon = JSON.parse(localStorage.getItem("initData"));
        // console.log(initCon)
        if (initCon != null) {
          initCon.forEach((k, v) => {
            document.getElementById(k.nodeName).style.display = "block";
            document
              .getElementById(k.nodeName)
              .setAttribute("_echarts_instance_", "");

            myChart = that.echarts.init(document.getElementById(k.nodeName));

            // 横坐标的值
            var xcon = localStorage.getItem("xcon");
            // console.log(xcon);
            that.yibiao.series[0].data = [];
            that.zhexian.xAxis.data = [];
            that.zhuzhuang.yAxis.data = [];
            that.zhuzhuang.xAxis.data = [];
            that.reli.xAxis.data = [];
            that.zhexian.xAxis.data = JSON.parse(xcon);
            that.zhuzhuang.yAxis.data = JSON.parse(xcon);
            that.zhuzhuang.xAxis.data = JSON.parse(xcon);
            that.reli.xAxis.data = JSON.parse(xcon);
            that.reli.series[0].data = [];
            that.reli.series[0].data = datare1;
            that.zhexian.series = [];
            that.zhuzhuang.series = [];
            that.bing.series[0].data = [];
            that.zhexian.legend.data = [];
            that.zhuzhuang.legend.data = [];
            that.bing.legend.data = [];

            that.sangji.series[0].data = [];
            that.sangji.series[0].links = [];

            that.reli.yAxis.data = [];
            // 折线图赋值
            var nb = k.datay;
            // console.log(nb);
            if (nb.length > 0) {
              that.yibiao.series[0].data.push({
                value: (Math.random() * 100).toFixed(0),
                name: nb[nb.length - 1].name
              });
            }

            for (var t = 0; t < nb.length; t++) {
              var hc = nb[t].condata;
              var obj = {
                name: nb[t].name,
                data: nb[t].condata,
                type: "line",
                smooth: true,
                symbol: "none"
                // areaStyle: {}
              };

              that.zhexian.legend.data.push(nb[t].name);
              that.zhexian.series.push(obj);

              // 柱状图赋值
              var zhuobj = {
                name: nb[t].name,
                data: nb[t].condata,
                type: "bar"
              };
              that.zhuzhuang.legend.data.push(nb[t].name);
              that.zhuzhuang.series.push(zhuobj);
              var sum = 0;
              //饼图赋值
              for (var j = 0; j < nb[t].condata.length; j++) {
                sum += nb[t].condata[j];
              }
              var bingObj = {
                value: sum,
                name: nb[t].name
              };
              that.bing.legend.data.push(nb[t].name);
              that.bing.series[0].data.push(bingObj);
              // 热力图
              that.reli.yAxis.data.push(nb[t].name);
              // 桑吉图
              var tc = that.sangji.series[0].data;

              let tchas = tc.some(item => {
                if (nb[t].company == item.name) {
                  // item.name = nb[t].company;
                  return true;
                } else {
                  return false;
                }
              });

              let tchas1 = tc.some(item => {
                if (nb[t].factory == item.name) {
                  // item.name = nb[t].company;
                  return true;
                } else {
                  return false;
                }
              });

              let tchas2 = tc.some(item => {
                if (nb[t].dept == item.name) {
                  // item.name = nb[t].company;
                  return true;
                } else {
                  return false;
                }
              });

              let tchas3 = tc.some(item => {
                if (nb[t].name == item.name) {
                  // item.name = nb[t].company;
                  return true;
                } else {
                  return false;
                }
              });

              if (!tchas) {
                that.sangji.series[0].data.push({
                  name: nb[t].company
                });
              }
              if (!tchas1) {
                that.sangji.series[0].data.push({
                  name: nb[t].factory
                });
              }
              if (!tchas2) {
                that.sangji.series[0].data.push({
                  name: nb[t].dept
                });
              }
              if (!tchas3) {
                that.sangji.series[0].data.push({
                  name: nb[t].name
                });
              }

              //桑基图赋值
              var links0 = {
                source: nb[t].company,
                target: nb[t].factory,
                value: sum / 100
              };
              var links1 = {
                source: nb[t].factory,
                target: nb[t].dept,
                value: sum / 100
              };
              var links2 = {
                source: nb[t].dept,
                target: nb[t].name,
                value: sum / 100
              };
              that.sangji.series[0].links.push(links0);

              that.sangji.series[0].links.push(links1);

              that.sangji.series[0].links.push(links2);
            }
            // console.log(this.zhexian.series)
            if (k.type == "zhexian") {
              myChart.clear();
              myChart.setOption(that.zhexian, true);
            } else if (k.type == "zhuzhuang") {
              myChart.clear();
              myChart.setOption(that.zhuzhuang, true);
            } else if (k.type == "bing") {
              console.log(that.bing.series[0].data)
              myChart.clear();
              myChart.setOption(that.bing, true);
            } else if (k.type == "sang") {
              myChart.clear();
              myChart.setOption(that.sangji, true);
            } else if (k.type == "re") {
              myChart.clear();
              myChart.setOption(that.reli, true);
            } else if (k.type == "yibiao") {
              myChart.clear();
              myChart.setOption(that.yibiao, true);
            }
          });
        } else {
          console.log("当前没有图形可以展示");
        }
      }, 80);
    },
    //保存标题
    saveTitle(v,t){
      localStorage.setItem(v,t)
    },
  },

  created() {},
  mounted() {
    // 加载保存的图
    this.initload();
    this.saveGrid();
    var datare1 = [];
    var tcon = JSON.parse(localStorage.getItem("datare1"));
    if (tcon != null) {
      datare1 = tcon;
    } else {
      datare1 = [];
    }

    // 使用刚指定的配置项和数据显示图表。
    this.$root.Bus.$on("ElEdrag", e => {
      var id = e;
      document.getElementById(id).setAttribute("_echarts_instance_", "");
      var myChart = this.echarts.init(document.getElementById(id));
      // 拖得具体的数据源
      var realname = localStorage.getItem("realname");
      var grData = JSON.parse(localStorage.getItem("initData"));
      if (grData != null) {
        this.graphInitData = grData;
      }
      this.yibiao.series[0].data = [];
      this.yibiao.series[0].data.push({
        value: (Math.random() * 100).toFixed(0),
        name: realname
      });
      //桑基图赋值
      var company = localStorage.getItem("company");
      var factory = localStorage.getItem("factory");
      var dept = localStorage.getItem("dept");

      this.graphInitData.forEach((k, v) => {
        if (id == k.nodeName) {
          console.log(k.type);
          if (k.type) {
            // 获取到数据
            var dataCon = JSON.parse(localStorage.getItem("dataCon"));
            // 横坐标的值
            var xcon = localStorage.getItem("xcon");
            // console.log(xcon);
            this.zhexian.xAxis.data = [];
            this.zhuzhuang.yAxis.data = [];
            this.sangji.series[0].data = [];
            this.sangji.series[0].links = [];
            this.reli.xAxis.data = [];
            this.reli.yAxis.data = [];

            this.zhexian.xAxis.data = JSON.parse(xcon);
            this.reli.xAxis.data = JSON.parse(xcon);
            this.zhuzhuang.yAxis.data = JSON.parse(xcon);

            // 判断是否已经拖过数据源
            let isHas = k.datay.some(item => {
              if (realname == item.name) {
                item.condata = dataCon;
                return true;
              } else {
                return false;
              }
            });

            if (!isHas) {
              k.datay.push({
                name: realname,
                company: company,
                factory: factory,
                dept: dept,
                condata: dataCon
              });
            }

            // console.log(k.datay);

            this.zhexian.series = [];
            this.zhuzhuang.series = [];
            this.bing.series[0].data = [];
            this.zhexian.legend.data = [];
            this.zhuzhuang.legend.data = [];
            this.bing.legend.data = [];

            // 折线图赋值
            var nb = k.datay;
            for (var t = 0; t < nb.length; t++) {
              var hc = nb[t].condata;
              var obj = {
                name: nb[t].name,
                data: nb[t].condata,
                type: "line",
                smooth: true,
                symbol: "none"
                // areaStyle: {}
              };

              this.zhexian.legend.data.push(nb[t].name);
              this.zhexian.series.push(obj);

              // 柱状图赋值
              var zhuobj = {
                name: nb[t].name,
                data: nb[t].condata,
                type: "bar"
              };
              this.zhuzhuang.legend.data.push(nb[t].name);
              this.zhuzhuang.series.push(zhuobj);
              var sum = 0;
              //饼图赋值
              for (var j = 0; j < nb[t].condata.length; j++) {
                sum += nb[t].condata[j];
              }
              var bingObj = {
                value: sum,
                name: nb[t].name
              };
              this.bing.legend.data.push(nb[t].name);
              this.bing.series[0].data.push(bingObj);
              // console.log(this.bing.series[0].data);
              // 热力图
              this.reli.yAxis.data.push(nb[t].name);
              // 桑吉图
              var tc = this.sangji.series[0].data;
              // 判断是否已经拖过数据源
              // this.sangji.series[0].data.push({
              //     name:nb[t].company
              // });
              let tchas = tc.some(item => {
                if (nb[t].company == item.name) {
                  // item.name = nb[t].company;
                  return true;
                } else {
                  return false;
                }
              });

              let tchas1 = tc.some(item => {
                if (nb[t].factory == item.name) {
                  // item.name = nb[t].company;
                  return true;
                } else {
                  return false;
                }
              });

              let tchas2 = tc.some(item => {
                if (nb[t].dept == item.name) {
                  // item.name = nb[t].company;
                  return true;
                } else {
                  return false;
                }
              });

              let tchas3 = tc.some(item => {
                if (nb[t].name == item.name) {
                  // item.name = nb[t].company;
                  return true;
                } else {
                  return false;
                }
              });

              if (!tchas) {
                this.sangji.series[0].data.push({
                  name: nb[t].company
                });
              }
              if (!tchas1) {
                this.sangji.series[0].data.push({
                  name: nb[t].factory
                });
              }
              if (!tchas2) {
                this.sangji.series[0].data.push({
                  name: nb[t].dept
                });
              }
              if (!tchas3) {
                this.sangji.series[0].data.push({
                  name: nb[t].name
                });
              }

              //桑基图赋值
              var links0 = {
                source: nb[t].company,
                target: nb[t].factory,
                value: sum / 100
              };
              var links1 = {
                source: nb[t].factory,
                target: nb[t].dept,
                value: sum / 100
              };
              var links2 = {
                source: nb[t].dept,
                target: nb[t].name,
                value: sum / 100
              };
              this.sangji.series[0].links.push(links0);

              this.sangji.series[0].links.push(links1);

              this.sangji.series[0].links.push(links2);
            }

            for (let i = 0; i < 12; i++) {
              var two = Number((Math.random() * 2).toFixed(0));
              datare1.push([i, two, two]);
            }
            datare1 = datare1.map(function(item) {
              return [item[1], item[0], item[2] || "-"];
            });
            localStorage.setItem("datare1", JSON.stringify(datare1));
            this.reli.series[0].data = datare1;
            // console.log(this.reli.series[0].data);

            // console.log(datare1)
            if (k.type == "zhexian") {
              myChart.clear();
              myChart.setOption(this.zhexian, true);
            } else if (k.type == "zhuzhuang") {
              myChart.clear();
              myChart.setOption(this.zhuzhuang, true);
            } else if (k.type == "bing") {
              myChart.clear();
              myChart.setOption(this.bing, true);
            } else if (k.type == "sang") {
              myChart.clear();
              // console.log(this.sangji.series[0].links);
              // console.log(this.sangji.series[0].data);
              myChart.setOption(this.sangji, true);
            } else if (k.type == "re") {
              myChart.clear();
              // console.log(datare)
              // console.log(this.reli.series[0].data);
              // console.log(this.reli.yAxis.data);
              myChart.setOption(this.reli, true);
            } else if (k.type == "yibiao") {
              myChart.clear();
              myChart.setOption(this.yibiao, true);
            }
          } else {
            this.$message({
              showClose: true,
              message: "请先选择图形类型",
              type: "warning"
            });
          }
        }
        // console.log(this.graphInitData);
        localStorage.setItem("initData", JSON.stringify(this.graphInitData));
        // window.onresize = function() {
        //   myChart.resize();
        // };
      });
    });
  },
  destroyed: function() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' >
@import "./assets/styles/common";

#AllBox {
  width: 100%;
  height: 100%;
  div.el-dialog__body input,
  .el-select,
  div.el-date-editor.el-input {
    height: 24px !important;
  }
  .el-input__inner {
    background-color: #d8e0e5;
    border-radius: 4px;
    border: 1px solid #d8e0e5;
    color: #404040;
    height: 24px;
    border-radius: 0px;
  }
  .el-input__icon {
    line-height: 24px;
  }
  .topCon {
    width: 100%;
    position: fixed;
    top: 68px;
    height: 40px;
    background-color: #d8e0e5;
    left: 200px;
    text-align: left;
    @media screen and (max-width: 1366px) {
      top: 50px;
    }
    padding-left: 20px;
    box-sizing: border-box;
    overflow: hidden;
    ul {
      position: relative;
    }
    li {
      float: left;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin-top: 8px;
      background-color: #e7ebf2;
      margin-right: 3px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      padding: 0 10px;
      color: #6485bc;
      cursor: pointer;
    }
    .activeLi {
      margin-top: 8px;
      background-color: #f0f4fb;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      color: #fbad33;
      font-weight: bold;
      height: 36px;
    }
  }
  button {
    height: 26px;
    color: #ffffff;
    font-size: 14px;
    padding: 0 10px;
    box-sizing: border-box;
    border-radius: 4px;
    // margin: -36px 0;

    // @include media($m1660) {
    //   margin: -37px 0;
    // }
    &.detailsBtn {
      background: linear-gradient(to right, #306ef4, 50%, #4597ff);
      // background-color: #3272f5;
      box-shadow: 0px 5px 15px 0px rgba(53, 116, 243, 0.5);
      position: absolute;
      right: 12%;
      top: 7px;
      @media screen and (max-width: 1366px) {
        right: 20%;
      }
      @media screen and (max-width: 1660px) {
        right: 20%;
      }
    }
  }
  .elapsedTime {
    text-align: left;
    font-size: 16px;
    @include media($m1440) {
      font-size: 14px;
    }
    line-height: 24px;
    color: #505050;
    span {
      font-weight: bold;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      &:nth-of-type(2) span {
        margin: 0 3px;
        padding: 2px;
        font-size: 22px;
        font-family: GrayDesign;
        text-align: center;
        background-color: #dae6fe;
        box-shadow: 0px 0px 5px 0px #c0d2f7;
        border-radius: 4px;
        color: #2e69eb;
      }
    }
  }
  .openCon {
    overflow: hidden;
    li {
      cursor: pointer;
      float: left;
      position: relative;
      &:nth-of-type(2n-1) {
        margin-right: 15px;
      }
      &:nth-of-type(2n) {
        margin-left: 15px;
      }
      img:nth-of-type(2) {
        position: absolute;
        left: 89%;
        top: 7%;
      }
    }
  }
  .centerCon {
    margin-top: 10px;
    height: 100%;
    .box1 {
      width: 32%;
      height: 45%;
      background-color: #fff;
      // border-radius: 4px;
      float: left;
      // margin-right: 0.8%;
      margin-bottom: 30px;
      position: relative;
      border: solid 1px #d8d8d8;
    }
    .commStyle {
      position: absolute;
      height: calc(100% - 90px);
      width: 100%;
      top: 95px;
      // top:153px;
      background: #fff;
      opacity: 0.1;
    }
    .contentGraph {
      height: calc(100% - 50px - 20px);
      // background-color: red;
      width: 100%;
      padding: 10px 10px;
      box-sizing: border-box;
    }
    .contentGraph1 {
      height: calc(100% - 50px - 20px - 80px);
    }
    .commStyle1 {
      height: calc(100% - 90px - 130px);
      top: 222px;
    }
    .commStyle2 {
      height: calc(100% - 90px - 80px);
      top: 181px;
    }
    .box2 {
      width: 24%;
    }
    .box2:nth-of-type(2) {
      margin-left: 1.4%;
    }
    .box2:nth-of-type(3) {
      float: right;
      margin-left: 1.2%;
    }
    .box2:nth-of-type(4) {
      float: right;
    }
    .box3 {
      width: 49%;
      height: 60%;
      margin-top: 120px;
    }
    .box3:nth-of-type(2) {
      float: right;
    }
    .bottomCon {
      width: 100%;
      height: 40%;
      background-color: #fff;
      clear: both;
      // padding-top: 10px;
      // border-radius: 4px;
      position: relative;
      border: solid 1px #d8d8d8;
    }
    .iconFloat {
      float: right;
      font-size: 18px;
      color: #406ad6;
      margin-top: 15px;
      margin-right: 2%;
      cursor: pointer;
    }
    .oneCon {
      width: 100%;
      height: 92%;
      margin-top: 10px;
      background-color: #fff;
      // border-radius: 4px;
    }
  }

  .titleCon {
    height: 50px;
    text-align: left;
    color: #303030;
    font-weight: bold;
    border-bottom: solid 1px #d9e3f3;
    line-height: 50px;
    text-indent: 40px;
  }
  // 选择图形的
  .graphLi {
    margin-top: 20px;
    height: 80px;
    border-bottom: solid 1px #ddd;
    position: relative;
    .imgGrapj {
      height: 60px;
    }
    .twoImg {
      position: absolute;
      top: 1px;
      left: 1px;
    }
    p:nth-child(1) {
      width: 12%;
      float: left;
      height: 80px;
    }
    p:nth-child(2) {
      width: 70%;
      float: left;
      height: 80px;
      padding-left: 20px;
      box-sizing: border-box;
    }
    p {
      span:nth-child(1) {
        display: block;
        font-size: 15px;
        color: #4c84ff;
        font-weight: bold;
        // height: 60px;
        line-height: 23px;
      }
      span:nth-child(2) {
        display: block;
        font-size: 14px;
        color: #303030;
        line-height: 20px;
      }
    }
  }
  .graphLi:last-child {
    border-bottom: none;
  }
  .msg {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    height: 280px;
    @include media($m1660) {
      height: 230px;
    }
    @include media($m1366) {
      height: 180px;
    }
    li {
      height: 280px;
      cursor: default;
      opacity: 0;
      &:first-child {
        animation: liShow 0.6s ease-in-out forwards;
        .img {
          animation: imgShow 0.6s ease-in-out forwards;
        }
      }
      &:nth-of-type(2) {
        animation: liShow 0.6s ease-in-out 0.2s forwards;
        .img {
          animation: imgShow 0.6s ease-in-out 0.2s forwards;
        }
      }
      &:nth-of-type(3) {
        animation: liShow 0.6s ease-in-out 0.4s forwards;
        .img {
          animation: imgShow 0.6s ease-in-out 0.4s forwards;
        }
      }
      &:last-child {
        animation: liShow 0.6s ease-in-out 0.6s forwards;
        .img {
          animation: imgShow 0.6s ease-in-out 0.6s forwards;
        }
        cursor: pointer;
      }
      @include text-overflow(23.6%);
      @include media($m1660) {
        height: 230px;
      }
      @include media($m1366) {
        height: 180px;
      }
      background-color: #ffffff;
      border-radius: 10px;
      transition: all 0.5s;
      &:hover {
        box-shadow: 0px 30px 50px 0px rgba(0, 0, 0, 0.1);
      }
      .img {
        margin: 54px auto 18px;
        width: 58px;
        transform: scale(0); // animation: imgShow 1s;
        height: 58px;
        @include media($m1660) {
          margin: 38px auto 9px;
        }
        @include media($m1366) {
          margin: 14px auto 9px;
        }
      }
      p,
      div {
        font-weight: bold;
        font-size: 16px;
        @include media($m1660) {
          font-size: 14px;
        }
        color: #303030;
      }
      div {
        color: #505050;
        font-size: 50px;
        @include media($m1440) {
          font-size: 40px;
          margin-top: 30px;
        }
        @include media($m1366) {
          font-size: 40px;
        }
        @include media($m1280) {
          font-size: 20px;
        }
        font-family: GrayDesign;
        margin-top: 36px;
        span {
          font-size: 30px;
          @include media($m1280) {
            font-size: 12px;
          }
        }
      }
    }
  }
  .overview {
    width: 100%; // height: 438px;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 30px auto 0px;
    &:last-child {
      margin-bottom: 20px;
    }
    @include media($m1660) {
      margin: 30px auto 0px; // height: 350px;
    }
    @include media($m1366) {
      margin: 20px auto 0px; // height: 300px;
    }
    padding: 0 40px;
    p {
      text-align: left;
      height: 60px;
      line-height: 60px;
      border-bottom: solid 1px #d9e3f3;
      padding: 0 40px;
      margin: 0 -40px;
      span {
        font-size: 16px;
        font-weight: bold;
        color: #303030;
      }
      @include media($m1440) {
        font-size: 14px;
      }
    }
    ul {
      height: 100%;
      float: right;
      li {
        float: left;
        height: 22px;
        margin: 26px 16px 0;
        @include media($m1024) {
          margin: 26px 10px 0;
        }
        font-size: 14px;
        color: #303030;
        line-height: 10px;
        cursor: pointer;
        &.activeBtn {
          color: #4c84ff;
          font-weight: bold;
          border-bottom: 3px solid #4c84ff;
        }
      }
    }
    #historyCharts {
      height: 300px;
    }
  }
  .p1c {
    text-align: left;
    margin-left: 11%;
    height: 24px;
  }
  .pcon1 {
    width: 100%;
    line-height: 24px;
  }
  .pcon {
    padding-top: 2px;
    // margin-top: 2px;
    clear: both;
    position: relative;
    line-height: 24px;

    .commSelect {
      width: 80%;
      height: 24px;
      background-color: #d8e0e5;
      font-size: 12px;
      color: #404040;
      text-indent: 10px;
    }
    .psapn1 {
      float: left;
      width: 20%;
      margin-left: 8%;
    }
    .psapn2 {
      float: left;
      width: 20%;
      margin-left: 10%;
    }
    .psapn3 {
      float: left;
      width: 20%;
      margin-left: 10%;
    }
    .hengspan1 {
      width: 40%;
    }
    .hengspan2 {
      width: 40%;
    }
    .removeClass {
      position: absolute;
      right: 2px;
      font-size: 18px;
      i {
        color: #d81e06;
      }
    }
  }

  .allUp {
    height: 160px;
    // padding-top: 10px;
    background-color: #f8f8f8;
    padding-bottom: 10px;
    border-bottom: solid 1px #d8d8d8;
  }
  .allUp1 {
    height: 186px;
  }

  @keyframes imgShow {
    0% {
      transform: scale(0);
    }
    80% {
      transform: scale(1.4);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes liShow {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .titleCon {
    .el-input__inner {
      background-color: #fff !important;
      margin-left: -30px;
      // border
    }
  }
}
</style>
