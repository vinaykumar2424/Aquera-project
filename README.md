Overview
GitView is a React-based web application that allows users to explore GitHub profiles and repositories with ease. It leverages the GitHub API to fetch user information and repositories dynamically.

Features
1. Profile Page: View detailed user profiles, including basic information, bio, and repository count.
2. Repository List: Browse through a list of user repositories, including names, descriptions, and associated topics.
3. Responsive UI: Utilizes React and CSS for a responsive and user-friendly interface.
4. Pagination: Implements pagination for the repository list, displaying 10 repositories per page.
5. Error Handling: Gracefully handles API errors and displays appropriate messages to the user.

Technologies Used

1. React.js
2. React Router for navigation
3. GitHub API for fetching user data and     repositories
4. React Paginate for pagination
5. CSS for styling

Installation

1. Clone the repository: git clone <repository-url>
2. Navigate to the project directory: cd gitview
3. Install dependencies: npm install
4. Start the development server: npm start

Usage

1. Enter a GitHub username in the search bar and click "Search".
2. View the user profile details and repositories.
3. Navigate through different pages of repositories using pagination.

Folder Structure

src/
.  components/: Contains React components.
..    Home/: Home page component.
..    UserDetails/: User details page component.
..    images/: Images used in the application.
App.js: Main application component.
index.js: Entry point of the application.
App.css: Global styles for the application.

Deployment

The application is deployed on firebase and github for public access.

Credits
Developed by Vinay Kumar