import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaUsers, FaFolderOpen, FaSearch } from 'react-icons/fa';
import QRCode from 'qrcode.react';
import './GitHubSearch.css';
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GitHubSearch = () => {
    const [username, setUsername] = useState('');
    const [githubData, setGithubData] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        if (githubData) {
            fetchFollowers();
            fetchFollowing();
        }
    }, [githubData]);

    const fetchGitHubData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            setGithubData(response.data);
            setSearched(true);
        } catch (error) {
            toast.error('User not found! Please enter a valid GitHub username.');
            console.error('Error fetching GitHub data:', error);
        }
        setLoading(false);
    };

    const fetchFollowers = async () => {
        try {
            const response = await axios.get(`https://api.github.com/users/${username}/followers`);
            setFollowers(response.data);
        } catch (error) {
            console.error('Error fetching followers:', error);
        }
    };

    const fetchFollowing = async () => {
        try {
            const response = await axios.get(`https://api.github.com/users/${username}/following`);
            setFollowing(response.data);
        } catch (error) {
            console.error('Error fetching following:', error);
        }
    };

    const handleSearchAgain = () => {
        setSearched(false);
        setUsername('');
        setGithubData(null);
    };

    return (
        <div className="github-search-container">
            {!searched && (
                <div className="search-form">
                    <input
                        type="text"
                        placeholder="Enter GitHub username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={fetchGitHubData} disabled={loading}>
                        <FaSearch /> Search
                    </button>

                </div>
            )}
            {githubData && (
                <div className="user-column">
                    <div className="user-details">
                        <h2>{githubData.login}</h2>
                        {githubData.bio && <p>{githubData.bio}</p>}
                        {githubData.avatar_url && (
                            <>
                                  <img src={githubData.avatar_url} alt="GitHub Profile Pic" className="profile-pic" />
                              <div className="qr-code-container">
                            <QRCode value={`https://github.com/${username}`} bgColor="#182848" fgColor="#4b6cb7" />
                        </div>
                            </>
                      
                            
                        )}
                        <div className="user-stats">
                            <span>
                                <FaUser /> Followers: {githubData.followers}
                            </span>
                            <span>
                                <FaUsers /> Following: {githubData.following}
                            </span>
                            <span>
                                <FaFolderOpen /> Public Repos: {githubData.public_repos}
                            </span>
                        </div>
                      
                    </div>
                    <div className="followers-column">
                        <ul>
                            {followers.map((follower) => (
                                <li key={follower.id}>
                                    <img src={follower.avatar_url} alt={follower.login} />
                                    <span>{follower.login}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="following-column">
                        <ul>
                            {following.map((followed) => (
                                <li key={followed.id}>
                                    <img src={followed.avatar_url} alt={followed.login} />
                                    <span>{followed.login}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            )}
               {searched && (
                        <button className="b" onClick={handleSearchAgain}>
                            Search Again
                        </button>
                    )}

        </div>
    );
};

export default GitHubSearch;
