import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Login"
import Profile from "./Profile"
import Body from "./Body"
import { Provider } from "react-redux"
import appStore from "../utils/appStore"
import Feed from "./Feed"
import Connection from "./Connection"

function App() {
  return (
    <div className="min-h-screen gradient-bg">
    <Provider store={appStore}> 
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
        <Route path="/" element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="connection" element={<Connection />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  </div>)
}

export default App