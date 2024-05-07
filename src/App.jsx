import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Home from "@/components/Home"
import Error from "@/components/Error"
import PrivateWrapper from "@/components/PrivateWrapper"
import AuthForm from "@/components/auth/AuthForm"
import Layout from "./Layout"

function App() {
    return (
        <Layout>
            <BrowserRouter>
                <Routes>
                    <Route element={<PrivateWrapper />}>
                        <Route path="/" element={<Navigate to={"/chat/home"} replace={true} />} />
                        <Route path="/chat/home" element={<Home />} />
                    </Route>
                    <Route path="/login" element={<AuthForm />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    )
}

export default App;
