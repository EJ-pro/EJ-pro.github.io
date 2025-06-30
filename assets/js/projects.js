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
            link: 'https://splendid-bellflower-21f.notion.site/TikTok-make-a-thon-84d7076693d741aab350f27bd7de09cd?pvs=4',
            title: '<i class="fas fa-tiktok"></i> TikTok Make a Thon',
            demo: 'http://tiktokmakeathon.info',
            technologies: ['HTML', 'JS', 'CSS', 'Firebase'],
            description: "틱톡 메이커톤 지원 홈페이지",
            categories: ['webdev', 'server']
        },
        {
            image: 'assets/images/tiktokmakeathon_app.png',
            link: 'https://splendid-bellflower-21f.notion.site/Tiktok-Make-a-Thon-app-36fe6d47018e431a87e47500d52baa65?pvs=4',
            title: '<i class="fas fa-tiktok"></i> TikTok Make a Thon',
            demo: 'http://tiktokmakeathon.info',
            technologies: ['Android', 'Firebase'],
            description: "틱톡 메이커톤 지원 관리 앱",
            categories: ['android', 'server']
        },
        {
            image: 'assets/images/smartpot.png',
            link: 'https://splendid-bellflower-21f.notion.site/Smart-Pot-be8abaa5e8f14bedb1b1e2ab14c3a2ac',
            title: '🪴 Smart Pot',
            demo: '',
            technologies: ['Android', 'Kotlin', 'KaKao API', 'Python'],
            description: "스마트 식물 관리 솔루션",
            categories: ['android', 'server']
        },
        {
            image: 'assets/images/collobo.png',
            link: 'https://splendid-bellflower-21f.notion.site/Collobo-d4c91fab2c53450c9232b1b46fbef7f3?pvs=4',
            title: '🫂 Collobo',
            demo: '',
            technologies: ['Android', 'Kotlin', 'Firebase'],
            description: "협업 관리 및 매칭 애플리케이션",
            categories: ['android', 'server']
        },
        {
            image: 'assets/images/sts.png',
            link: 'https://splendid-bellflower-21f.notion.site/Spec-Test-Solution-37ad256f09e64a60ba6f10d26c2ac870?pvs=4',
            title: '📖 Spec Test Solution',
            demo: '',
            technologies: ['Android', 'Java'],
            description: "기사시험 준비를 위한 애플리케이션",
            categories: ['android']
        }
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
                        <a href="${project.link}" target="_blank">
                            <img src="${project.image}" alt="image" id="project-image" class="border-tlr-radius">
                        </a>
                    </div>`           
                : ''}

        
                <div class="card__content card__padding">
        
                    <article class="card__article">
                        <h2><a href="${project.link}" target="_blank">${project.title}</a></h2>
        
                        <p class="paragraph-text-normal" style = "color : #111111l; font-size: 15px;">${project.description} ${project.demo ? `<a href="${project.demo}" target="_blank">Link</a>` : ''}</p>
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