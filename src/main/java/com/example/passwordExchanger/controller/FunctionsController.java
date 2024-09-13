package com.example.passwordExchanger.controller;

import com.example.passwordExchanger.entity.*;
import com.example.passwordExchanger.service.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Controller
public class FunctionsController {
    @Autowired
    private MailService mailService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRolesService userRolesService;
    @Autowired
    private PasswordService passwordService;
    @Autowired
    private RoleService roleService;

    @GetMapping(value="/")
    public String index(Model model) {
        model.addAttribute("user",new User());
        return "index";
    }
    @GetMapping(value="/index")
    public String getIndex() {
        return "index";
    }
    @PostMapping(value="/index")
    public String login(Model model, User user, RedirectAttributes redirectAttributes,@ModelAttribute("user_password")String user_password){
        User loggingUser=userService.getUserByUsername(user.getUser_username());
        if(loggingUser==null){
            return "index_error";
        }
        else {
            model.addAttribute("username",loggingUser.getUser_username());
            model.addAttribute("user",loggingUser);
            redirectAttributes.addAttribute("user_id",loggingUser.getUser_id());
            String password=userService.getPasswordByUsername(loggingUser.getUser_username(),"admin");
            if ((userService.getPasswordByUsername(user.getUser_username(),"admin")).equals(user_password)) {
                return "redirect:/home";
            }
            return "index_error";
        }
    }
    @GetMapping(value="/home")
    public String home(Model model, @RequestParam(required = false) int user_id){
        UsersAndPasswords pass=new UsersAndPasswords();
        int id_pass;
        String pass_desc;
        int id_from;
        String name_from;
        int id_to;
        String name_to;
        String password;
        String date_pass;
        String password_text;
        List<UsersAndPasswords> passwordsList= new ArrayList<UsersAndPasswords>();
        List<UsersAndPasswords> sendPasswordsList= new ArrayList<UsersAndPasswords>();
        List<Password> passwords=passwordService.getPasswordsFromUserId(user_id);
        for(int i=0;i< passwords.size();i++) {
            id_pass=passwords.get(i).getPassword_id();
            pass_desc=passwords.get(i).getPassword_desc();
            id_from=passwords.get(i).getPassword_from();
            name_from=userService.getUserById(id_from).getUser_names();
            password=passwordService.getPassword(id_pass,"admin");
            password_text=password.replaceAll(".","*");
            date_pass=passwords.get(i).getPassword_validity();
            pass=new UsersAndPasswords(id_pass,pass_desc,id_from,name_from,password,password_text,date_pass);
            passwordsList.add(pass);
        }

        List<Password> sendPasswords=passwordService.getPasswordsFromUserIdTo(user_id);
        for(Password passs:sendPasswords) {
            id_pass=passs.getPassword_id();
            pass_desc=passs.getPassword_desc();
            id_from=passs.getPassword_from();
            name_from=userService.getUserById(id_from).getUser_names();
            id_to=passs.getPassword_to();
            name_to=userService.getUserById(id_to).getUser_names();
            password=passwordService.getPassword(id_pass,"admin");
            date_pass=passs.getPassword_validity();
            password=passwordService.getPassword(id_pass,"admin");
            password_text=password.replaceAll(".","*");
            pass=new UsersAndPasswords(id_pass,pass_desc,id_from,id_to,name_to,name_from,password,password_text,date_pass);
            sendPasswordsList.add(pass);
        }
        model.addAttribute("user_id",user_id);
        model.addAttribute("sendPasswordsList",sendPasswordsList);
        model.addAttribute("passwordsList",passwordsList);
        return "home";
    }
    @PostMapping(value="/home")
    public String sendPassword(Model model,@RequestParam(required = false) int user_id,RedirectAttributes redirectAttributes){
        Password password=new Password();
        model.addAttribute("password",password);
        List<User>userList=userService.getAllUsers();
        model.addAttribute("userList",userList);
        List<Role> roleList=(List<Role>) roleService.getAllRoles();
        model.addAttribute("roleList",roleList);
        redirectAttributes.addAttribute("user_id",user_id);
        return "redirect:/sendpass";
    }
    @GetMapping(value="/register")
    public String registerForm(Model model){
        User user=new User();
        model.addAttribute("user",user);
        List<Role> roleList=(List<Role>) roleService.getAllRoles();
        model.addAttribute("roleList",roleList);
        return "register";
    }
    @PostMapping(value="/register")
    public String saveUser(Model model,@ModelAttribute("user")User user,@RequestParam(required = false)  int role_id) throws Exception{
        List<Role> roleList=(List<Role>) roleService.getAllRoles();
        model.addAttribute("roleList",roleList);
        if(userService.getUserByUsernameOrEmail(user.getUser_username(),user.getUser_email())!=null){
            return "register_existing";
        }
        if(user.getUser_username().isEmpty() || user.getUser_email().isEmpty() || user.getUser_password()==null || role_id==0){
            return "register_error";
        }
        userService.saveUser(user);
        userRolesService.saveRole(new UserRoles(role_id,user.getUser_id()));
        return "index";
    }
    @RequestMapping(value = "/getUsersFromRole", method = RequestMethod.GET)
    @ResponseBody
    @CrossOrigin
    public String getUsersFromRole(@RequestParam String roleId) {
        String json = null;
        JSONArray userlist=new JSONArray();
        List<UserRoles> userRoles=userRolesService.getUserRolesByRoleId(Integer.parseInt(roleId));
        int user_id;
        String username;
        for(UserRoles userRole:userRoles){
            user_id=userService.getUserById(userRole.getUser_id()).getUser_id();
            username=userService.getUserById(userRole.getUser_id()).getUser_names();
            JSONObject users=new JSONObject();
            users.put("user_id",String.valueOf(user_id).toString().trim());
            users.put("user_name",String.valueOf(username).toString().trim());
            userlist.add(users);
        }
        return (userlist.toString());
    }
    @GetMapping(value="/sendpass")
    public String sendPassForm(Model model,@RequestParam(required = false) int user_id){
        Password password=new Password();
        List<Role> roleList=(List<Role>) roleService.getAllRoles();
        model.addAttribute("roleList",roleList);
        model.addAttribute("user_id",user_id);
        model.addAttribute("password",password);
        return "sendpass";
    }
    @PostMapping(value="/sendpass")
    public String sendPass(RedirectAttributes redirectAttributes,Model model, @ModelAttribute("password")Password password, @RequestParam(required = false) int city, @RequestParam(required = false) int user_id) throws Exception{
        List<Role> roleList=(List<Role>) roleService.getAllRoles();
        model.addAttribute("roleList",roleList);
        model.addAttribute("user_id",user_id);
        System.out.println(password.getPassword_desc());
        System.out.println(city);
        System.out.println(password.getPass());
        if(password.getPassword_desc().isEmpty() || city==0  || password.getPass()==null){
            return "sendpass_error";
        }
        else {
            LocalDate currentDate = LocalDate.now();
            String today = currentDate.toString();
            password.setPassword_validity(today);
            password.setPassword_from(user_id);
            password.setPassword_to(city);
            passwordService.savePassword(password);
            model.addAttribute("user", userService.getUserById(user_id));
            model.addAttribute("user_id", user_id);
            redirectAttributes.addAttribute("user_id", user_id);

            Mail mail = new Mail();
            mail.setMailFrom("pass.exchanger.project@gmail.com");
            mail.setMailTo(userService.getUserById(city).getUser_email());
            mail.setMailSubject("Spring Boot - Email demo");
            mail.setMailContent(" shared new password with you! Login to see it.");
            mailService.sendEmail(mail);

            return "redirect:/home";
        }
    }
}