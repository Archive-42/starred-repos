const params = `&w=300&h=300&fit=crop&fm=jpg&q=95`;
const faves = saved.map(item => {
  return `
    <section style="background-image:url(${item.urls.regular}${params})" class="image">
      <i class="fas fa-1x fa-star favourite on" id="${item.id}"></i>
      <div class="details">
        <a href="${item.links.html}" target="_blank" class="new-tab-icon"><i class="fas fa-info-circle info"></i>
        <span>@${item.user.username.substr(0, 6)}</span></a>
      </div>
    </section>
  `;
})
.join('');
const favesHTML = faves.length ? faves : '<p>No favourites saved</p>'
imageContainer.innerHTML = '';
imageContainer.innerHTML = favesHTML;
generateFavourites('saved');