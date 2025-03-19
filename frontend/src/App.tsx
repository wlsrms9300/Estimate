import "antd/dist/reset.css";
import { BrowserRouter, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false
        }
    }
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <BrowserRouter>
                    <Routes></Routes>
                </BrowserRouter>
            </RecoilRoot>
        </QueryClientProvider>
    );
}

export default App;
