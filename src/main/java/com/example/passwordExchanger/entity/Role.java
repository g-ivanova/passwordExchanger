package com.example.passwordExchanger.entity;

import jakarta.persistence.*;

@Entity
@Table(name="roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int role_id;
    @Column(name="role_name")
    private String role_name;

    public Role(){}

    public Role(int role_id, String role_name) {
        this.role_id = role_id;
        this.role_name = role_name;
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
}
