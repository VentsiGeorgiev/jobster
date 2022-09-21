import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, Landing, Register, NotFound } from './components/pages';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/landing' element={<Landing />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
