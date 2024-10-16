package com.example.passwordExchanger.repository;

import com.example.passwordExchanger.entity.User;
import com.example.passwordExchanger.entity.UsersAndRoles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Long> {

    @Query(
            nativeQuery = true,
            value
                    = "SELECT * FROM users u where u.user_email =?1")
    User findUserByEmail(String email);


    @Query(
            nativeQuery = true,
            value
                    = "SELECT * FROM users u where u.role_id =?1")
    List<User> getUsersByRole(int role);
    @Query(
            nativeQuery = true,
            value
                    = "SELECT * FROM users u where u.user_username =?1")
    User findUserByUsername(String email);


    @Query(
            nativeQuery = true,
            value
                    = "SELECT * FROM users u where u.user_username =?1 or u.user_email=?2")
    User findUserByUsernameOrEmail(String username, String email);
    @Query(
            nativeQuery = true,
            value
                    = "SELECT CAST(aes_decrypt(user_password,?2) AS CHAR(50)) FROM users u where u.user_username =?1")
    String getPassword(String username, String key);


    @Query(
            nativeQuery = true,
            value
                    = "SELECT * FROM users  WHERE user_id NOT IN (Select user_id from user_roles where role_id=?1)")
    List<User> getUsersThatareNotInThisRole(int role_id);

    @Query(
            nativeQuery = true,
            value
                    = "Select users.user_id,users.user_names,users.user_username,users.user_email, group_concat(roles.role_name separator ',') as user_roles from users left join user_roles on user_roles.user_id=users.user_id left join roles on roles.role_id=user_roles.role_id group by users.user_id,users.user_names,users.user_username,users.user_email")
    List<UsersAndRoles> getUsersAndRoles();


    @Query( nativeQuery = true,value
            = "SELECT * FROM users u WHERE " +
            "LOWER(u.user_names) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
            "LOWER(u.user_username) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
            "LOWER(u.user_email) LIKE LOWER(CONCAT ('%', :searchText, '%'))")
    List<User> findUsersBySearchText(@Param("searchText") String searchText);
    @Modifying
    @Transactional
    @Query(
            nativeQuery = true,
            value
                    = "update users set user_password=?1 where user_id=?2;")
    void updatePassword(String password,int user_id);

}
