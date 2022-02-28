import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import NewQuiz from './pages/NewQuiz';
import CompletedQuiz from './pages/CompletedQuiz';
import OngoingQuiz from './pages/OngoingQuiz';
import Wrapper from './components/Wrapper';
import NavBar from './components/NavBar';
import { AuthProvider, useAuth } from './utils/auth';
import useResumeQuiz from './utils/useResumeQuiz';

function App() {
    useResumeQuiz();

    return (
        <AuthProvider>
            <Wrapper>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="dashboard" element={<RequireAuth children={<Dashboard />} />} />
                    <Route path="quiz">
                        <Route index element={<Navigate to="/" replace />} />
                        <Route path=":id" element={<RequireAuth children={<CompletedQuiz />} />} />
                        <Route path="new" element={<RequireAuth children={<NewQuiz />} />} />
                        <Route
                            path="ongoing/:questionNumber"
                            element={<RequireAuth children={<OngoingQuiz />} />}
                        />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Wrapper>
        </AuthProvider>
    );
}

function RequireAuth({ children }) {
    let { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;
    return children;
}

export default App;
