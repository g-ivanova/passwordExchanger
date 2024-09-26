package com.example.passwordExchanger.repository;

import com.example.passwordExchanger.entity.User;
import com.example.passwordExchanger.entity.UserRoles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRolesRepository extends JpaRepository<UserRoles,Long> {

    @Query(
            nativeQuery = true,
            value
                    = "SELECT * FROM user_roles ur where ur.role_id =?1")
    List<UserRoles> getUserRolesByRoleId(int role);
    @Query(
            nativeQuery = true,
            value
                    = "SELECT * FROM user_roles ur where ur.role_id !=?1")
    List<UserRoles> getUserRolesByNoRoleId(int role);


    @Query(
            nativeQuery = true,
            value
                    = "SELECT * FROM user_roles ur where ur.user_id =?1")
    List<UserRoles> getUserRolesByUserId(int user_id);

    @Modifying
    @Transactional
    @Query(
            nativeQuery = true,
            value
                    = "DELETE FROM user_roles ur where ur.user_id =?1 and ur.role_id=?2")
    void deleteUserRoleByUserIdAndRoleId(int user_id,int role_id);


    @Modifying
    @Transactional
    @Query(
            nativeQuery = true,
            value
                    = "DELETE FROM user_roles ur where ur.role_id=?1")
    void deleteUserRoleByRoleId(int role_id);



}
