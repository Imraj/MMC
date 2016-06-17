<?php
  if( isset($_POST["userName"])&& isset($_POST["password"]) )
  {
    $result = array();

    $userName = $_POST["userName"];
    $password=  $_POST["password"];

    $sql = mysql_query("SELECT * FROM users WHERE userName='".$userName."' AND password='".$password."' ");

    if(mysql_num_rows($sql) == 0)
    {
      $message = "This User doesn't exist ";
    }
    else
    {
        if(!$sql){
          $message = "An Error Occured";
        }
        else{
          $message = "User Successfully Registered";
        }

        $result["message"] = $message;
    }

    echo json_encode($result);

  }
 ?>
