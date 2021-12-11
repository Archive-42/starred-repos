
new GitHubCalendar("#calendar", "evoingram", { responsive: true, global_stats: true });

toggleMainSection = (sectionName) => {
    var sections = document.getElementsByClassName('submenu');
    for(let x = 0; x < sections.length; x++){
        var currentSection = sections[x];
        if (currentSection.classList.contains('submenu') && currentSection.classList.contains(sectionName)) {
            currentSection.style.display = 'flex';
        }
        else if (!currentSection.classList.contains(sectionName)) {
            currentSection.style.display = 'none';
        }
    }
  };
