import logo from './logo.svg';
import profile from '../src/profile.webp'
import React from 'react';
import {RiCheckboxBlankCircleLine} from 'react-icons/ri'
import {VscAdd} from 'react-icons/vsc'
import {CgChevronRightR} from 'react-icons/cg'

import './App.css';

function App() {
  return (
    <div className="main container ">
       <a className="btnParent" href="https://todolistzee.netlify.app"><button className="btn" type="button"><CgChevronRightR /></button></a>
     
      <header className='header-row'>
        <div className='header-text'>
          <h1>My tasks</h1>
          <p className='header-nobold'>4 tasks for <span>Today</span></p>
        </div>
        <div className='header-image'>
          <img src={profile} alt="Profile" />
        </div>
      </header>

      <section className='todo-parent row'>
        <ul>
          <li className='todo'>
            <RiCheckboxBlankCircleLine className='todo-checkbox' />
            <label className='todo-label'>
              loremkjfdksfddfdsfdfdsfdsfdsfdsdfdsfdsfdsffdsfdsfdsfsfdfdsfdsfdsfds
            </label>
          </li>
          <li className='todo'>
            <RiCheckboxBlankCircleLine className='todo-checkbox' />
            <label className='todo-label'>
              loremkjfdksfddfdsfdfdsfdsfdsfdsdfdsfdsfdsffdsfdsfdsfsfdfdsfdsfdsfds
            </label>
          </li>
          <li className='todo'>
            <RiCheckboxBlankCircleLine className='todo-checkbox' />
            <label className='todo-label'>
              loremkjfdksfddfdsfdfdsfdsfdsfdsdfdsfdsfdsffdsfdsfdsfsfdfdsfdsfdsfds
            </label>
          </li>
          <li className='todo'>
            <RiCheckboxBlankCircleLine className='todo-checkbox' />
            <label className='todo-label'>
              loremkjfdksfddfdsfdfdsfdsfdsfdsdfdsfdsfdsffdsfdsfdsfsfdfdsfdsfdsfds
            </label>
          </li>
          <li className='todo'>
            <RiCheckboxBlankCircleLine className='todo-checkbox' />
            <label className='todo-label'>
              loremkjfdksfddfdsfdfdsfdsfdsfdsdfdsfdsfdsffdsfdsfdsfsfdfdsfdsfdsfds
            </label>
          </li>
          <li className='todo'>
            <RiCheckboxBlankCircleLine className='todo-checkbox' />
            <label className='todo-label'>
              loremkjfdksfddfdsfdfdsfdsfdsfdsdfdsfdsfdsffdsfdsfdsfsfdfdsfdsfdsfds
            </label>
          </li>
          <li className='todo'>
            <RiCheckboxBlankCircleLine className='todo-checkbox' />
            <label className='todo-label'>
              loremkjfdksfddfdsfdfdsfdsfdsfdsdfdsfdsfdsffdsfdsfdsfsfdfdsfdsfdsfds
            </label>
          </li>
          <li className='todo'>
            <RiCheckboxBlankCircleLine className='todo-checkbox' />
            <label className='todo-label'>
              loremkjfdksfddfdsfdfdsfdsfdsfdsdfdsfdsfdsffdsfdsfdsfsfdfdsfdsfdsfds
            </label>
          </li>
          <li className='todo'>
            <RiCheckboxBlankCircleLine className='todo-checkbox' />
            <label className='todo-label'>
              loremkjfdksfddfdsfdfdsfdsfdsfdsdfdsfdsfdsffdsfdsfdsfsfdfdsfdsfdsfds
            </label>
          </li>
          <li className='todo'>
            <RiCheckboxBlankCircleLine className='todo-checkbox' />
            <label className='todo-label'>
              loremkjfdksfddfdsfdfdsfdsfdsfdsdfdsfdsfdsffdsfdsfdsfsfdfdsfdsfdsfds
            </label>
          </li>
          
          
        </ul>

      </section>
      <nav className="nav">
      <ul>
      <li className='add-btn-parent'>
      <VscAdd className='add-btn' />
      </li>
      </ul>
      </nav>
      
    </div>
  );
}

export default App;
