package com.example.passwordExchanger.repository;

import com.example.passwordExchanger.entity.Password;
import com.example.passwordExchanger.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PasswordRepository extends JpaRepository<Password,Long> {

    @Query(
            nativeQuery = true,
            value
                    = "SELECT * FROM passwords p where p.password_to =?1")
    List<Password> getPasswordFromUserId(int id);

    @Query(
            nativeQuery = true,
            value
                    = "SELECT CAST(aes_decrypt(pass,?2) AS CHAR(50)) FROM passwords p where p.password_id =?1")
    String getPassword(int pass_id, String key);


    @Query(
            nativeQuery = true,
            value
                    = "SELECT * FROM passwords p where p.password_from =?1")
    List<Password> getPasswordFromUserIdTo(int id);

}
