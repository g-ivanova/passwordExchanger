package com.example.passwordExchanger.entity;

import jakarta.persistence.*;

@Entity
@Table(name="temp_user_roles")
public class TempUserRoles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_temp_user_roles;

    @Column(name="id_temp_role_id")
    private int id_temp_role_id;

    @Column(name="id_temp_user_id")
    private int id_temp_user_id;

    @Column(name="action")
    private String action;
    public TempUserRoles(){}

    public TempUserRoles(int role_id, int user_id) {
        this.id_temp_role_id = role_id;
        this.id_temp_user_id = user_id;
    }

    public TempUserRoles(int id_temp_role_id, int id_temp_user_id, String action) {
        this.id_temp_role_id = id_temp_role_id;
        this.id_temp_user_id = id_temp_user_id;
        this.action = action;
    }

    public TempUserRoles(int id_temp_user_roles, int id_temp_role_id, int id_temp_user_id, String action) {
        this.id_temp_user_roles = id_temp_user_roles;
        this.id_temp_role_id = id_temp_role_id;
        this.id_temp_user_id = id_temp_user_id;
        this.action = action;
    }

    public TempUserRoles(int id_user_roles, int role_id, int user_id) {
        this.id_temp_user_roles = id_user_roles;
        this.id_temp_role_id = role_id;
        this.id_temp_user_id = user_id;
    }

    public int getId_user_roles() {
        return id_temp_user_roles;
    }

    public void setId_user_roles(int id_user_roles) {
        this.id_temp_user_roles = id_user_roles;
    }

    public int getRole_id() {
        return id_temp_role_id;
    }

    public void setRole_id(int role_id) {
        this.id_temp_role_id = role_id;
    }

    public int getUser_id() {
        return id_temp_user_id;
    }

    public void setUser_id(int user_id) {
        this.id_temp_user_id = user_id;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
