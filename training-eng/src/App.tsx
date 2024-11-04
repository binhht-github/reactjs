import React from 'react';
import logo from './logo.svg';
import './App.css';
import Vocabulary from './component/view/Vocabulary';
import Hearder from './component/Hearder';
import NavigationBar from './component/NavigationBar';
import { Route, RouterProvider, Routes } from 'react-router-dom';
import Listening from './component/view/Listening';
import Reading from './component/view/Reading';
import Example from './component/view/example/Example';
import Menu from './component/Menu';
import WordReader from './WordReader';
import Grammar from './component/view/Grammar';
import ReadWord from './component/test/ReadWord';
import DocxToJsonConverter from './component/test/DocxToJsonConverter';

function App() {
  return (
    <div>
      <DocxToJsonConverter />
    </div>
    // <div className='h-screen w-screen relative'>
    //   <Routes>
    //     <Route path='/' element={<Vocabulary></Vocabulary>}></Route>
    //     <Route path='/vocabulary' element={<Vocabulary></Vocabulary>}></Route>
    //     <Route path='/reading' element={<Reading></Reading>}></Route>
    //     <Route path='/listening' element={<Listening></Listening>}></Route>
    //     <Route path='/grammar' element={<Grammar></Grammar>}></Route>
    //     <Route path='/example' element={<Example></Example>}></Route>
    //   </Routes>
    //   <Menu />
    //   <NavigationBar></NavigationBar>
    // </div>
  );
}

export default App;
