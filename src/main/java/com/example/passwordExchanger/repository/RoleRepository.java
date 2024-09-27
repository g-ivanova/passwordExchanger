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

}
