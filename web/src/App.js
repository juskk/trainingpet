import { BrowserRouter, Switch, Route } from 'react-router-dom' 
import Courses from './pages/courses/Courses';
import Info from './pages/info/Info';
import classes from './App.css';
import Header from './components/header/Header';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchCourses } from './store/slices/courses'
import FullCourse from './components/course/FullCourse';

function App() {
  const dispatch = useDispatch()

  React.useEffect( () => {
    dispatch(fetchCourses())
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Switch>
          <Route path="/courses/:id" component={FullCourse}/>
          <Route path="/courses" component={Courses} />
          <Route path="/" component={Info} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
