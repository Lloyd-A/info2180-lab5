window.onload = function () {
  var country;

  document.getElementById("lookup").addEventListener("click", function (event) {
    event.preventDefault();
    country = document.getElementById("country").value.trim().replace(/(<([^>]+)>)/gi, "");

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("result").innerHTML = this.responseText;

        // Assuming the response contains 'countries' key
        if (response.countries) {
          updateTable(response.countries);
        }
      }
    };

    xhttp.open("GET", "world.php?country=" + country);
    xhttp.send();
  });



  function updateTable(data) {
    // Assuming 'data' is an array of objects with the same structure
    const table = "<table><tr><th>Name</th><th>Continent</th><th>Independence Year</th><th>Head of State</th></tr>";
    data.forEach(function (row) {
      table += "<tr><td>" + row.name + "</td><td>" + row.continent + "</td><td>" + row.independence_year + "</td><td>" + row.head_of_state + "</td></tr>";
    });
    table += "</table>";

    document.getElementById("result").innerHTML = table;
  }
};
