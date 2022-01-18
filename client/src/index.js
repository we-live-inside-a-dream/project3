import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>, 
  document.getElementById('root')
);

// import React from 'react'; 
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns'
// import caLocale from 'date-fns/locale/ca'


// ReactDOM.render(
//   <React.StrictMode>
//   <MuiPickersUtilsProvider utils ={DateFnsUtils}>
//     <App />
//   </MuiPickersUtilsProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
