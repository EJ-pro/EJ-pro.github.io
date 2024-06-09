$(document).ready(() => {
    render_activity('1');
})


let render_activity = (slug) => {
    let activity_area = $('.activity-wrapper');

    $('.white-button').removeClass('white-button-hover');
    $(`#${slug}`).addClass('white-button-hover');

    let activity_obj = [
        {
            image: 'assets/images/tiktok_logo.png',
            link: 'https://tiktokmakeathon.info',
            title: 'TikTok Make a Thon',
            demo: 'https://tiktokmakeathon.info',
            technologies: ['Android', 'HTML', 'JS', 'Firebase'],
            description: "틱톡 메이커톤 홈페이지 및 관리 애플리케이션",
            categories: ['1', 'webdev']
        },
    ]

    let activity = [];
    if(slug == '2') {
        activity = activity_obj.map(activity_mapper);
    } 
    else {
        activity = activity_obj.filter(activity => activity.categories.includes(slug)).map(activity_mapper);
    }
    activity_area.hide().html(activity).fadeIn();
}

let activity_mapper = activity => {
    return `
        <div class="wrapper">
                
            <div class="card radius shadowDepth1">

                ${activity.image ? 
                    `<div class="card__image border-tlr-radius">
                        <a href="${activity.link}">
                            <img src="${activity.image}" alt="image" id="activity-image" class="border-tlr-radius">
                        </a>
                    </div>`           
                : ''}

        
                <div class="card__content card__padding">
        
                    <article class="card__article">
                        <h2><a href="${activity.link}">${activity.title}</a></h2>
        
                        <p class="paragraph-text-normal">${activity.description} ${activity.demo ? `<a href="${activity.demo}">Demo</a>` : ''}</p>
                    </article>

                                
                    <div class="card__meta">
                        ${activity.technologies.map(tech =>
                            `<span class="activity-technology paragraph-text-normal">${tech}</span>`
                        ).join('')}
                    </div>

                </div>
            </div>
        </div>
    `
}

let selected = (slug) => {
    render_activity(slug);
}