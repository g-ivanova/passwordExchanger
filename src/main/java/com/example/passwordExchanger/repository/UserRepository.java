package com.example.passwordExchanger.repository;

import com.example.passwordExchanger.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User,Long> {

    @Query(
            nativeQuery = true,
            value
                    = "SELECT * FROM users u where u.user_email =?1")
    User findUserByEmail(String email);

    @Query(
            nativeQuery = true,
            value
                    = "SELECT * FROM users u where u.user_username =?1")
    User findUserByUsername(String email);

    @Query(
            nativeQuery = true,
            value
                    = "SELECT CAST(aes_decrypt(user_password,?2) AS CHAR(50)) FROM users u where u.user_username =?1")
    String getPassword(String username, String key);

}
