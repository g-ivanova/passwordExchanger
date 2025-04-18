package com.example.passwordExchanger.config;

import com.example.passwordExchanger.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class BCryptGenerator {

    @Autowired
    private UserRepository userRepository;

    public String passwordEncoder(String password) {

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);
        return  hashedPassword;
    }


    public Boolean passwordDecoder(String currentPassword, String ExistingPassword) {

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (passwordEncoder.matches(currentPassword, ExistingPassword)) {
            return  true;
        } else {
            return false;
        }
    }
}