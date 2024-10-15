package com.example.passwordExchanger.repository;

import com.example.passwordExchanger.entity.Password;
import com.example.passwordExchanger.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role,Long> {

    @Query(
            nativeQuery = true,
            value
                    = "SELECT * FROM roles p where p.role_id !=?1")
    List<Role> getRolesWithoutOne(int id);

    @Query(
            nativeQuery = true,
            value
                    = "SELECT role_name FROM roles p where p.role_id =?1")
    String getRoleFromId(int id);

    @Query(
            nativeQuery = true,
            value
                    = "Select roles.role_id,roles.role_name from roles left join user_roles on user_roles.role_id=roles.role_id  WHERE roles.role_id NOT IN (SELECT user_roles.role_id FROM user_roles where user_id=?1) group by roles.role_id;")
    List<Role> getRoleWhereUserIsNot(int id);

}
