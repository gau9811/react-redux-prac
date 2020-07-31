import * as types from "./actionTypes"
import * as courseApi from "../../api/courseApi"
export function createCourse(course) {
  return {type: types.CREATE_COURSE, course}
}

export function loadCoursesSuccess(courses) {
  return {type: types.LOAD_COURSES_SUCCESS, courses}
}

export function createCourseSuccess(course) {
  return {type: types.CREATE_COURSE_SUCCESS, course}
}

export function updateCourseSuccess(course) {
  return {type: types.UPDATE_COURSE_SUCCESS, course}
}

export function loadCourses() {
  return function (dispatch) {
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses))
      })
      .catch((err) => {
        throw err
      })
  }
}

export function saveCourse() {
  return function (dispatch) {
    return courseApi
      .saveCourse()
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse))
      })
      .catch((err) => {
        throw err
      })
  }
}
