package com.example.passwordExchanger.entity;

import jakarta.persistence.*;

@Entity
@Table(name="user_roles")
public class UserRoles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_user_roles;

    @Column(name="role_id")
    private int role_id;

    @Column(name="user_id")
    private int user_id;

    public UserRoles(){}


    public UserRoles(int role_id, int user_id) {
        this.role_id = role_id;
        this.user_id = user_id;
    }
    public UserRoles(int id_user_roles, int role_id, int user_id) {
        this.id_user_roles = id_user_roles;
        this.role_id = role_id;
        this.user_id = user_id;
    }

    public int getId_user_roles() {
        return id_user_roles;
    }

    public void setId_user_roles(int id_user_roles) {
        this.id_user_roles = id_user_roles;
    }

    public int getRole_id() {
        return role_id;
    }

    public void setRole_id(int role_id) {
        this.role_id = role_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
}
