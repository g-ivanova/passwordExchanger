package com.example.passwordExchanger.service.impl;

import com.example.passwordExchanger.entity.Role;
import com.example.passwordExchanger.repository.RoleRepository;
import com.example.passwordExchanger.service.RoleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleImpl implements RoleService {

    private RoleRepository roleRepository;

    public RoleImpl(RoleRepository roleRepository){
        super();
        this.roleRepository=roleRepository;
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public Role getRoleById(int id) {
        return roleRepository.findById((long)id).get();
    }

    @Override
    public Role updateRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public void deleteRoleById(int id) {
        roleRepository.deleteById((long) id);
    }

    @Override
    public List<Role> getRolesWithoutOne(int id) {
       return roleRepository.getRolesWithoutOne(id);
    }

    @Override
    public String getRoleFromId(int id) {
        return roleRepository.getRoleFromId(id);
    }

    @Override
    public List<Role> getRoleWhereUserIsNot(int id) {
        return roleRepository.getRoleWhereUserIsNot(id);
    }

    @Override
    public List<Role> getRolesAndTempRolesByUser(int user_id) {
        return roleRepository.getRolesAndTempRolesByUser(user_id);
    }

    @Override
    public List<Role> getRolesFromUserId(int user_id) {
        return roleRepository.getRolesFromUserId(user_id);
    }

    @Override
    public Role getRoleIdFromId(int id) {
        return roleRepository.getRoleIdFromId(id);
    }

    @Override
    public int getRoleFromName(String role_name) {
        return roleRepository.getRoleFromName(role_name);
    }
}
