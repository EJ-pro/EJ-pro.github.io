import { db } from './firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
    general_utils();
    blog_posts();
});

function general_utils() {
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
    let posts = postSnapshot.docs.map(doc => doc.data());

    console.log('Before sort:', posts);

    // 교외 먼저, 교내 뒤에 정렬
    posts.sort((a, b) => {
      const getPriority = title => {
        if (title.includes('(교외)')) return 0;
        if (title.includes('(교내)')) return 1;
        return 2;
      };
      return getPriority(a.대회) - getPriority(b.대회);
    });

    console.log('After sort:', posts);

    let post_html = [];

    for (let i = 0; i < posts.length; i += 2) {
      let row_html = `<div class="blog-posts-row">`;

      for (let j = i; j < i + 2 && j < posts.length; j++) {
        let post = posts[j];
        let post_template = `
          <div class="blog-post">
            <div class="blog-link">
              <h3>${post['대회']}</h3>
              <p class="blog-subtitle">${post['수상']}</p>
            </div>
          </div>
        `;
        row_html += post_template;
      }

      row_html += `</div>`;
      post_html.push(row_html);
    }

    document.getElementById('rss-feeds').innerHTML = post_html.join('');

  } catch (error) {
    console.error("Error fetching Firestore data: ", error);
  }
}
