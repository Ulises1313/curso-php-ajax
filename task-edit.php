<?php
require 'database.php';

if (isset($_POST['name'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $description = $_POST['description'];

    $query = "UPDATE task SET name = '$name', description = '$description' WHERE id = $id";

    $result = mysqli_query($connection, $query);

    if (!$result) {
        die("Query field");
    }
    echo "Update Task Succesfuly";
}
