# GitHub Lasty Year Commits

This project is a React application that integrates with the GitHub API to display the contribution activity of any GitHub user. By providing a username and repo name, the app visualizes the user's commit history from the last year using the iconic GitHub contributions graph. This project is ideal for those who want to showcase GitHub activity in a user-friendly, visually engaging manner.

## Key Features
- **User Contributions Visualization**: Fetches and displays the contribution graph for any GitHub user, reflecting their commit activity over the past year.

- **GitHub API Integration**: Leverages the official GitHub API to retrieve accurate and up-to-date data on users' public contributions.

- **Dynamic Username Input**: Allows users to search for and visualize the commit history of any GitHub account by simply providing a valid username.

## Technologies Used
- **React**: A popular JavaScript library for building user interfaces.
- **Rspack**: Is a high performance JavaScript bundler written in Rust.
- **GitHub API**: Used to fetch user contribution data.
- **CSS/Styled Components**: For sleek and responsive UI design.
- **Tanstack query**: Asynchronous state management

### Getting started
Clone repository
```bash
git clone https://github.com/EvegeniyNekrasov/github_lastyear_commits.git
```

Navigate to the project directory
```bash
cd github_lastyear_commits
```

Create .evn file in root path of the project
```bash
touch .env
```

Provide GitHub Fine-Grained personall access token
See how to create one: [Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)
```javascript
GH_TOKEN=your_token
```

Install depenencies
```bash
pnpm install
```

Start the development server
```bash
pnpm dev
```

Open your browser and visit http://localhost:3000

