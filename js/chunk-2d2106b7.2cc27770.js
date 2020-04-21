(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2106b7"],{b88c:function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("d2-container",[o("el-card",[o("el-input",{staticStyle:{width:"300px","margin-right":"20px"},attrs:{slot:"header",placeholder:"请输入课程名"},slot:"header"}),o("el-button",{staticClass:"blue",staticStyle:{"margin-right":"20px"},attrs:{slot:"header"},slot:"header"},[e._v("搜索")]),o("el-button",{staticClass:"blue",staticStyle:{"margin-right":"20px"},attrs:{slot:"header"},on:{click:e.handleAddCourse},slot:"header"},[e._v("新增课程")]),o("d2-crud",{ref:"d2Crud",attrs:{columns:e.columns,data:e.data,pagination:e.pagination,rowHandle:e.rowHandle},on:{"pagination-current-change":e.paginationCurrentChange,"custom-emit-2":e.handleScheduleCourse}}),o("el-dialog",{attrs:{title:"新增课程",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[o("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[o("el-form-item",{staticStyle:{width:"340px"},attrs:{label:"课程编号",prop:"openCourseSn","label-width":e.formLabelWidth}},[o("el-input",{model:{value:e.form.openCourseSn,callback:function(t){e.$set(e.form,"openCourseSn",t)},expression:"form.openCourseSn"}})],1),o("el-form-item",{staticStyle:{width:"340px"},attrs:{label:"开课名称",prop:"openCourseName","label-width":e.formLabelWidth}},[o("el-input",{model:{value:e.form.openCourseName,callback:function(t){e.$set(e.form,"openCourseName",t)},expression:"form.openCourseName"}})],1),o("el-form-item",{attrs:{label:"开课课程",prop:"courseName","label-width":e.formLabelWidth}},[o("el-select",{attrs:{filterable:"",placeholder:"请选择"},on:{change:e.handleCourseSelectChange},model:{value:e.form.courseName,callback:function(t){e.$set(e.form,"courseName",t)},expression:"form.courseName"}},e._l(e.courseOptions,(function(e){return o("el-option",{key:e.id,attrs:{value:e.value}})})),1)],1),o("el-form-item",{attrs:{label:"任课教师",prop:"teacherName","label-width":e.formLabelWidth}},[o("el-select",{attrs:{filterable:"",placeholder:"请选择"},on:{change:e.handleTeacherSelectChange},model:{value:e.form.teacherName,callback:function(t){e.$set(e.form,"teacherName",t)},expression:"form.teacherName"}},e._l(e.teacherOptions,(function(e){return o("el-option",{key:e.id,attrs:{value:e.value}})})),1)],1),o("el-form-item",{staticStyle:{width:"340px"},attrs:{label:"课时数",prop:"courseTimes","label-width":e.formLabelWidth}},[o("el-input",{model:{value:e.form.courseTimes,callback:function(t){e.$set(e.form,"courseTimes",t)},expression:"form.courseTimes"}})],1),o("el-form-item",{attrs:{label:"课程时间","label-width":e.formLabelWidth}},[o("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.form.courseDate,callback:function(t){e.$set(e.form,"courseDate",t)},expression:"form.courseDate"}})],1)],1),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:e.handleDialogCancel}},[e._v("取 消")]),o("el-button",{attrs:{type:"primary"},on:{click:e.handleDialogSubmit}},[e._v("确 定")])],1)],1)],1)],1)},a=[],s=(o("a9e3"),o("159b"),o("ade3")),i=o("9bd2"),n={data:function(){return Object(s["a"])({columns:[{title:"课程编号",key:"openCourseSn"},{title:"课程名",key:"openCourseName"},{title:"任课教师",key:"teacher"},{title:"课时数",key:"courseTimes"},{title:"课程时间",key:"courseDate"}],data:[],rowHandle:{custom:[{text:"查看",type:"info",size:"small",emit:"custom-emit-1"},{text:"移除",type:"danger",size:"small",emit:"custom-emit-2"}]},dialogTableVisible:!1,dialogFormVisible:!1,formLabelWidth:"120px",form:{openCourseSn:"",openCourseName:"",courseId:"",courseName:"",teacherId:0,teacherName:"",courseTimes:"",courseDate:""},teacherOptions:[],courseOptions:[],rules:{openCourseSn:[{required:!0,message:"请输入课程编号",trigger:"blur"},{min:1,max:20,message:"请输入课程编号",trigger:"blur"}],openCourseName:[{required:!0,message:"请输入课程名称",trigger:"blur"},{min:1,max:20,message:"请输入课程名称",trigger:"blur"}],courseTimes:[{type:"number",required:!0,message:"请输入课时数",trigger:"blur",transform:function(e){return Number(e)}}],courseName:[{required:!0,message:"请选择开课课程",trigger:"change"}],teacherName:[{required:!0,message:"请选择任课教师",trigger:"change"}]},pagination:{page:1,pageSize:6,total:0}},"rowHandle",{custom:[{text:"查看",type:"info",size:"small",emit:"custom-emit-1"},{text:"移除",type:"danger",size:"small",emit:"custom-emit-2"}]})},mounted:function(){this.fetchOpenCourseList()},methods:{paginationCurrentChange:function(e){this.pagination.page=e,this.fetchOpenCourseList()},fetchOpenCourseList:function(){var e=this;Object(i["a"])({url:"/openCourse/",method:"get",params:this.pagination}).then((function(t){e.pagination.page=t.page,e.pagination.pageSize=t.pageSize,e.pagination.total=t.total;var o=[];t.list.forEach((function(e){var t={openCourseId:e.openCourseId,openCourseName:e.openCourseName,openCourseSn:e.openCourseSn,teacher:e.teacherName,teacherId:e.teacherId,courseTimes:e.courseTimes,courseDate:e.courseStartTime+" - "+e.courseEndTime};o.push(t)})),e.data=o}))},fetchTeacherList:function(){var e=this;Object(i["a"])({url:"/teacher/all",method:"get"}).then((function(t){t.forEach((function(t){var o={id:t.teacher_id,value:t.teacher_name};e.teacherOptions.push(o)}))}))},fetchCourseList:function(){var e=this;Object(i["a"])({url:"/course/all",method:"get"}).then((function(t){t.forEach((function(t){var o={id:t.courseId,value:t.courseName};e.courseOptions.push(o)}))}))},clearUploadData:function(){this.form.courseSn="",this.form.courseName="",this.form.type="1",this.form.majorId=0,this.form.majorName="",this.teacherOptions=[],this.courseOptions=[],this.$refs.form.clearValidate(),this.$refs.form.resetFields()},handleAddCourse:function(){this.dialogFormVisible=!0,this.fetchTeacherList(),this.fetchCourseList()},handleTeacherSelectChange:function(e){var t=this;this.teacherOptions.forEach((function(o){o.value==e&&(t.form.teacherId=o.id)}))},handleCourseSelectChange:function(e){var t=this;this.courseOptions.forEach((function(o){o.value==e&&(t.form.courseId=o.id)}))},handleDialogCancel:function(){this.dialogFormVisible=!1,this.clearUploadData()},handleDialogSubmit:function(){var e={openCourseSn:this.form.openCourseSn,openCourseName:this.form.openCourseName,courseId:this.form.courseId,courseName:this.form.courseName,courseTimes:this.form.courseTimes,teacherId:this.form.teacherId,courseStartTime:this.form.courseDate[0],courseEndTime:this.form.courseDate[1]};Object(i["a"])({url:"/openCourse/",method:"post",data:e}).then((function(e){})),this.dialogFormVisible=!1,this.clearUploadData(),this.fetchOpenCourseList()},handleScheduleCourse:function(e){var t=e.row;console.log(t),this.$router.push({path:"/course/schedule",query:{openCourseId:t.openCourseId,openCourseName:t.openCourseName,teacherId:t.teacherId,teacherName:t.teacher}})}}},l=n,c=o("2877"),u=function(e){e.options.__source="src/pages/course/list/index.vue"},m=u,h=Object(c["a"])(l,r,a,!1,null,null,null);"function"===typeof m&&m(h);t["default"]=h.exports}}]);