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
            @custom-emit-2="handleScheduleCourse"
            >
        </d2-crud>
        
        <el-dialog title="新增课程" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item label="课程编号" prop="openCourseSn" :label-width="formLabelWidth" style="width:340px">
                <el-input v-model="form.openCourseSn" ></el-input>
            </el-form-item>
            <el-form-item label="开课名称" prop="openCourseName" :label-width="formLabelWidth" style="width:340px">
                <el-input v-model="form.openCourseName" ></el-input>
            </el-form-item>
            <el-form-item label="开课课程" prop="courseName" :label-width="formLabelWidth" >
                <el-select v-model="form.courseName" @change="handleCourseSelectChange"  filterable placeholder="请选择">
                    <el-option
                        v-for="item in courseOptions"
                        :key="item.id"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任课教师" prop="teacherName" :label-width="formLabelWidth" >
                <el-select v-model="form.teacherName" @change="handleTeacherSelectChange"  filterable placeholder="请选择">
                    <el-option
                        v-for="item in teacherOptions"
                        :key="item.id"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="课时数" prop="courseTimes" :label-width="formLabelWidth" style="width:340px">
                <el-input v-model="form.courseTimes" ></el-input>
            </el-form-item>
            <el-form-item label="课程时间" :label-width="formLabelWidth">
                <el-date-picker
                    v-model="form.courseDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
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
                    key: 'openCourseSn'
                },
                {
                    title: '课程名',
                    key: 'openCourseName'
                },
                {
                    title: '任课教师',
                    key: 'teacher'
                },
                {
                    title: '课时数',
                    key: 'courseTimes'
                },
                {
                    title: '课程时间',
                    key: 'courseDate'
                },
            ],
            data: [],
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
            dialogTableVisible: false,
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form:{
                openCourseSn: '',
                openCourseName: '',
                courseId: '',
                courseName: '',
                teacherId: 0,
                teacherName: '',
                courseTimes: '',
                courseDate: ''
            },
            teacherOptions: [],
            courseOptions: [],
            rules: {
                openCourseSn: [
                    { required: true, message: '请输入课程编号', trigger: 'blur' },
                    { min: 1, max:20, message: '请输入课程编号', trigger: 'blur' }
                ],
                openCourseName: [
                    { required: true, message: '请输入课程名称', trigger: 'blur' },
                    { min: 1, max:20,message: '请输入课程名称', trigger: 'blur' }
                ],
                courseTimes: [
                    { type: 'number', required: true, message: '请输入课时数', trigger: 'blur', transform: (value) => Number(value) },
                ],
                courseName: [
                    { required: true, message: '请选择开课课程', trigger: 'change' },
                ],
                teacherName: [
                    { required: true, message: '请选择任课教师', trigger: 'change' },
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
        this.fetchOpenCourseList()
    },
    methods: {
        paginationCurrentChange(currentPage) {
            this.pagination.page = currentPage
            this.fetchOpenCourseList()
        },
        fetchOpenCourseList() {
            request({
                url: '/openCourse/',
                method: 'get',
                params: this.pagination
            }).then(response => {
                this.pagination.page = response.page
                this.pagination.pageSize = response.pageSize
                this.pagination.total = response.total
                let list = []
                response.list.forEach(element => {
                    let item = {
                        openCourseId: element.openCourseId,
                        openCourseName: element.openCourseName,
                        openCourseSn: element.openCourseSn,
                        teacher: element.teacherName,
                        teacherId: element.teacherId,
                        courseTimes: element.courseTimes,
                        courseDate: element.courseStartTime + ' - ' + element.courseEndTime
                    }
                    list.push(item)
                })
                this.data = list
            })
        },
        fetchTeacherList(){
            request({
                url: '/teacher/all',
                method: 'get'
            }).then(response => {
                response.forEach(element => {
                    let item = {
                        id:   element.teacher_id,
                        value: element.teacher_name
                    }
                    this.teacherOptions.push(item)
                });
            })
        },
        fetchCourseList() {
            request({
                url: '/course/all',
                method: 'get'
            }).then(response => {
                response.forEach(element => {
                    let item = {
                        id:   element.courseId,
                        value: element.courseName
                    }
                    this.courseOptions.push(item)
                });
            })
        },
        clearUploadData() {
            this.form.courseSn = ''
            this.form.courseName = ''
            this.form.type = '1'
            this.form.majorId = 0
            this.form.majorName = ''

            this.teacherOptions = []
            this.courseOptions = []

            // 清除表单校验
            this.$refs.form.clearValidate()
            this.$refs.form.resetFields()

        },
        handleAddCourse(){
            this.dialogFormVisible = true
            this.fetchTeacherList()
            this.fetchCourseList()
        },
        handleTeacherSelectChange(value) {
            this.teacherOptions.forEach(item => {
                if (item.value == value) {
                    this.form.teacherId = item.id
                }
            })
        },
        handleCourseSelectChange(value) {
            this.courseOptions.forEach(item => {
                if (item.value == value) {
                    this.form.courseId = item.id
                }
            })
        },
        handleDialogCancel(){
            this.dialogFormVisible = false
            this.clearUploadData()
        },
        handleDialogSubmit() {
            let requestData = {
                openCourseSn: this.form.openCourseSn,
                openCourseName: this.form.openCourseName,
                courseId: this.form.courseId,
                courseName: this.form.courseName,
                courseTimes: this.form.courseTimes,
                teacherId: this.form.teacherId,
                courseStartTime: this.form.courseDate[0],
                courseEndTime: this.form.courseDate[1]
            }
            request({
                url: '/openCourse/',
                method: 'post',
                data: requestData
            }).then(response => {

            })

            this.dialogFormVisible = false
            this.clearUploadData()
            this.fetchOpenCourseList()
        },
        handleScheduleCourse(row) {
            let item = row.row
            console.log(item)
            this.$router.push({
                path: '/course/schedule',
                query: {
                    openCourseId: item.openCourseId,
                    openCourseName: item.openCourseName,
                    teacherId: item.teacherId,
                    teacherName: item.teacher
                }
            })
        }
    }
}
</script>

<style>

</style>