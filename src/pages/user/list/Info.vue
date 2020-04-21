<template>
    <el-dialog 
      title="用户信息" 
      width="35%"
      :visible.sync="visible"
      :show="show"
      >
      <el-form :label-position="labelPosition" label-width="65px" :model="formLabelAlign" size="small">
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <div>
                  <el-upload style="margin: 0 auto"
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
              </div>
              <el-form-item label="学号">
                <el-input v-model="formLabelAlign.number" style="width:150px"></el-input>
              </el-form-item>
              <el-form-item label="专业">
                <el-select v-model="formLabelAlign.majaro" style="width:150px" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="姓名">
                <el-input v-model="formLabelAlign.username" style="width:150px"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio v-model="formLabelAlign.gender" label="1">男</el-radio>
                <el-radio v-model="formLabelAlign.gender" label="2">女</el-radio>
              </el-form-item>
              <el-form-item label="学院">
                <el-select v-model="formLabelAlign.college" style="width:150px" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="班级">
                <el-select v-model="formLabelAlign.className" style="width:150px" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
  
      <div slot="footer" class="dialog-footer">
        <el-button @click="OnClose">取 消</el-button>
        <el-button type="primary" @click="OnClose">确 定</el-button>
      </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'InfoDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    userData: {
      type: Object
    }
  },
  data() {
    return {
      visible: this.show,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      formLabelAlign: {
        username: '',
        gender: '',
        number: '',
        college: '',
        majaro: '',
        className: ''
      },
      labelPosition: 'top',
      imageUrl: '',
      options: []
    };
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        this.visible = this.show
      }
    },
    userData: {
      handler(userData) {
        this.formLabelAlign.username  = userData.username
        this.formLabelAlign.number    = userData.number
        this.formLabelAlign.gender    = '1'
        this.formLabelAlign.college   = userData.college
        this.formLabelAlign.majaro    = userData.majaro
        this.formLabelAlign.className = userData.className
      }
    }
  },
  methods: {
    OnClose() {
      this.$emit('update:show', false)
    }
  }
};
</script>
<style>
  /* .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  } */

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 0 0 10px 95px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 84px;
    height: 84px;
    line-height: 84px;
    text-align: center;
  }
  .avatar {
    width: 84px;
    height: 84px;
    display: block;
  }
</style>