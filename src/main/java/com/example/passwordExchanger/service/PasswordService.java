package com.example.passwordExchanger.service;

import com.example.passwordExchanger.entity.Password;

import java.util.List;

public interface PasswordService {

    List<Password> getAllPasswords();

    Password savePassword(Password password);

    Password getPasswordById(int id);
    Password updatePassword(Password password);

    void deletePasswordById(int id);

}
