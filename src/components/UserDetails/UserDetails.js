import React, { useEffect, useState } from 'react';
import './UserDetails.css'
import './UserDetailsResponsive.css'
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const UserDetails = () => {
    const location = useLocation();
    const userData = location?.state?.userData;
    const [repos, setRepos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    

    // fatching the repo
    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch(userData.repos_url);
                if (!response.ok) {
                    throw new Error('Failed to fetch repositories');
                }
                const data = await response.json();
                setRepos(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (userData) {
            fetchRepos();
        }
    }, [userData]);


    // Pagination configuration
    const reposPerPage = 10;
    const pageCount = Math.ceil(repos.length / reposPerPage);

    // Handle page change
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo(0, 0);
    };
    // Determine if there are more pages after the current page
    const hasNextPage = currentPage < (pageCount - 1);
    const hasPreviousPage = 0
    // Pagination data
    const offset = currentPage * reposPerPage;
    const paginatedRepos = repos.slice(offset, offset + reposPerPage);

    return (
        <>
            <section className='top-section'>
                <span className='basic-detail-a'>
                    <img src={userData.avatar_url} alt='' />
                    <span>
                        <h1>{userData.name}</h1>
                        <span>repository count: {userData.public_repos}</span>
                    </span>
                </span>
                <span className='basic-detail-b'><span>Bio.</span> <br></br>{userData.bio === null ? "Empty Bio" : userData.bio}</span>
            </section>
            <section className='repos-section'>
                <h2>Repositories</h2>
                <div className='repo-cards'>
                    {paginatedRepos.map(repo => (
                        <div key={repo.id} className='repo-card'>
                            <span>
                                <h3>Project: {repo.name}</h3>
                                <p>Description: {repo.description == null ? "No description avialable" : repo.description}</p>
                            </span>
                            {/* Rendering topics */}
                            {repo.topics && repo.topics.length !== 0 ? (
                                <div className='topics'>
                                    <strong>Topics:</strong><br />
                                    <span>
                                        {repo.topics.map((topic, index) => (
                                            <span key={topic} className='topic'>{topic}{repo.topics.length !== index + 1 && ", "}</span>
                                        ))}
                                    </span>
                                </div>
                            ) : (
                                <div className='topics'>
                                    <strong>Topics:</strong><br />
                                    <span className='topic'>No topic mentioned</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {/* Pagination component */}
                <ReactPaginate
                    pageCount={pageCount}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    disabledClassName={'disabled'}
                    previousLinkClassName={!hasPreviousPage ? 'disabled' : ''}
                    nextLinkClassName={!hasNextPage ? 'disabled' : ''}
                />
            </section>
        </>
    );
};

export default UserDetails;
