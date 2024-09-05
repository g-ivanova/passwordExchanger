package com.example.passwordExchanger.controller;

import com.example.passwordExchanger.entity.User;
import com.example.passwordExchanger.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class FunctionsController {

    @Autowired
    private UserService userService;

    public FunctionsController (UserService userService){
        super();
        this.userService=userService;
    }
    @GetMapping(value="/")
    public String index() {
        return "index";
    }

    @PostMapping(value="index")
    public String login(Model model, @ModelAttribute("username") String username, @ModelAttribute("pass") String pass){
        User loggingUser=userService.getUserByUsername(username);
        String password=userService.getPasswordByUsername(loggingUser.getUser_username(),"admin");
        model.addAttribute("username",loggingUser.getUser_username());
        if(pass.equals(password)){
            return "redirect:/home";
        }
        return "index";
    }

    @GetMapping(value="home")
    public void home(@RequestParam("username") String username){
        System.out.println(username);
    }



}
