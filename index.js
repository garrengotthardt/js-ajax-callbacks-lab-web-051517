$(document).ready(function (){

  searchRepositories()
});


function searchRepositories() {
  $('form').on('submit', function(event){

    var searchTerms = $('#searchTerms').val()

    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response) {
      $('#results div').empty()
      console.log(response)
      if (response.items.length > 0){
      response.items.forEach((repo) => {
        if (repo.name.includes(searchTerms)) {
          $('#results').append(`
            <div><img src=${repo.owner.avatar_url} style="width:100px; height:100px;"/> Owner: ${repo.owner.login} <a href=${repo.owner.html_url}>Visit Owner Profile</a>
            <p>${repo.name} | <a href=${repo.html_url}>Visit Repo on Github</a>
            <br> Description: ${repo.description} <br>
            <a href="#" onclick="showCommits('a#showCommits${repo.id}', 'https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits')" id=showCommits${repo.id}">Show Commits</a>
             </p><br><br></div>
             `)
        }
      })
    } else {
      displayError()
    }
  })
  event.preventDefault();
})

}


function showCommits(selector, repoCommits) {
    console.log("made it here")
    $.get(`${repoCommits}`, function(response) {
      $('#details div').empty()
      response.forEach((item) => {
        $('#details').append(`<div>
          <img src=${item.author.avatar_url} style="width:30px; height:30px;"/>
          Author: ${item.author.login}<br>
          SHA: ${item.sha}<br>
          Message: ${item.commit.message}<br><br><br>
          </div>`)
      })
    })
    event.preventDefault();
}


function displayError() {
  $('#errors').append("I'm sorry, there's been an error. Please try again.")
}
