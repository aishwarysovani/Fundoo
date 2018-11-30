<?php
require "lib_redis/autoload.php";
PredisAutoloader::register();
class redis{

    function config()
    {
        $redis = new PredisClient();
        // Parameters passed using a named array:
        $redis = new PredisClient([
        'scheme' => 'tcp',
        'host'   => 'localhost',
        'port'   => 6379,
        'database' => 1,
        ]);

        return $redis;
    }
}


?>