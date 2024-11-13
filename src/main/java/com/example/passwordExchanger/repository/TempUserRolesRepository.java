package com.example.passwordExchanger.repository;

import com.example.passwordExchanger.entity.TempUserRoles;
import com.example.passwordExchanger.entity.UserRoles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TempUserRolesRepository extends JpaRepository<TempUserRoles,Long> {

    @Query(
            nativeQuery = true,
            value
                    = "SELECT * FROM temp_user_roles ur where ur.id_temp_user_id=?1")
    List<TempUserRoles> getUserRolesByUserId(int user_id);

    @Query(
            nativeQuery = true,
            value
                    = "SELECT * FROM temp_user_roles ur where ur.id_temp_user_id=?1 and ur.action=?2")
    List<TempUserRoles> getUserRolesByUserIdAndAction(int user_id,String action);

    @Query(
            nativeQuery = true,
            value
                    = "SELECT id_temp_user_roles FROM temp_user_roles ur where ur.id_temp_user_id =?1 and ur.id_temp_role_id=?2")
    Integer getTempUserRolesByUserIdAndRoleId(int user_id,int role_id);

    @Modifying
    @Transactional
    @Query(
            nativeQuery = true,
            value
                    = "DELETE FROM temp_user_roles ur where ur.id_temp_user_id =?1 and ur.id_temp_role_id=?2")
    void deleteTempUserRoleByUserIdAndRoleId(int user_id,int role_id);

    @Modifying
    @Transactional
    @Query(
            nativeQuery = true,
            value
                    = "DELETE FROM temp_user_roles ur where ur.id_temp_user_id =?1")
    void deleteTempUserRoleByUserId(int user_id);

    @Modifying
    @Transactional
    @Query(
            nativeQuery = true,
            value
                    = "update temp_user_roles set action='delete' where id_temp_user_roles=?1")
    void updateAction(int temp_role_id);


}
