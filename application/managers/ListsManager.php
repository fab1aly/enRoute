<?php
    
    // namespace Controllers/Managers;
    
    // use \Core\Manager;
    
    class ListsManager extends Manager
    {
        public function saveList (int $id, string $name, $listpoint)
        {
            
            $query = "INSERT INTO `Lists`( `name`, `list_point`, `user_id`)
                                VALUES (:name,$listpoint, $id)";
            
            $sth = self::$dbh->prepare($query);
            $sth->bindValue(':name', $name, PDO::PARAM_STR);
            $sth->execute();
            
            $sth->fetch();
        }
    }