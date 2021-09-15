import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom' 
import Courses from './pages/courses/Courses';
import Info from './pages/info/Info';
import classes from './App.module.css';
import Header from './components/header/Header';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

import { fetchCourses } from './store/slices/courses'
import { setStore, logOut } from './store/slices/auth'
import FullCourse from './components/course/FullCourse';
import RegisterPage from './pages/auth/register/Register';
import LoginPage from './pages/auth/login/Login';
import UserPage from './pages/user/UserPage';

function App() {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth)
  const [cookies] = useCookies(['user']);

  React.useEffect( () => {
    if (cookies.token) {
      dispatch(setStore({token: cookies.token, id: cookies.id, expiresIn: cookies.expiresIn}))
    }
    setInterval(() => {
      if (!document.cookie.includes('token')) {
        dispatch(logOut())
      }
    }, 1000 * 60 * 10 );
    dispatch(fetchCourses())
  }, [dispatch, cookies])

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Switch>
          
          { !token 
          ? <Route path="/login" component={LoginPage}/> 
          : <Route path="/user" component={UserPage} /> }
          { !token 
          ? <Route path="/register" component={RegisterPage}/> 
          : null }
          <Route path="/courses/:id" component={FullCourse}/>
          <Route path="/courses" component={Courses} />
          <Route exact path="/" component={Info} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
