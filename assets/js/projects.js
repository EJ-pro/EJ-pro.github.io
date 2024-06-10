$(document).ready(() => {
    render_projects('all');
})


let render_projects = (slug) => {
    let projects_area = $('.projects-wrapper');

    $('.white-button').removeClass('white-button-hover');
    $(`#${slug}`).addClass('white-button-hover');

    let projects_obj = [
        {
            image: 'assets/images/tiktok_logo.png',
            link: 'http://tiktokmakeathon.info',
            title: 'TikTok Make a Thon',
            demo: 'http://tiktokmakeathon.info',
            technologies: ['Android', 'HTML', 'JS', 'Firebase'],
            description: "틱톡 메이커톤 홈페이지 및 관리 애플리케이션",
            categories: ['android', 'webdev']
        },
        {
            image: 'assets/images/tiktok_logo.png',
            link: 'http://tiktokmakeathon.info',
            title: 'TikTok Make a Thon',
            demo: 'http://tiktokmakeathon.info',
            technologies: ['Android', 'HTML', 'JS', 'Firebase'],
            description: "틱톡 메이커톤 홈페이지 및 관리 애플리케이션",
            categories: ['android', 'webdev']
        },
        {
            image: 'assets/images/tiktok_logo.png',
            link: 'http://tiktokmakeathon.info',
            title: 'TikTok Make a Thon',
            demo: 'http://tiktokmakeathon.info',
            technologies: ['Android', 'HTML', 'JS', 'Firebase'],
            description: "틱톡 메이커톤 홈페이지 및 관리 애플리케이션",
            categories: ['android', 'webdev']
        },
        {
            image: 'assets/images/tiktok_logo.png',
            link: 'http://tiktokmakeathon.info',
            title: 'TikTok Make a Thon',
            demo: 'http://tiktokmakeathon.info',
            technologies: ['Android', 'HTML', 'JS', 'Firebase'],
            description: "틱톡 메이커톤 홈페이지 및 관리 애플리케이션",
            categories: ['android', 'webdev']
        },
    ]

    let projects = [];
    if(slug == 'all') {
        projects = projects_obj.map(project_mapper);
    } 
    else {
        projects = projects_obj.filter(project => project.categories.includes(slug)).map(project_mapper);
    }
    projects_area.hide().html(projects).fadeIn();
}

let project_mapper = project => {
    return `
        <div class="wrapper">
                
            <div class="card radius shadowDepth1">

                ${project.image ? 
                    `<div class="card__image border-tlr-radius">
                        <a href="${project.link}">
                            <img src="${project.image}" alt="image" id="project-image" class="border-tlr-radius">
                        </a>
                    </div>`           
                : ''}

        
                <div class="card__content card__padding">
        
                    <article class="card__article">
                        <h2><a href="${project.link}">${project.title}</a></h2>
        
                        <p class="paragraph-text-normal">${project.description} ${project.demo ? `<a href="${project.demo}">Demo</a>` : ''}</p>
                    </article>

                                
                    <div class="card__meta">
                        ${project.technologies.map(tech =>
                            `<span class="project-technology paragraph-text-normal">${tech}</span>`
                        ).join('')}
                    </div>

                </div>
            </div>
        </div>
    `
}

let selected = (slug) => {
    render_projects(slug);
}