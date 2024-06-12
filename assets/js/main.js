// script.js

import { db } from './firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
    general_utils();
    blog_posts();
});

function general_utils() {
    // smooth scrolling for nav links
    document.querySelectorAll('.head-menu-wrap a, .extra-link a, .profile-pic-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    document.querySelectorAll('.skillbar').forEach(skillbar => {
        const bar = skillbar.querySelector('.skillbar-bar');
        bar.style.width = '0';
        const width = skillbar.getAttribute('data-percent');
        setTimeout(() => {
            bar.style.transition = 'width 1s';
            bar.style.width = width;
        }, 0);
    });
}

async function blog_posts() {
    try {
        const postCollection = collection(db, 'awards');
        const postSnapshot = await getDocs(postCollection);
        const posts = postSnapshot.docs.map(doc => doc.data());

        console.log('Posts:', posts); // 데이터를 불러왔는지 확인

        let post_html = [];

        for (let post of posts) {
            let post_template = `
            <div class="blog-post" onclick="blog_link_click('#');">
                <div class="blog-link">
                    <h3>${post['대회']}</h3>
                    <p class="blog-subtitle">${post['수상']}</p>
                </div>
                <div class="blog-goto-link">
                    <img class="blog-arrow" src="/assets/images/right-open-mini.svg"/>
                </div>
            </div>
            `;

            post_html.push(post_template);
        }

        // for the more posts link
        let more_post_template = `
        <div class="blog-post more-blogs" onclick="blog_link_click('https://www.nagekar.com');">
        </div>
        `;

        post_html.push(more_post_template);

        document.getElementById('rss-feeds').innerHTML = post_html.join('');
    } catch (error) {
        console.error("Error fetching Firestore data: ", error);
    }
}

function blog_link_click(url) {
    window.location = url;
}
