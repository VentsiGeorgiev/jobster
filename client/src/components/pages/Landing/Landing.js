import heroImage from '../../../assets/hero-illustration.png';

function Landing() {
    return (
        <main>
            <section>
                <div className='hero-info'>
                    <h1>Find the perfect job for you</h1>
                    <p>Search your career opportunity through 10,000+ jobs</p>
                    <p>Simply start by login or register</p>
                    <button>Login/Register</button>
                </div>
                <div className='hero-image'>
                    <img src={heroImage} alt="jobster" />
                </div>
            </section>
        </main>
    );
}
export default Landing;