<?php
    
    // namespace Controllers/Managers;
    
    // use \Core\Manager;
    
    class ListsManager extends Manager
    {
        public function saveList (int $id, string $name, $listpoint) : void
        {
            
            $query = "INSERT INTO `Lists`(`user_id`, `name`, `list_point`)
                                        VALUES ($id, :name, $listpoint)";
            
            $sth = self::$dbh->prepare($query);
            $sth->bindValue(':name', $name, PDO::PARAM_STR);
            $sth->execute();
            
            $sth->fetch();
        }
    }