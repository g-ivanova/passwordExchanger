package com.example.passwordExchanger.service;

import com.example.passwordExchanger.entity.Role;

import java.util.List;

public interface RoleService {

    List<Role> getAllRoles();

    Role saveRole(Role role);

    Role getRoleById(int id);

    Role updateRole(Role role);

    void deleteRoleById(int id);
    List<Role> getRolesWithoutOne(int id);

    String getRoleFromId(int id);

    List<Role> getRoleWhereUserIsNot(int id);

}
