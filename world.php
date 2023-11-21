<?php
$host = 'localhost';
$username = 'lab5_user';
$password = 'password123';
$dbname = 'world';
$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);

if(isset($_GET['country']) && !(isset($_GET['lookup']) && $_GET['lookup'] === 'cities')){
  $searchVal = $_GET['country'];
  $country = filter_var($searchVal, FILTER_SANITIZE_STRING);
  $stmt = $conn->query("SELECT * FROM countries WHERE name LIKE '%$country%'");
  $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

if(isset($_GET['lookup']) && $_GET['lookup'] === 'cities'){
  $searchVal = $_GET['country'];
  $city = filter_var($searchVal, FILTER_SANITIZE_STRING);
  $stmt = $conn->query("SELECT cities.name, cities.district, cities.population
                        FROM cities
                        JOIN countries
                        ON cities.country_code = countries.code WHERE countries.name LIKE '%$city%'");
  $cities = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>
<?php if(isset($results)): ?>
    <table>
      <tr>
      <th>Name</th>
      <th>Continent</th>
      <th>Independence Year</th>
      <th>Head of State</th>
      </tr>
    <?php foreach ($results as $row): ?>
    <tr>

      <td><?= $row['name']; ?></td>
      <td><?= $row['continent']; ?></td>
      <td><?= $row['independence_year']; ?></td>
      <td><?= $row['head_of_state']; ?></td>
    </tr>
      <?php endforeach; ?>
    </table>
<?php endif; ?>

<?php if(isset($cities)): ?>
  <table>
    <tr>
      <th>Name</th>
      <th>District</th>
      <th>Population</th>
    </tr>
    <?php foreach ($cities as $crow): ?>
      <tr>
        <td><?= $crow['name']; ?></td>
        <td><?= $crow['district']; ?></td>
        <td><?= $crow['population']; ?></td>
      </tr>
    <?php endforeach; ?>
  </table>
<?php endif; ?>