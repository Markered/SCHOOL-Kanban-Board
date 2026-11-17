import ProfileCard from './ProfileCard.js';

async function AboutComponent() {
    const membersResponse = await fetch(new URL('./members.json', import.meta.url));
    if (!membersResponse.ok) {
        throw new Error(`Unable to load members.json (${membersResponse.status})`);
    }

    const { members } = await membersResponse.json();

    return {
        title: 'About - Kanban',
        html: `
            <section class="about-page">
                <h1>About Us</h1>
                <h2>About This Project</h2>
                <p class="about-description">This is a project made by 5 CAP students. Hence the name CAP Board, it's a simple Kanban board application that allows users to manage their tasks in a visual way. We made it because we wanted to create a simple and effective tool for managing tasks that is free to use compared to applications like Trello or Asana. Our goal is to provide a easy and equal level of functionality like applications such as Trello or Asana. We want to eventually add more features like LMS (Learning Management System) integration in future updates along with collaboration, accounts and a better user experience.</p>
                <img class="meet-the-team-banner" src="./src/assets/images/meet-the-team-banner.png" alt="Meet the Team">
                <img class="team-illustration" src="./src/assets/images/team-illustration.png" alt="Team Illustration">
                <ul class="about-team-list">
                ${members.map(member => ProfileCard(member)).join('')}
                </ul>
            </section>
        `
    }
}

export default AboutComponent;