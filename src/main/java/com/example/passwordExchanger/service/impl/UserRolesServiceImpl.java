package com.example.passwordExchanger.service.impl;

import com.example.passwordExchanger.entity.Role;
import com.example.passwordExchanger.entity.User;
import com.example.passwordExchanger.entity.UserRoles;
import com.example.passwordExchanger.repository.UserRolesRepository;
import com.example.passwordExchanger.service.UserRolesService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRolesServiceImpl implements UserRolesService {

    private UserRolesRepository userRolesRepository;

    public UserRolesServiceImpl(UserRolesRepository userRolesRepository) {
        super();
        this.userRolesRepository = userRolesRepository;
    }


    @Override
    public List<UserRoles> getAllRoles() {
        return userRolesRepository.findAll();
    }

    @Override
    public UserRoles saveRole(UserRoles userrole) {
        return userRolesRepository.save(userrole);
    }

    @Override
    public UserRoles getRoleById(int id) {
        return userRolesRepository.findById((long)id).get();
    }

    @Override
    public UserRoles updateRole(UserRoles userrole) {
        return userRolesRepository.save(userrole);
    }

    @Override
    public void deleteRoleById(int id) {
        userRolesRepository.deleteById((long) id);
    }

    @Override
    public List<UserRoles> getUserRolesByRoleId(int role) {
        return userRolesRepository.getUserRolesByRoleId(role);
    }

    @Override
    public List<UserRoles> getUserRolesByUserId(int user_id) {
        return userRolesRepository.getUserRolesByUserId(user_id);
    }

    @Override
    public List<UserRoles> getUserRolesByNoRoleId(int role) {
        return userRolesRepository.getUserRolesByNoRoleId(role);
    }
}
