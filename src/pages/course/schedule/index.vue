<template>
	<d2-container>
		<el-row>
			<el-col :span="7">
				<div class="left-side">
					<el-card>
						<div class="wrapper" style="width:260px;margin:0 auto">
							<el-row>
								周数：
								<el-input-number v-model="weekCounter" size="mid" @change="handleWeekCounterChange" :min="1" :max="10" label="描述文字"  placeholder="sada"></el-input-number>
							</el-row>
							<el-row>
								课程：
								  <el-input
										v-model="openCourse.courseName"
										:disabled="true">
									</el-input>
							</el-row>
							<el-row>
								教师：
									<el-input
										v-model="teacher.teacherName"
										:disabled="true">
									</el-input>
							</el-row>
							<el-row>
								班级：
								<el-select v-model="selectOptions.class.className" @change="handleClassSelectChange" filterable placeholder="请选择">
                    <el-option
											v-for="item in classOptions"
											:key="item.id"
											:value="item.value">
										</el-option>
								</el-select>
							</el-row>
							<el-row>
								<el-button type="primary" plain @click="handleCourseSubmit">提交</el-button>
							</el-row>
						</div>
					</el-card>
				</div>
			</el-col>
			<el-col :span="17">
				<div class="right-side">
					<el-card>
						<div class="header" slot="header"><h3 style="text:center">第{{weekCounter}}周</h3></div>
						<div id="coursesTable" ref="courseTable">
						</div>

					</el-card>
				</div>
			</el-col>

		</el-row>
		<el-dialog
			title="选择教学地点"
			:visible.sync="dialogVisible"
			width="30%">
			教学地点:
			<el-select v-model="selectOptions.location.locationName" @change="handleLocationSelectChange" clearable filterable placeholder="请选择">
					<el-option
						v-for="item in locationOptions"
						:key="item.id"
						:value="item.value">
					</el-option>
			</el-select>
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleLocationSelectClose">取 消</el-button>
				<el-button type="primary" @click="handleLocationSelectSubmit">确 定</el-button>
			</span>
		</el-dialog>
	</d2-container>
  
</template>

<script>
import request from "@/plugin/axios"
import Timetables from 'timetables'

// 课程表设置
var Timetable
var timetableType = [
				[{index: '1',name: '8:30'}, 1],
				[{index: '2',name: '9:30'}, 1],
				[{index: '3',name: '10:30'}, 1],
				[{index: '4',name: '11:30'}, 1],
				[{index: '5',name: '12:30'}, 1],
				[{index: '6',name: '14:30'}, 1],
				[{index: '7',name: '15:30'}, 1],
				[{index: '8',name: '16:30'}, 1],
				[{index: '9',name: '17:30'}, 1],
				[{index: '10',name: '18:30'}, 1],
				[{index: '11',name: '19:30'}, 1],
				[{index: '12',name: '20:30'}, 1]
];
var week =  ['周一', '周二', '周三', '周四', '周五', '周六', '周日' ];
var weekMap = {'周一': 1,'周二': 2,'周三': 3,'周四': 4,'周五': 5,'周六': 6,'周日': 7}
var highlightWeek = new Date().getDay();
var styles = {
		Gheight: 80,
		leftHandWidth: 80
};

export default {
	data() {
		return {
			weekCounter: 1,
			weekCounterMax: 1,
			selectOptions: {
				class: {
					classId: '',
					className: ''
				},
				location: {
					locationId: '',
					locationName: ''
				}
			},
			courseTable: [],
			courseTableList: [],
			openCourse: {
				courseId: '',
				courseName: ''
			},
			teacher: {
				teacherId: '',
				teacherName: ''
			}, 
			courseSection: {
				day: '',
				section: ''
			},
			courseOptions: [],
			teacherOptions:[],
			classOptions: [],
			locationOptions: [],
			selectedDate: {},
			dialogVisible: false
		}
	},
	created() {
		let data = this.$route.query
		this.openCourse.courseId = data.openCourseId
		this.openCourse.courseName = data.openCourseName
		this.teacher.teacherId = data.teacherId
		this.teacher.teacherName = data.teacherName
		this.fetchClassList()

	},
	mounted() {
		this.initCourseTable()
	},
	methods: {
		fetchClassList() {
			request({
				url: '/class/all',
				method: 'get'
			})
			.then(response => {
				let list = []
				response.forEach(element => {
					let item = {
						id: element.classId,
						value: element.className
					}
					list.push(item)
				});	
				this.classOptions = list
			})
		},
		fetchAvailableLocation(week, day, section) {
			request({
				url: '/weekCourse/listAvailableLocation',
				method: 'get',
				params: {
					week: week,
					day: day,
					section: section
				}
			}).then(response => {
				let list = []
				response.forEach(element => {
					let item = {
						id: element.locationId,
						value: element.locationName
					}
					list.push(item)
				})
				this.locationOptions = list
			})
		},
		fetchWeekCourseList(){
			// 参数： openCourseId, teacherId
			request({
				url: '/weekCourse/listCourse',
				method: 'get',
				params: {
					openCourseId: this.$route.query.openCourseId,
					teacherId:    this.$route.query.teacherId
				}
			}).then(response => {
				
				let weekCourse = []

				if (response.length != 0) {
					response.forEach(element => {

						if (element.week > this.weekCounterMax || weekCourse.length == 0) {
							this.weekCounterMax = element.week
							let singleCourseTable = this.createSingelBlankCourseTable()
							weekCourse.push(singleCourseTable)
						}
						let mergeName = element.open_course_name + '@' + element.teacher_name + '@' + element.location_name

						let week    = parseInt(element.week)
						let day     = parseInt(element.week_day)
						let section = parseInt(element.section)

						weekCourse[week-1][day-1][section-1] = mergeName

						// 组装selectdDate
						let type = element.type 

						let index = week + '-' + day + '-' + section
						let item = {
							locationId:   element.location_id,
							locationName: element.location_name,
							type: 				element.type
						}
						this.selectedDate[index]= item

						// 班级
						this.selectOptions.class.classId   = element.class_id
						this.selectOptions.class.className = element.class_name

					})

					this.courseTableList = weekCourse
					this.courseTable = weekCourse[0]
					this.reRenderTable(this.courseTable)

					// 样式调整
					this.beautyDomNode()
				} else {
					let singleCourseTable = this.createSingelBlankCourseTable()
					this.courseTable = singleCourseTable
					this.courseTableList.push(singleCourseTable)
				}
			})
		},
		initCourseTable() {

			let __this = this
			// 实例化(初始化课表)
			Timetable = new Timetables({
					el: '#coursesTable',
					timetables: __this.createSingelBlankCourseTable(),
					week: week,
					timetableType: timetableType,
					highlightWeek: highlightWeek,
					gridOnClick: __this.handleGridOnClick,
					styles: styles
			})

			this.fetchWeekCourseList()
		},
		reRenderTable(newTableList) {

			let __this = this
			
			Timetable.setOption({
				timetables: newTableList,
				week: week,
				timetableType: timetableType,
				highlightWeek: highlightWeek,
				gridOnClick: __this.handleGridOnClick,
				styles: styles
			})
		},
		beautyDomNode(){
			Object.keys(this.selectedDate).forEach(key => {
				let keyArray = key.split('-')
				let week     = parseInt(keyArray[0])
				let day      = parseInt(keyArray[1])
				let section  = parseInt(keyArray[2])
				if(this.weekCounter == week) {
					let item = this.selectedDate[key]
					let type = item.type
					if(type > 1) {
						let $li = document.querySelectorAll('#coursesTable ' + '.stage_' + section + ' li:nth-child(' + day +  ')')[0]
						$li.className += 'unclickable'
					}
				}
			}) 
		},
		createSingelBlankCourseTable() {
			// 构建courseTable
			let sigleWeekTable = []
			for(let i = 0; i < 7; i++) {
				let day = []
				for( let j = 0; j < 12; j++ ) {
					day.push("")
				}
				sigleWeekTable.push(day)
			}
			return sigleWeekTable
		},
		handleGridOnClick(e) {
			this.dialogVisible = true
			let day = weekMap[e.week]

			// 保存当前点击的周/节
			this.courseSection.day =  day
			this.courseSection.section = e.index

			if (e.name != ''){
				let index = this.weekCounter + '-' + this.courseSection.day + '-' + this.courseSection.section
				let location = this.selectedDate[index]
				console.log(location)
				this.selectOptions.location.locationId = location.locationId
				this.selectOptions.location.locationName = location.locationName
			}
			
			// 获取周/天/节
			this.fetchAvailableLocation(this.weekCounter, day, e.index)
		},
		handleClassSelectChange(e){
			this.classOptions.forEach(item => {
				if (e == item.value) {
					this.selectOptions.class.classId = item.id
					this.selectOptions.class.className = item.value
				}
			});
		},
		handleWeekCounterChange(c, o){
			if (this.weekCounter > this.weekCounterMax){
				this.weekCounterMax = this.weekCounter
				var timetables = this.createSingelBlankCourseTable()
				this.courseTable = timetables
				this.courseTableList.push(timetables)
				
				this.reRenderTable(timetables)
			} else {
				this.courseTable = this.courseTableList[this.weekCounter - 1]
				this.reRenderTable(this.courseTable)
			}
		},
		handleLocationSelectChange(e) {
			this.locationOptions.forEach(item => {
				if (e == item.value) {
					this.selectOptions.location.locationId = item.id
					this.selectOptions.location.locationName = item.value
				}
			})
		},
		handleLocationSelectClear() {
			this.selectOptions.location.locationId = ''
			this.selectOptions.location.locationName = ''
		},
		handleLocationSelectClose() {
			this.dialogVisible = false
		},
		handleLocationSelectSubmit() {
			// courseName + teacherName + locationName
			let course = this.openCourse.courseName + '@' 
						+ this.teacher.teacherName + '@'
						+ this.selectOptions.location.locationName

			let item = {
				locationId: this.selectOptions.location.locationId,
				locationName: this.selectOptions.location.locationName,
				type: 0
			}

			let index = this.weekCounter + '-' + this.courseSection.day + '-' + this.courseSection.section
			this.selectedDate[index] = item
			
			let currentCourseTable = this.courseTableList[this.weekCounter - 1]
			currentCourseTable[this.courseSection.day - 1][this.courseSection.section - 1] = course

			this.courseTable = currentCourseTable
			this.courseTableList[this.weekCounter - 1] = currentCourseTable

			this.reRenderTable(currentCourseTable)

			this.dialogVisible = false
		},
		handleCourseSubmit() {
			let data = {}
			// 组装数据
			// teacherId, openCourseId, classId, dateSelected
			data.teacherId = this.teacher.teacherId
			data.openCourseId = this.openCourse.courseId
			data.classId = this.selectOptions.class.classId

			let list = []
			Object.keys(this.selectedDate).forEach(key => {

				let item = key.split('-')
				let week = parseInt(item[0])
				let day  = parseInt(item[1])
				let section = parseInt(item[2])
				let locationId = this.selectedDate[key].locationId
				let type = parseInt(this.selectedDate[key].type)

				if (type == 0) {
						let el = {
						week: week,
						day: day,
						section: section,
						locationId: locationId
					}
					list.push(el)
				}
				
				
			})
			if(list.length == 0) {
				return
			}

			data.weekSelect = list

			request({
				url: '/weekCourse/add',
				method: 'post',
				data: data
			}).then(response => {
				console.log(response)
			})

		}
	}
}
</script>

<style>
.left-side {
	/* background: yellowgreen; */
	height: 100px;
	margin: 0 auto;
}
.left-side .wrapper .el-row{
	margin-top: 20px;
}

.right-side {
	background: burlywood;
	height: 100px;
}
.course-table div{
	text-align: center;
}
.col-header {
	float: left;
	width: 100px;
	height: 30px;
	border: 1px solid gray;
}
.col {
	float: left;
	width: 100px;
	height: 100px;
	border: 1px solid gray;
}

/* 课程表 */

.Courses-content ul li{
	border: 1px solid gray !important;
}
.unclickable {
	pointer-events: none
}


</style>