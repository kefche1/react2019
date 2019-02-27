import createHistory from 'history/createBrowserHistory'; //auto installed with react-router-dom as separate library

//create a history object that we can access anywhere in our app for programmatic navigation;
//otherwise we only have access to it inside a Component through this.props.history;
//need to replace <BrowserRouter> with <Router> inside App.js;
export default createHistory();
