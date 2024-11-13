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
                    = "Select roles.role_id,roles.role_name" +
                    " from roles \n" +
                    "right join user_roles on roles.role_id=user_roles.role_id\n" +
                    "where user_roles.user_id=?1;")
    List<Role> getRolesFromUserId(int user_id);


    @Query(
            nativeQuery = true,
            value
                    = "SELECT role_name FROM roles p where p.role_id =?1")
    String getRoleFromId(int id);

    @Query(
            nativeQuery = true,
            value
                    = "Select roles.role_id,roles.role_name from roles \n" +
                    "left join user_roles on user_roles.role_id=roles.role_id \n" +
                    "left join temp_user_roles on user_roles.role_id=temp_user_roles.id_temp_role_id \n" +
                    "where  roles.role_id  NOT IN(SELECT temp_user_roles.id_temp_role_id  FROM temp_user_roles where id_temp_user_id=?1 and (action='add' or action is null))  \n" +
                    "group by roles.role_id;")
    List<Role> getRoleWhereUserIsNot(int id);

    @Query(
            nativeQuery = true,
            value
                    = "Select roles.role_id,roles.role_name from roles \n" +
                    "left JOIN user_roles on roles.role_id=user_roles.role_id  \n" +
                    "left join temp_user_roles on temp_user_roles.id_temp_role_id=roles.role_id\n" +
                    "where roles.role_id NOT IN(SELECT id_temp_role_id FROM temp_user_roles where id_temp_user_id=?1 and action='delete') \n" +
                    "and (temp_user_roles.id_temp_user_id=?1 or user_roles.user_id=?1)\n" +
                    "group by roles.role_id;")
    List<Role> getRolesAndTempRolesByUser(int user_id);

}
