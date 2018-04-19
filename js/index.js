$.getJSON('/data/profile.json', (json) => {
    const profiles = json.profiles;
    profiles.forEach(() => {
        const profilePageTpl = document.querySelector('#profile-page-tpl');
        const introducedPeoplePageTpl = document.querySelector('#introduced-people-page-tpl');
        const $profilePage = $('<li />').wrapInner($(profilePageTpl.innerHTML));
        const $introducedPeoplePage = $('<li />').wrapInner($(introducedPeoplePageTpl.innerHTML));
        $('.page').append($profilePage);
        $('.page').append($introducedPeoplePage);
    })
    
    let profilePageContents = [...Array(profiles.length)].map(() => { return {}})
    let introducedPeople = [];
    
    var width = window.innerWidth * 0.4;
    var height = window.innerHeight * 0.8;
    
    const getProfilePageContent = (index) => {
        if(Object.keys(profilePageContents[index]).length === 0) {
            const randomIndex = Math.floor(Math.random() * Math.floor(profiles.length));
            profilePageContents[index] = profiles[randomIndex];
            profiles.splice(randomIndex, 1);
        }
        return profilePageContents[index];
    }
    
    const updateProfilePage = (profile) => {
        const $profilePage = $('.profile-page');
        $profilePage.find('#profile-name').text(profile.name);
        $profilePage.find('#profile-department').text(profile.department);
        $profilePage.find('#profile-from').text(profile.from);
        $profilePage.find('#profile-hobby').text(profile.hobby);
        $profilePage.find('#profile-like').text(profile.like);
    }
    
    $(".devrama-book").DrBook({
        width: width,
        height: height,
        changeProfilePage: (currentPageIndex) => {
        const index = currentPageIndex / 2 - 1;
        const pageContent = getProfilePageContent(index);
        updateProfilePage(pageContent);
        },
        onNext: function(currentPageIndex) {
        this.changeProfilePage(currentPageIndex);
        },
        onOpen: function(currentPageIndex) {
        this.changeProfilePage(currentPageIndex);
        },
        onPrevious: function(currentPageIndex) {
        this.changeProfilePage(currentPageIndex);
        }
    });
    
    $(".devrama-book").css("margin-left", `${width}px`);                
})
