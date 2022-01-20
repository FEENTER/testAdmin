import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import Index from "./routes/Index";
import BootStrap from "./routes/BootStrap"

/// couldn't find remote ref refs/heads/gh-pages 에러시 npx gh-pages-clean 

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
