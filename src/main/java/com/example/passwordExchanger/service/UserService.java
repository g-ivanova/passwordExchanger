package com.example.passwordExchanger.service;

import com.example.passwordExchanger.entity.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    User saveUser(User user);

    User getUserById(int id);

    User updateUser(User user);

    void deleteUserById(int id);

    User getUserByEmail(String email);

    User getUserByUsername(String username);

    String getPasswordByUsername(String username, String key);



}
