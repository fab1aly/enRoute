<?php
    
    // namespace Controllers/Managers;
    
    // use \Core\Manager;
    
    class ListsManager extends Manager
    {
        public function saveList (int $user_id, string $name, string $listpoint) : void
        {
            
            $query = "INSERT INTO Lists (user_id, name, list_point)
                                        VALUES (:user_id, :name,:listpoint )";
            
            $sth = self::$dbh->prepare($query);
            $sth->bindValue(':user_id', $user_id);
            $sth->bindValue(':name', $name);
            $sth->bindValue(':listpoint', $listpoint);
            $sth->execute();
            
            $sth->fetch();
        }
        
        public function getRoutes (int $user_id) 
        {
            
            $query = "SELECT * FROM Lists WHERE user_id = :user_id";
            
            $sth = self::$dbh->prepare($query);
            $sth->bindValue(':user_id', $user_id);
            
            $sth->execute();
            
            return $sth->fetchAll();
        }
    }