$(document).ready(function () {
  let edit = false;

  fetchTask();
  $("#task-result").hide();
  $("#search").keyup(function () {
    let search = $("#search").val();
    console.log(search);
    if (search) {
      $.ajax({
        url: "task-search.php",
        type: "POST",
        data: { search: search },
        success: function (response) {
          let tasks = JSON.parse(response);
          let template = "";
          tasks.forEach((task) => {
            console.log(task.name);
            template += `<li> ${task.name} </li>`;
          });
          $("#container").html(template);
          $("#task-result").show();
        },
      });
    } else {
      $("#task-result").hide();
    }
  });

  $("#task-form").submit(function (e) {
    console.log("Sending...");
    const postData = {
      id: $('#id').val(),
      name: $('#name').val(),
      description: $('#description').val(),
    };

    let url = edit === false ? "task-add.php" : "task-edit.php";

    $.post(url, postData, function (response) {
      fetchTask();
      console.log(response);
      $("#task-form").trigger("reset");
    });
    e.preventDefault();
  });

  function fetchTask() {
    $.ajax({
      url: "task-list.php",
      type: "GET",
      success: function (response) {
        let tasks = JSON.parse(response);
        let template = "";
        tasks.forEach((task) => {
          template += `
                  <tr taskId = "${task.id}">
                    <td>${task.id}</td>
                    <td>
                      <a href="#" class="task-item">${task.name}</a>
                    </td>
                    <td>${task.description}</td>
                    <td><button class="btn btn-danger task-delete">DELETE</button></td>
                  </tr>
                  `;
        });

        $("#tasks").html(template);
      },
    });
  }

  $(document).on("click", ".task-delete", function () {
    if (confirm("Are you sure you want to delete it?")) {
      let element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr("taskId");
      $.post("task-delete.php", { id }, function () {
        console.log(response);
        fetchTask();
      });
    }
  });

  $(document).on("click", ".task-item", function () {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr("taskId");
    $.post("task-single.php", { id }, function (response) {
      let task = JSON.parse(response);
      console.log(task);
      $("#id").val(task.id);
      $("#name").val(task.name);
      $("#description").val(task.description);
      edit = true;
    });
  });
});
