package com.example.passwordExchanger.service.impl;

import com.example.passwordExchanger.entity.Password;
import com.example.passwordExchanger.repository.PasswordRepository;
import com.example.passwordExchanger.service.PasswordService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PasswordServiceImpl implements PasswordService {

    private PasswordRepository passwordRepository;

    public PasswordServiceImpl(PasswordRepository passwordRepository){
        super();
        this.passwordRepository=passwordRepository;
    }

    @Override
    public List<Password> getAllPasswords() {
        return passwordRepository.findAll();
    }

    @Override
    public Password savePassword(Password password) {
        return passwordRepository.save(password);
    }

    @Override
    public Password getPasswordById(int id) {
        return passwordRepository.findById((long)id).get();
    }

    @Override
    public Password updatePassword(Password password) {
        return passwordRepository.save(password);
    }

    @Override
    public void deletePasswordById(int id) {
        passwordRepository.deleteById((long) id);
    }
}
