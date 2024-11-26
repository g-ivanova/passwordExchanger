package com.example.passwordExchanger.service.impl;

import com.example.passwordExchanger.entity.User;
import com.example.passwordExchanger.entity.UsersAndRoles;
import com.example.passwordExchanger.repository.UserRepository;
import com.example.passwordExchanger.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;


    public UserServiceImpl(UserRepository userRepository){
        super();
        this.userRepository=userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(int id) {
        return userRepository.findById((long)id).get();
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUserById(int id) {
        userRepository.deleteById((long) id);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Override
    public String getPasswordByUsername(String username,String key) {
        return userRepository.getPassword(username,key);
    }

    @Override
    public User getUserByUsernameOrEmail(String username, String email) {
        return userRepository.findUserByUsernameOrEmail(username,email);
    }

    @Override
    public List<User> getUsersByRole(int role_id) {
        return userRepository.getUsersByRole(role_id);
    }

    @Override
    public List<User> getUsersThatareNotInThisRole(int role_id) {
        return userRepository.getUsersThatareNotInThisRole(role_id);
    }


    @Override
    public List<UsersAndRoles> getUsersAndRoles() {
        return userRepository.getUsersAndRoles();
    }

    @Override
    public List<User> findUsersBySearchText(String searchText) {
        return userRepository.findUsersBySearchText(searchText);
    }

    @Override
    public void updatePassword(String password, int user_id) {
        userRepository.updatePassword(password,user_id);
    }

    @Override
    public void updateEmail(String email, int user_id) {
        userRepository.updateEmail(email, user_id);
    }

    @Override
    public void updateNames(String names, int user_id) {
        userRepository.updateNames(names, user_id);
    }

    @Override
    public List<User> getUsersFromSelectedRole(int role_id) {
        return userRepository.getUsersFromSelectedRole(role_id);
    }
}
