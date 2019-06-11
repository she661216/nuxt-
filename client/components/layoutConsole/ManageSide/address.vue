<template>
  <div :style="'width:'+widthData" class="address3">
    <div class="w33">
      <el-select v-model="form.province" placeholder="请选择" @change="selectProvince">
        <el-option
          v-for="item in provinceList"
          :key="item.area_id"
          :label="item.title"
          :value="item.area_id"
        ></el-option>
      </el-select>
    </div>

    <div class="w33">
      <el-select v-model="form.city" placeholder="请选择" @change="selectCity">
        <el-option
          v-for="item in cityList"
          :key="item.area_id"
          :label="item.title"
          :value="item.area_id"
        ></el-option>
      </el-select>
    </div>

    <div class="w33">
      <el-select v-model="form.area" placeholder="请选择" @change="selectArea">
        <el-option
          v-for="item in areaList"
          :key="item.area_id"
          :label="item.title"
          :value="item.area_id"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import {
  apiGetAreaProvince,
  apiGetAreaCity,
  apiGetAreaArea
} from "../../../api/phpApi";
export default {
  props: {
    dialogTableVisiblee: Boolean,
    widthData: String,
    province: String,
    city: String,
    area: String
  },
  data() {
    return {
      provinceList: [],
      cityList: [],
      areaList: [],
      form: {
        province: "",
        city: "",
        area: ""
      }
    };
  },
  watch: {
    province(val) {
      this.form.province = val;
      this.getAreaCity(val);
    },

    city(val) {
      this.form.city = val;
      this.getAreaArea(val);
    },

    area(val) {
      this.form.area = val;
    }
  },

  mounted() {
    this.getAreaProvince();
  },

  methods: {
    close() {
      this.$emit("dialogHide");
    },

    async getAreaProvince() {
      let { data } = await apiGetAreaProvince();
      this.provinceList = data ? data : [];
    },

    async getAreaCity(id) {
      let { data } = await apiGetAreaCity({ id: id });
      this.cityList = data ? data : [];
    },

    async getAreaArea(id) {
      let { data } = await apiGetAreaArea({ id: id });
      this.areaList = data ? data : [];
    },

    async selectProvince(id) {
      this.getAreaCity(id);
      this.form.city = "";
      this.form.area = "";
    },

    async selectCity(id) {
      this.getAreaArea(id);
      this.form.area = "";
    },

    async selectArea(id) {
      this.$emit("selectAddressData", this.form);
    }
  }
};
</script>

<style lang="less" >
.address3 {
  .el-input--suffix .el-input__inner {
    padding-right: 0 !important;
    padding-left: 8px !important;
  }  
}
.el-select-dropdown__list {
    padding-bottom: 15px;
  }
.el-select-dropdown__item {
  padding: 0 5px !important;
  text-align: center;
}
</style>

<style lang="less" scoped>
.el-dialog {
  width: 580px;
  padding: 20px;
}
.el-row {
  text-align: center;
  .el-button {
    width: 120px;
    color: #fff;
  }
}
.w33 {
  width: 31.5% !important;
  float: left;
  margin-left: 2.5%;
}
.w33:first-child {
  margin-left: 0;
}
</style>
