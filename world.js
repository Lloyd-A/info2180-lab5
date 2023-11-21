window.onload = function () {
  var country;

  document.getElementById("lookup").addEventListener("click", function (event) {
    event.preventDefault();
    country = document.getElementById("country").value.trim().replace(/(<([^>]+)>)/gi, "");

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var response = document.getElementById("result").innerHTML = this.responseText;
        if (response.countries) {
          updateTable(response.countries);
        }
      }
    };

    xhttp.open("GET", "world.php?country=" + country);
    xhttp.send();
  });

    document.getElementById("lookupCity").addEventListener("click", function (event) {
    event.preventDefault();
    country = document.getElementById("country").value.trim().replace(/(<([^>]+)>)/gi, "");

    if (country !== "") {
      const xhttp2 = new XMLHttpRequest();
      xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var response = document.getElementById("result").innerHTML = this.responseText;

          if (response.cities) {
            updateCityTable(response.cities);
          }
        }
      };

      xhttp2.open("GET", "world.php?country=" + country + "&lookup=cities");
      xhttp2.send();
    }
  });


  function updateTable(data) {
    // Assuming 'data' is an array of objects with the same structure
    var table = "<table><tr><th>Name</th><th>Continent</th><th>Independence Year</th><th>Head of State</th></tr>";
    data.forEach(function (row) {
      table += "<tr><td>" + row.name + "</td><td>" + row.continent + "</td><td>" + row.independence_year + "</td><td>" + row.head_of_state + "</td></tr>";
    });
    table += "</table>";

    document.getElementById("result").innerHTML = table;
  }

function updateCityTable(data) {
    var table =
          "<table><tr><th>Name</th><th>District</th><th>Population</th></tr>";
        data.forEach(function (row) {
          table +=
            "<tr><td>" +
            row.name +
            "</td><td>" +
            row.district +
            "</td><td>" +
            row.population +
            "</td></tr>";
        });
        table += "</table>";

        result.innerHTML = table;
  }

};
