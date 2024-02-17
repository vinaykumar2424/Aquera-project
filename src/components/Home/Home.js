import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import './Home.css';
import './HomeResponsive.css';
import React, { useEffect, useState } from 'react';

const Home = () => {

    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);


    // storing the hisotry into the localhost
    useEffect(() => {
        const storedHistory = localStorage.getItem('searchHistory');
        if (storedHistory) {
            setSearchHistory(JSON.parse(storedHistory));
        }
    }, []);


    // getting the form data
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const [userResponse, reposResponse] = await Promise.all([
                fetch(`https://api.github.com/users/${username}`),
                fetch(`https://api.github.com/users/${username}/repos`)
            ]);

            if (!userResponse.ok) {
                throw new Error('User not found');
            }

            const userData = await userResponse.json();
            const reposData = await reposResponse.json();
            console.log(reposData)
            setUserData({
                ...userData,
                public_repos: reposData.length
            });
            setError(null);

            // Update search history
            const updatedHistory = [{ login: userData.login, avatar_url: userData.avatar_url }, ...searchHistory.slice(0, 4)];
            setSearchHistory(updatedHistory);
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

        } catch (error) {
            setError(error.message);
            setUserData(null);
        } finally {
            setLoading(false);
        }
    };

    const toggleHistory = () => {
        const history = document.querySelector('.history');
        history.classList.toggle('toggle-history');
    };
    // console.log(userData)


    return (
        <>
            <div id="home">
                <nav>
                    <img src={logo} alt="" />
                    <span onClick={toggleHistory}>History</span>
                    <ul className='history'>
                        {searchHistory.map((item, index) => (
                            <li key={index}>
                                <Link to={`/user-details`}>
                                    <img src={item.avatar_url} alt="User Avatar" />
                                    {item.login}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <section id="main">
                    <h1>Discover GitHub like never before with <span>GitView</span></h1>
                    <h1>your all-in-one profile and repository viewer.</h1>
                </section>
                <section id="search-bar">
                    <h2>Find your Github profile</h2>
                    <form className='input-form' onSubmit={handleSubmit}>
                        <input type='text' placeholder='Github username...'
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <button type="submit">
                            <span className="material-symbols-outlined">
                                search
                            </span>
                        </button>
                    </form>
                    {loading && <p>Loading...</p>}
                    {!loading && error && <p>{error}</p>}
                    {!loading && userData && (
                        <Link
                            className='user-profile' to="/user-details" state={{ userData : userData}}>
                            <img src={userData.avatar_url} alt="Avatar" />
                            <div className='user-name-repo'>
                                <span>{userData.name}</span>
                                <span>repository count: {userData.public_repos}</span>
                            </div>
                            <div className='user-bio'><span>Bio.</span> <br></br>{userData.bio === null ? "Empty Bio" : userData.bio}</div>
                        </Link>
                    )}
                </section>
            </div>
        </>
    )
}
export default Home;