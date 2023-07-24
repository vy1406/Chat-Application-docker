import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import ChatPage from "./components/ChatPage";
import { connect } from "react-redux";
import SignUp from "./components/SignUp";

function App({ users, user }) {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Outlet />} />
          {(users && users.length > 0) || user ? (
            <Route path="/chat" element={<ChatPage />} />
          ) : (
            <Route path="/chat" element={<Navigate to="/" />} />
          )}

          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  const {
    chat: { socket },
    user: { users, user },
  } = state;
  return {
    socket,
    users,
    user
  };
};

export default connect(mapStateToProps)(App);
