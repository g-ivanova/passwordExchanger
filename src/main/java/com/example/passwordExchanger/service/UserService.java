package com.example.passwordExchanger.service;

import com.example.passwordExchanger.entity.User;
import com.example.passwordExchanger.entity.UsersAndRoles;

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





}
