package com.example.passwordExchanger.repository;

import com.example.passwordExchanger.entity.User;
import com.example.passwordExchanger.entity.UserRoles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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
                    = "SELECT * FROM user_roles ur where ur.user_id =?1")
    List<UserRoles> getUserRolesByUserId(int user_id);
}
