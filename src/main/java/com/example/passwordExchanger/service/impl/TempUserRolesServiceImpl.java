package com.example.passwordExchanger.service.impl;

import com.example.passwordExchanger.entity.TempUserRoles;
import com.example.passwordExchanger.repository.TempUserRolesRepository;
import com.example.passwordExchanger.service.TempUserRolesService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TempUserRolesServiceImpl implements TempUserRolesService {
    private TempUserRolesRepository tempUserRolesRepository;
    public TempUserRolesServiceImpl(TempUserRolesRepository tempUserRolesRepository) {
        super();
        this.tempUserRolesRepository = tempUserRolesRepository;
    }

    @Override
    public List<TempUserRoles> getAllRoles() {
        return tempUserRolesRepository.findAll();
    }

    @Override
    public TempUserRoles saveRole(TempUserRoles userrole) {
        return tempUserRolesRepository.save(userrole);
    }

    @Override
    public TempUserRoles getRoleById(int id) {
        return tempUserRolesRepository.findById((long)id).get();
    }

    @Override
    public TempUserRoles updateRole(TempUserRoles userrole) {
        return tempUserRolesRepository.save(userrole);
    }

    @Override
    public void deleteRoleById(int id) {
        tempUserRolesRepository.deleteById((long) id);
    }

    @Override
    public List<TempUserRoles> getUserRolesByUserId(int user_id) {
        return tempUserRolesRepository.getUserRolesByUserId(user_id);
    }

    @Override
    public void deleteTempUserRoleByUserIdAndRoleId(int user_id, int role_id) {
        tempUserRolesRepository.deleteTempUserRoleByUserIdAndRoleId(user_id,role_id);
    }

    @Override
    public void deleteTempUserRoleByUserId(int user_id) {
        tempUserRolesRepository.deleteTempUserRoleByUserId(user_id);
    }
}
