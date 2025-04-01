package com.example.passwordExchanger.service;

import com.example.passwordExchanger.entity.User;
import com.example.passwordExchanger.entity.UsersAndRoles;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    User saveUser(User user);

    User getUserById(int id);

    User updateUser(User user);

    void deleteUserById(int id);

    User getUserByEmail(String email);

    User getUserByUsername(String username);

    String getPasswordByUsername(String username);

    User getUserByUsernameOrEmail(String username, String email);

    List<User> getUsersByRole(int role_id);
    List<User> getUsersThatareNotInThisRole(int role_id);

    List<UsersAndRoles> getUsersAndRoles();
    List<User> findUsersBySearchText(@Param("searchText") String searchText);

    void updatePassword(String password,int user_id);

    void updateEmail(String email,int user_id);

    void updateNames(String names,int user_id);

    List<User> getUsersFromSelectedRole(int role_id, int user_id);

    List<User> getUsersNameAndEmailFromSelectedRole(int role_id);

    List<UsersAndRoles> getUserList();
}


