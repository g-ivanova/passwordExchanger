package com.example.passwordExchanger.entity;

public class RoleAndAllUsers {
    private int role_id;
    private String role_name;
    private String users;

    public RoleAndAllUsers(int role_id, String role_name, String users) {
        this.role_id = role_id;
        this.role_name = role_name;
        this.users = users;
    }

    public int getRole_id() {
        return role_id;
    }

    public void setRole_id(int role_id) {
        this.role_id = role_id;
    }

    public String getRole_name() {
        return role_name;
    }

    public void setRole_name(String role_name) {
        this.role_name = role_name;
    }

    public String getUsers() {
        return users;
    }

    public void setUsers(String users) {
        this.users = users;
    }
}
