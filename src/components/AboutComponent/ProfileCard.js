function ProfileCard({ name, role, bio, image, sound }) {
    const effectMatch = bio.match(/\(with (.+?) effects\)/i);
    const effect = effectMatch
        ? effectMatch[1].toLowerCase().replace(/\s+/g, '-')
        : '';
    const cleanBio = bio.replace(/\s*\(with .+? effects\)/i, '');
    const effectAttribute = effect ? ` data-effect="${effect}"` : '';
    const soundAttribute = sound ? ` data-sound="${sound}"` : '';

    return `
        <li class="about-team-member"${effectAttribute}${soundAttribute}>
            <div class="profile-card">
                <img class="profile-icon" src="${image}" alt="${name}">
                <h3 class="profile-name">${name}</h3>
                <span class="profile-title">${role}</span>
                <p>${cleanBio}</p>
                ${sound ? `<audio class="profile-sound" src="${sound}" preload="auto"></audio>` : ''}
            </div>
        </li>
    `
}

export default ProfileCard;