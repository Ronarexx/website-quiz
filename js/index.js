var userArray = [];

myFunction2();

function renderUsers() {
  userArray = userArray.sort(function(a,b){return b.votes-a.votes})
  var template = $('#template').html();
  Mustache.parse(template);
  var rendered = Mustache.render(template, {userArray});
  $('#userBody').html(rendered);
}

window.addEventListener('load', async () => {
  renderUsers();
});

jQuery("#userBody").on("click", ".voteBtn", async function(event){
  const value = $(this).siblings('input').val();
  const dataIndex = event.target.id;
  renderUsers();
});

$('#registerBtn').click(async function() {

  if($('#regName').val()=="" || $('#regLastName').val()=="")
    return;
  else {
    $("#registerBtn").attr("disabled", true);
    var name = ($('#regName').val()),
        LastName = ($('#regLastName').val());
    userArray.push({
      creatorName: 'Bienvenid@: '+name,
      LastName: LastName,
      index: userArray.length+1,
      votes: 0
    })
    renderUsers();
  }


    myFunction();
    myFunction2();


});

$('#registerBtn2').click(async function(){
   myFunction2();
})

function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function myFunction2() {
    var x = document.getElementById("myDIV2");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
