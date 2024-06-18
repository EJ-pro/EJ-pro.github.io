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
            image: 'assets/images/baekjoon100day.png',
            link: 'https://splendid-bellflower-21f.notion.site/530042c6249c4d3f9ab75f586ceac746?pvs=25',
            title: '💯 백준백일',
            demo: '',
            technologies: ['Java', 'BeakJoon'],
            description: "백준 백일 프로젝트",
            categories: ['activity']
        },
        {
            image: 'assets/images/number_baseball.png',
            link: 'https://splendid-bellflower-21f.notion.site/7e307d6f69bf43c1bec272443e32b8a3?pvs=4',
            title: '⚾ 숫자야구게임',
            demo: '',
            technologies: ['Android', 'Kotlin'],
            description: "코틀린 첫 토이 프로젝트 숫자야구게임",
            categories: ['android']
        },
        {
            image: 'assets/images/sts.png',
            link: 'https://splendid-bellflower-21f.notion.site/Spec-Test-Solution-37ad256f09e64a60ba6f10d26c2ac870?pvs=4',
            title: '📖 Spec Test Solution',
            demo: '',
            technologies: ['Android', 'Java'],
            description: "기사시험 준비를 위한 애플리케이션",
            categories: ['android']
        },
        {
            image: 'assets/images/web_pront_end.png',
            link: 'https://splendid-bellflower-21f.notion.site/SW-53eb8e8ceab549a2b30d3e09ef5e5057?pvs=4',
            title: '2023 웹프론트엔드',
            demo: '',
            technologies: ['교육생', 'JS', 'React'],
            description: "과기정통부 SW전문인재양성사업 웹프론트엔드 과정 수료",
            categories: ['activity']
        },
        {
            image: 'assets/images/golbal_start_up_school.png',
            link: 'https://splendid-bellflower-21f.notion.site/2024-ed7566f286df4589a23e181c51b9138e?pvs=4',
            title: '2024 글로벌 스타트업스쿨',
            demo: '',
            technologies: ['팀장', 'Android'],
            description: "말레이시아 학생들과 말레이시아에서 경진대회 진행",
            categories: ['contest']
        },
        {
            image: 'assets/images/pen_creator_prototype.png',
            link: 'https://splendid-bellflower-21f.notion.site/2024-PEN-CREATER-e4f243ede3334f41a1ef85c81239e0dd?pvs=4',
            title: '2024 PEN CREATER 시제품 경진대회',
            demo: '',
            technologies: ['팀장', 'Android'],
            description: "대전 0시 축제의 팝업스토어를 위해 0시축제 안내 애플리케이션 제작 및 포토 카드 판매",
            categories: ['contest']
        },
        {
            image: 'assets/images/korea_capstone_paper_contest.jpg',
            link: 'https://splendid-bellflower-21f.notion.site/2024-e570e7a8288041e2af54358f79f24526?pvs=4',
            title: '2024 한국콘텐츠학회 캡스톤디자인 논문 경진대회',
            demo: '',
            technologies: ['팀장', 'Android'],
            description: "Collobo 앱의 논문을 작성하여 경진대회 참여",
            categories: ['contest']
        },
        {
            image: 'assets/images/start_up_school.png',
            link: 'https://splendid-bellflower-21f.notion.site/c4781e6061894adbbc340b9ad9d31a3a?pvs=4',
            title: '제 7회 대전 스타트업 스쿨',
            demo: '',
            technologies: ['팀장', 'PM', '발표'],
            description: "Smart Pot 개발을 하며 창업관련으로 참여",
            categories: ['contest']
        },
        {
            image: 'assets/images/announcement.png',
            link: 'https://splendid-bellflower-21f.notion.site/2023-FESTA-8bab3a9df7a6415a998256be586ca22e?pvs=4',
            title: '2023 산학협력 성과발표 FESTA',
            demo: '',
            technologies: ['팀장', '발표'],
            description: "Smart Pot 캡스톤 경진대회 참여",
            categories: ['contest']
        },
        {
            image: 'assets/images/sw_convergence_cluster.png',
            link: 'https://splendid-bellflower-21f.notion.site/2023-SW-2-0-DX-92cac8f42c064de38fcc4d289abb6335?pvs=4',
            title: '2023 SW융합클러스터 2.0 디지털콘텐츠 DX 해커톤',
            demo: '',
            technologies: ['팀원', 'Android'],
            description: "바뷰 웹어플리케이션 개발을하여 해커톤참여 & 애플리케이션 제작",
            categories: ['contest']
        },
        {
            image: 'assets/images/tiktok_make.png',
            link: 'https://splendid-bellflower-21f.notion.site/TikTok-AR-9e6a2cf0cac0416e8b845bcadde30d28?pvs=4',
            title: '2023 TikTok 대학생 AR필터 메이커톤',
            demo: '',
            technologies: ['팀원', 'Android'],
            description: "틱톡 AR필터 제작 및 배포 현재 상위 1% 크리에이터",
            categories: ['contest']
        },
        {
            image: 'assets/images/sw_test.png',
            link: 'https://splendid-bellflower-21f.notion.site/SW-8f69bf2f3f454ca9a6ed00ae7c727b99?pvs=4',
            title: '2023 SW 테스트 경진대회',
            demo: '',
            technologies: ['팀장', 'Android'],
            description: "출시 준비중인 애플리케이션의 오류 테스트 충청권 대표로 참여",
            categories: ['contest']
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