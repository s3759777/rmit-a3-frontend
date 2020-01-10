import React from "react";
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";

import App from "./App";
import Dashboard from "./components/dashboard";
import VisitorDashboard from "./visitor/visitor";

import VisitorProjects from "./visitor/projects";
import VisitorStudents from "./visitor/students";
import VisitorAssignments from "./visitor/assignments";
import VisitorCourses from "./visitor/courses";

import Projects from "./components/projects";
import Students from "./components/students";
import Assignments from "./components/assignments";
import Courses from "./components/courses";

import Layout from "./Layout";
import LoginPage from "./crud/LogIn";
import {useRoutes, useRedirect} from 'hookrouter';
import AddProject from "./crud/addProject";
import AddStudent from "./crud/addStudent";
import AddAdmin from "./crud/AddAdmin";

import AddCourse from "./crud/addCourse";
import AddAssignment from "./crud/addAssignment";
import StudentPage from "./crud/studentPage";
import AssignmentPage from "./crud/assignmentPage";
import CoursePage from "./crud/coursePage";
import ProjectPage from "./crud/projectPage";

import ViewProjectPage from "./visitor/projectPage";
import ViewStudentPage from "./visitor/studentPage";
import ViewAssignmentPage from "./visitor/assignmentPage";
import ViewCoursePage from "./visitor/coursePage";

import ImageUpload from "./crud/imageUploadtest";



import AdminRoute from './auth/AdminRoute';

{/*
import PrivateRoute from './auth/PrivateRoute';*/}
const Routes0 = {

  "/dashboard": () => <Dashboard />,

  //test

  '/testimage': () => <ImageUpload/>,

  "/students": () => <Students />,
  '/students/new': () => <AddStudent/>,
  '/students/:id': ({id}) => <StudentPage sId={id} />,


  "/projects": () => <Projects />,
  '/projects/new': () => <AddProject/>,
  '/projects/:id': ({id}) => <Projects studentId={id} />,


  "/courses": () => <Courses />,
  '/courses/new': () => <AddCourse/>,
  '/courses/:id': ({id}) => <CoursePage cId={id} />,

  "/assignments": () => <Assignments />,
  '/assignments/new': () => <AddAssignment/>,
  '/assignments/:id': ({id}) => <AssignmentPage aId={id} />,

};


//backup


class NonExistentPage extends React.Component {
  render() {
    return (
      <div>        <Layout
                  title="error"

                  className="container-fluid"
              >
        {" "}
        <Typography variant="h1">404</Typography> <Typography variant="h2">Page doesn't exist</Typography></Layout>
      </div>
    );
  }
}



const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>


                <Route path="/signin" exact component={LoginPage} />


    <Route path="/visitor" exact component={VisitorDashboard} />
    <Route path="/visitor/projects" exact component={VisitorProjects} />
    <Route path="/visitor/students" exact component={VisitorStudents} />
    <Route path="/visitor/assignments" exact component={VisitorAssignments} />
    <Route path="/visitor/courses" exact component={VisitorCourses} />


                <AdminRoute path="/dashboard" exact component={Dashboard} />*/


                <AdminRoute path="/studentList/new" exact component={AddStudent} />
                <AdminRoute path="/projectList/new" exact component={AddProject} />
                <Route path="/assignmentList/new" exact component={AddAssignment} />
                <AdminRoute path="/courseList/new" exact component={AddCourse} />

                <AdminRoute path="/adminList"  exact component={AddAdmin} />
                <AdminRoute path="/projectList"  exact component={Projects} />
                <AdminRoute path="/studentList"  exact component={Students} />
                <AdminRoute path="/courseList" exact component={Courses} />
                <AdminRoute path="/assignmentList"  exact component={Assignments} />

                <Route path="/visitor/projects/:id"  exact component={ViewProjectPage} />
                <Route path="/visitor/students/:id"  exact component={ViewStudentPage} />
                <Route path="/visitor/courses/:id" exact component={ViewCoursePage} />
                <Route path="/visitor/assignments/:id"  exact component={ViewAssignmentPage} />

                <AdminRoute path="/projectList/:id"  exact component={ProjectPage} />
                <AdminRoute path="/studentList/:id"  exact component={StudentPage} />
                <AdminRoute path="/courseList/:id" exact component={CoursePage} />
                <AdminRoute path="/assignmentList/:id"  exact component={AssignmentPage} />

<Route path="/" render={() => (<Redirect to="/visitor" />)} />
                <Route component={NonExistentPage} />

{/*
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
                <PrivateRoute path="/admin/products" exact component={ManageProducts} />
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />*/}
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
