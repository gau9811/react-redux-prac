import React from "react"
import {connect} from "react-redux"
import * as courseAction from "../../Redux/action/courseAction"
import * as authorAction from "../../Redux/action/authorAction"
import PropTypes from "prop-types"
import {bindActionCreators} from "redux"
import CourseList from "./courseList"
import {Redirect} from "react-router-dom"

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  } 
  componentDidMount() {
    const {courses, authors, actions} = this.props
    if (courses.length === 0) {
      actions.loadCourses().catch((err) => {
        alert("Loading authors error...." + err)
      })
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((err) => {
        alert("Loading Courses error...." + err)
      })
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>

        <button
          style={{marginBottom: 20}}
          className="btn btn-primary add-course"
          onClick={() => this.setState({redirectToAddCoursePage: true})}
        >
          Add Course
        </button>

        <CourseList courses={this.props.courses} />
        {/* <button onClick={this.course}>Courses</button> */}
      </>
    )
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length == 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            }
          }),
    authors: state.authors,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseAction.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorAction.loadAuthors, dispatch),
    },
  }
}

//  createCourse : courseActions.createCourse
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)
