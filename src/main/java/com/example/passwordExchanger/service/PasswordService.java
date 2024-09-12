package com.example.passwordExchanger.service;

import com.example.passwordExchanger.entity.Password;

import java.util.List;

public interface PasswordService {

    List<Password> getAllPasswords();

    Password savePassword(Password password);

    Password getPasswordById(int id);
    Password updatePassword(Password password);

    void deletePasswordById(int id);

    List<Password> getPasswordsFromUserId(int id);

    String getPassword(int id_pass, String key);

    List<Password> getPasswordsFromUserIdTo(int id);

}
