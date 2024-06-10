$(document).ready(function() {
    general_utils();
    blog_posts();
});

function general_utils() {
    // smooth scrolling for nav links
    $('.head-menu-wrap a').smoothScroll();
    $('.extra-link a').smoothScroll();
    $('.profile-pic-link').smoothScroll();

    $('.skillbar').each(function() {
        $(this).find('.skillbar-bar').animate({
            width: $(this).attr('data-percent')
        }, 1000);
    });
}

function blog_posts() {

    // keeping it static, can be fetched from a blog dynamically as well
    let posts = [
        {
            url: 'https://splendid-bellflower-21f.notion.site/_-9288fb134c294975bce54969b0aa4182?pvs=4',
            title: '🏤 2024 산학엽협력 융합캡스톤디자인 성과발표회',
            subtitle: '🎖️ 한국프로젝트경영학회장상'
        },
        {
            url: 'https://splendid-bellflower-21f.notion.site/_-9288fb134c294975bce54969b0aa4182?pvs=4',
            title: '🏛️ 2024 한국 콘텐츠학회 종합학술대회',
            subtitle: '🎖️ 우수상'
        },
        {
            url: 'https://splendid-bellflower-21f.notion.site/_-9288fb134c294975bce54969b0aa4182?pvs=4',
            title: '🏰 2023 캡스톤디자인 내부 경진대회',
            subtitle: '🎖️ 목원대학교 총장상'
        },
        {
            url: 'https://splendid-bellflower-21f.notion.site/_-9288fb134c294975bce54969b0aa4182?pvs=4',
            title: '🛸 PEN 창업동아리 활동',
            subtitle: '🎖️ 목원대학교 총장상'
        },
        {
            url: 'https://splendid-bellflower-21f.notion.site/_-9288fb134c294975bce54969b0aa4182?pvs=4',
            title: '💒 대전권대학연합 산학협력 성과 공유 발표 경진대회',
            subtitle: '🎖️ 대산협회장상'
        },
        {
            url: 'https://splendid-bellflower-21f.notion.site/_-9288fb134c294975bce54969b0aa4182?pvs=4',
            title: '🧠 2023 캡스톤디자인 창업 Boot-Up 메이커톤',
            subtitle: '🎖️ 우수창업부분 최우수상'
        },
        {
            url: 'https://splendid-bellflower-21f.notion.site/_-9288fb134c294975bce54969b0aa4182?pvs=4',
            title: '🎪 대전 스타트업 스쿨',
            subtitle: '🎖️ 대전 창조경제혁신센터장상'
        },
        {
            url: 'https://splendid-bellflower-21f.notion.site/_-9288fb134c294975bce54969b0aa4182?pvs=4',
            title: '🎇 Tiktok 메이커톤',
            subtitle: '🎖️ 최다 언어 발행상'
        },
    ];

    let post_html = [];

    for (let post of posts) {

        let tags;

        if (post.tags) {
            tags = post.tags.map(tag => {
                return `<a href="https://www.nagekar.com/tags#${tag}">${tag}</a>`;
            });
        }

        let post_template = `
        <div class="blog-post" onclick="blog_link_click('${post.url}');">

            <div class="blog-link">

                <h3><a href="${post.url}">${post.title}</a></h3>
                ${post.subtitle ? `<p class="blog-subtitle">${post.subtitle}</p>` : ''}

            </div>

            <div class="blog-goto-link">
                <img class="blog-arrow" src="/assets/images/right-open-mini.svg"/>
            </div>
        </div>
        `;

        post_html.push(post_template);
    }

    // for the more posts link
    let post_template = `
    <div class="blog-post more-blogs" onclick="blog_link_click('https://www.nagekar.com');">
    </div>
    `;

    post_html.push(post_template);

    $('#rss-feeds').html(post_html);

}

function blog_link_click(url) {
    window.location = url;
}
