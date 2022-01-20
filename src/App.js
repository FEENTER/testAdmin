import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import Index from "./routes/Index";
import BootStrap from "./routes/BootStrap"

/// https://velog.io/@ausg/gh-pages-react-router 리액트 라우터 공부

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/bootstrap">
          <BootStrap />
        </Route>
        <Route path="/abot-us">
          <h1>Hello</h1>
        </Route>
        <Route path="/movie/:id">
          <Detail />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        {/* path="/" 항목은 무조건 마지막에 넣어야 함 */}
        <Route path="/">
          <Index />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
