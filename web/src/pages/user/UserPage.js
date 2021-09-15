import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import UserMain from './nestedPages/index';
import UserCourses from './nestedPages/UserCourses';
import UserCoursesAdded from './nestedPages/UserCoursesAdded';
import UserInfo from './nestedPages/UserInfo';

const UserPage = (props) => {

  const { path } = useRouteMatch()
  
  return (
    <Switch>
      <Route exact path={path} component={UserMain} />
      <Route path={`${path}/user-info`} component={UserInfo} />
      <Route path={`${path}/user-courses`} component={UserCourses} />
      <Route path={`${path}/user-courses-added`} component={UserCoursesAdded} />
    </Switch>
  )
}

export default UserPage
