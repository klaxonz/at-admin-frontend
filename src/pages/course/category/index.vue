<template>
    <d2-container>
        <el-card>
            <el-input slot="header" style="width:300px;margin-right:20px" placeholder="请输入课程名"></el-input>
            <el-button slot="header" style="margin-right:20px" class="blue">搜索</el-button>
            <el-button slot="header" @click="handleAddCourse" style="margin-right:20px" class="blue">新增课程</el-button>
            <d2-crud
                ref="d2Crud"
                :columns="columns"
                :data="data"
                :pagination="pagination"
				@pagination-current-change="paginationCurrentChange"
				:rowHandle="rowHandle"
                >
            </d2-crud>

            <el-dialog title="增设课程" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" :rules="rules">
                <el-form-item label="课程编号" prop="courseSn" :label-width="formLabelWidth" style="width:340px">
                    <el-input v-model="form.courseSn"></el-input>
                </el-form-item>
                <el-form-item label="课程名称" prop="courseName" :label-width="formLabelWidth" style="width:340px"> 
                    <el-input v-model="form.courseName"></el-input>
                </el-form-item>
                <el-form-item label="课程类型" prop="type" :label-width="formLabelWidth">
                    <el-radio v-model="form.type" label="1">专业课</el-radio>
                    <el-radio v-model="form.type" label="2">公共课</el-radio>
                </el-form-item>
                <el-form-item v-if="form.type == 1" label="所属专业" prop="majorName" :label-width="formLabelWidth">
                    <el-select v-model="form.majorName" @change="handleSelectChange" filterable placeholder="请选择">
                        <el-option
                        v-for="item in majorOptions"
                        :key="item.id"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleDialogCancel">取 消</el-button>
                <el-button type="primary" @click="handleDialogSubmit">确 定</el-button>
            </div>
            </el-dialog>
        </el-card>
    </d2-container>
</template>

<script>
import request from "@/plugin/axios"


export default {
    data() {
        return {
            columns: [
                {
                    title: '课程编号',
                    key: 'courseSn'
                },
                {
                    title: '课程名',
                    key: 'courseName'
                },
                {
                    title: '课程类型',
                    key: 'type'
                },
                {
                    title: '课程所属专业',
                    key: 'majorName'
                },
                {
                    title: '课程添加时间',
                    key: 'addTime'
                },
            ],
            data: [],
            dialogTableVisible: false,
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form:{
                courseSn: '',
                courseName: '',
                type: '1',
                majorId: 0,
                majorName: ''
            },
            majorOptions: [],
            rules: {
                courseSn: [
                    { required: true, message: '请输入课程编号', trigger: 'blur' },
                    { min: 1, max:20, message: '请输入课程编号1', trigger: 'blur' }
                ],
                courseName: [
                    { required: true, message: '请输入课程名称', trigger: 'blur' },
                    { min: 1, max:20,message: '请输入课程名称1', trigger: 'blur' }
                ],
                majorName: [
                    { required: true, message: '请选择课程所属专业', trigger: 'change' },
                ],
                type: [
                    { required: true, message: '请选择课程类型', trigger: 'change'},
                ]
            },
            pagination: {
				page: 1,
				pageSize: 6,
				total: 0
			},
			rowHandle: {
				custom: [
					{
						text: '查看',
						type: 'info',
						size: 'small',
						emit: 'custom-emit-1'
					},
					{
						text: '移除',
						type: 'danger',
						size: 'small',
						emit: 'custom-emit-2'
					}
				]
			},
        }
    },
    mounted() {
        this.fetchCourseList()
    },
    methods: {
        paginationCurrentChange(currentPage) {
            this.pagination.page = currentPage
            this.fetchCourseList()
        },
        fetchCourseList() {
            let __this = this
            request({
                url: '/course/',
                method: 'get',
                params: __this.pagination
            }).then(response => {
                let courseList = response.list
                courseList.forEach(element => {
                    if (element.type == 1) {
                        element.type = '专业课'
                    } else if(element.type == 2) {
                        element.type = '公共课'
                    }
                })
                this.data = response.list
				this.pagination.total = response.total
            })
        },
        fetchMajorList() {
            request({
                url: '/major/',
                method: 'get'
            }).then(response => {
                let majorList = Object.values(response)
                majorList.forEach(element => {
                    element.forEach(major => {
                        let option = {
                            id: major.majorId,
                            value: major.majorName
                        }
                        this.majorOptions.push(option)
                    })
                });
            })
        },
        clearUploadData() {
            this.form.courseSn = ''
            this.form.courseName = ''
            this.form.type = '1'
            this.form.majorId = 0
            this.form.majorName = ''

            this.majorOptions = []

            // 清除表单校验
            this.$refs.form.clearValidate()
            this.$refs.form.resetFields()

        },
        handleSelectChange(value) {
            this.majorOptions.forEach(item => {
                if (item.value == value) {
                    this.form.majorId = item.id
                }
            })
        },
        handleAddCourse() {
            this.dialogFormVisible = true
            this.fetchMajorList()
        },
        handleDialogCancel() {
            this.dialogFormVisible = false
            this.clearUploadData()
        },
        handleDialogSubmit() {
            let requestData = Object.assign({}, this.form)
       
            request({
                url: '/course/',
                method: 'post',
                data: requestData
            }).then(response => {
                
            })

            this.dialogFormVisible = false
            this.clearUploadData()
            this.fetchCourseList()
        }
    
    }
}
</script>

<style>

</style>