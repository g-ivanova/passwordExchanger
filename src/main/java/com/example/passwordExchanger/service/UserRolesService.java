package com.example.passwordExchanger.service;

import com.example.passwordExchanger.entity.Role;
import com.example.passwordExchanger.entity.User;
import com.example.passwordExchanger.entity.UserRoles;

import java.util.List;

public interface UserRolesService {

    List<UserRoles> getAllRoles();

    UserRoles saveRole(UserRoles userrole);

    UserRoles getRoleById(int id);

    UserRoles updateRole(UserRoles userrole);

    void deleteRoleById(int id);

    List<UserRoles> getUserRolesByRoleId(int role);

}
