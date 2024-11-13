package com.example.passwordExchanger.service;

import com.example.passwordExchanger.entity.TempUserRoles;
import com.example.passwordExchanger.entity.UserRoles;

import java.util.List;

public interface TempUserRolesService {

    List<TempUserRoles> getAllRoles();

    TempUserRoles saveRole(TempUserRoles userrole);

    TempUserRoles getRoleById(int id);

    TempUserRoles updateRole(TempUserRoles userrole);

    void deleteRoleById(int id);
    List<TempUserRoles> getUserRolesByUserId(int user_id);
    void deleteTempUserRoleByUserIdAndRoleId(int user_id,int role_id);

    void deleteTempUserRoleByUserId(int user_id);
    List<TempUserRoles> getUserRolesByUserIdAndAction(int user_id,String action);
    Integer getTempUserRolesByUserIdAndRoleId(int user_id,int role_id);

    void updateAction(int temp_role_id);
}
