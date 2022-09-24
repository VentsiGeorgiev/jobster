import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing, Register, NotFound } from './components/pages';
import { Stats, AddJob, AllJobs, Profile, } from './components/pages';
import { SharedLayout } from './components/shared';
import ProtectRoute from './utils/ProtectRoute';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={
                        <ProtectRoute>
                            <SharedLayout />
                        </ProtectRoute>
                    }>
                        <Route index element={<Stats />} />
                        <Route path='all-jobs' element={<AllJobs />} />
                        <Route path='add-job' element={<AddJob />} />
                        <Route path='profile' element={<Profile />} />
                    </Route>
                    <Route path='/landing' element={<Landing />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
