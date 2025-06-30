import Layout from "../Layout";
import Landing from "../components/Landing";
import Loginform from "../components/Login-form";
import Register from "../components/Register";
import TopDevsPage from "../components/TopDevsPage";
import Profilepage from "../components/Profilepage"
import GithubVerify from "../components/GithubVerify"
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import PostsPage from "../components/PostsPage"; // 🔥 Add this line
import SearchUser from "../components/SearchUser";

const { Route, createRoutesFromElements, createBrowserRouter } = require("react-router-dom");


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} >
            <Route path="" element={<Landing />} />
            <Route path="/login" element={<PublicRoute><Loginform /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/dev/verify" element={<PublicRoute><GithubVerify /></PublicRoute>} />
            <Route path="/topdev" element={<ProtectedRoute><TopDevsPage /></ProtectedRoute>} />
            <Route path="/searchdev" element={<ProtectedRoute><SearchUser /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profilepage /></ProtectedRoute>} />
            <Route path="/posts" element={<ProtectedRoute><PostsPage /></ProtectedRoute>} />
        </Route>
    )
)