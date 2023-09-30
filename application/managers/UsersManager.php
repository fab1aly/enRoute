<?php
    
    // namespace Controllers/Managers;
    
    // use \Core\Manager;
    
    class UsersManager extends Manager
    {
        public function addUser (User $user) : void
        {
            
            //  Définition de la requête.
            $query = 'INSERT INTO `Users`( `username`,`email`, `password`) 
                VALUES(:username, :email, :password)';
            
            //  Préparation de la requête.
            $sth = self::$dbh->prepare($query);
            
            //  Association des différentes valeurs à leur paramètre.
            $sth->bindValue(':username', $user->getUsername(), PDO::PARAM_STR);
            $sth->bindValue(':email', $user->getEmail(), PDO::PARAM_STR);
            $sth->bindValue(':password', password_hash($user->getPassword(),PASSWORD_DEFAULT), PDO::PARAM_STR);
            
            //  Exécution de la requête.
            $sth->execute();
        }
        
        public function connectUser (string $email, string $password) : ? User
        {
            
            $query = 'SELECT * FROM Users WHERE email = :email';
            
            $sth = self::$dbh->prepare($query);
            $sth->bindValue(':email', $email, PDO::PARAM_STR);
            $sth->execute();
            
            $sth->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE,'User');
    // var_dump('ok '.$user);
            $user = $sth->fetch();
            
            //	Si un utilisateur a été trouvé (avec cette adresse électronique) et que le mot de passe est correct…
			/*password_verify($user->password, $user['password'])*/
			if($user !== false && $user->verifyPassword($password))
			{
				return $user;
			}
			else
			{
				return null;
			}
            
        }
        
        public function setNewUsername (int $id, string $username) : void
        {
            $query = "UPDATE Users SET username = :username WHERE id= $id";
            
            $sth = self::$dbh->prepare($query);
            $sth->bindValue(':username', $username, PDO::PARAM_STR);
            $sth->execute();
            
            $sth->fetch();
        }
        public function setNewEmail (int $id, string $email) : void
        {
            $query = "UPDATE Users SET email = :email WHERE id= $id";
            
            $sth = self::$dbh->prepare($query);
            $sth->bindValue(':email', $email, PDO::PARAM_STR);
            $sth->execute();
            
            $sth->fetch();
        }
        
        public function setNewPassword (int $id, string $password) : void
        {
            $query = "UPDATE Users SET password = :password WHERE id= $id";
            
            $sth = self::$dbh->prepare($query);
            $sth->bindValue(':password', password_hash($password,PASSWORD_DEFAULT), PDO::PARAM_STR);
            $sth->execute();
            
            $sth->fetch();
        }
        
        public function deleteUser (int $id) : void
        {
            $query = "DELETE FROM `Users` WHERE id= $id";
            
            $sth = self::$dbh->query($query);
            $sth->fetch();
        }
        
        
        
        
        
        
        
        
        
        
        public function getUserInfo (int $id)
        {
            // $dbh = require 'database.php';
            
            $query = "SELECT * FROM Users WHERE id= $id";
            
            $sth = self::$dbh->query($query);
            
            return $sth->fetch();
        }
        
        
    }