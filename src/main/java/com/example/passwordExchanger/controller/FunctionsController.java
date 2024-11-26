package com.example.passwordExchanger.controller;

import com.example.passwordExchanger.entity.*;
import com.example.passwordExchanger.service.*;
import jakarta.persistence.EntityManager;
import jakarta.servlet.http.HttpServletRequest;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.swing.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Controller
@SessionAttributes("user")
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
    @Autowired
    private CodeService codeService;
    @Autowired
    private TempUserRolesService tempUserRolesService;



    @Autowired
    JdbcTemplate jdbcTemplate;

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
    public String login(ModelMap map, Model model, User user, RedirectAttributes redirectAttributes, @ModelAttribute("user_password")String user_password){

        User loggingUser=userService.getUserByUsernameOrEmail(user.getUser_username(),user.getUser_username());

        if(loggingUser==null){
            return "index_error";
        }

        else {
            map.addAttribute("user",loggingUser);
            model.addAttribute("username",user.getUser_username());
            model.addAttribute("user",loggingUser);
            redirectAttributes.addAttribute("user_id",loggingUser.getUser_id());
            String password=userService.getPasswordByUsername(loggingUser.getUser_username(),"admin");
            if ((userService.getPasswordByUsername(userService.getUserById(loggingUser.getUser_id()).getUser_username(),"admin")).equals(user_password)) {
                if
                (loggingUser.getUser_username().equals("admin")) {
                    return "redirect:/admin";
                }
                else {
                    loggingUser.setUser_username(user.getUser_username());
                    return "redirect:/home";
                }

            }
            loggingUser.setUser_username(user.getUser_username());
            return "index_error";

        }
    }
    @GetMapping(value="/admin")
    public String admin(Model model, @RequestParam(required = false) int user_id){
        List<UsersAndRoles> usersList=jdbcTemplate.query("Select users.user_id,users.user_names,users.user_username,users.user_email, group_concat(roles.role_name separator ', ') as user_roles from users left join user_roles on user_roles.user_id=users.user_id left join roles on roles.role_id=user_roles.role_id group by users.user_id,users.user_names,users.user_username,users.user_email",
                (rs,rowNum)->new UsersAndRoles(rs.getInt("user_id"),rs.getString("user_names"),rs.getString("user_username"),rs.getString("user_email"),rs.getString("user_roles")));
        List<RoleAndAllUsers>roleAndAllUsers=jdbcTemplate.query("Select roles.role_id,roles.role_name, group_concat(users.user_names separator ', ') as users from users right join user_roles on users.user_id=user_roles.user_id right join roles on roles.role_id=user_roles.role_id group by roles.role_id",
                (rs,rowNum)->new RoleAndAllUsers(rs.getInt("role_id"),rs.getString("role_name"),rs.getString("users")));
        model.addAttribute("user",userService.getUserById(user_id));
        model.addAttribute("user_id",user_id);
        model.addAttribute("rolesList",roleAndAllUsers);
        model.addAttribute("usersList",usersList);
        return "admin";
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
        model.addAttribute("user",userService.getUserById(user_id));
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

    @PostMapping(value="/register/validateUsernameAndEmail")
    @ResponseBody
    @CrossOrigin
    public String validateUser(UserIDAndPass userIDAndPass) throws Exception{
        if(userService.getUserByUsernameOrEmail(userIDAndPass.getPassword(),userIDAndPass.getUser_id())!=null){
            return"incorrect";
        }
        return "correct";
    }
    @PostMapping(value="/register")
    public String saveUser(Model model,@ModelAttribute("user")User user,@RequestParam(required = false)  int role_id) throws Exception{
        List<Role> roleList=(List<Role>) roleService.getAllRoles();
        model.addAttribute("roleList",roleList);
      //  if(userService.getUserByUsernameOrEmail(user.getUser_username(),user.getUser_email())!=null){
       //     return "register_existing";
       // }
      //  if(user.getUser_username().isEmpty() || user.getUser_email().isEmpty() || user.getUser_password()==null || role_id==0){
        //    return "register_error";
        //}
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
        List<User> userRoles=userService.getUsersFromSelectedRole(Integer.parseInt(roleId));
        for(User userRole:userRoles){
            JSONObject users=new JSONObject();
            users.put("user_id",String.valueOf(userRole.getUser_id()).trim());
            users.put("user_name",userRole.getUser_names().trim());
            users.put("user_email",userRole.getUser_email().trim());
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
    public String sendPass(RedirectAttributes redirectAttributes,Model model, @ModelAttribute("password")Password password, @RequestParam(required = false) int user, @RequestParam(required = false) int user_id) throws Exception{
        List<Role> roleList=(List<Role>) roleService.getAllRoles();
        model.addAttribute("roleList",roleList);
        model.addAttribute("user_id",user_id);
        model.addAttribute("password",password);

        LocalDate currentDate = LocalDate.now();
        String today = currentDate.toString();
        //  password.setPassword_validity(today);
        password.setPassword_from(user_id);
        password.setPassword_to(user);
        passwordService.savePassword(password);
        model.addAttribute("user", userService.getUserById(user_id));
        model.addAttribute("user_id", user_id);
        redirectAttributes.addAttribute("user_id", user_id);

        Mail mail = new Mail();
        mail.setMailFrom("pass.exchanger.project@gmail.com");
        mail.setMailTo(userService.getUserById(user).getUser_email());
        mail.setMailSubject(userService.getUserById(user_id).getUser_names()+" shared new password with you!");
        mail.setMailContent("Hello, "+userService.getUserById(user).getUser_names()+". "+userService.getUserById(user_id).getUser_names()+" has shared a new password with you! The password will be available for 24 hours or until you see or copy it. Login to your account to check it securely.");
        mailService.sendEmail(mail);

        return "redirect:/home";

    }

    @DeleteMapping (value="/home/{user_id}/{id}")
    public String deletePasswordForm(RedirectAttributes redirectAttributes,Model model,@PathVariable Long id,@ModelAttribute("password")Password password,  @ModelAttribute("user")User user,@RequestParam(required = false) int user_id) {
        passwordService.deletePasswordById(id);
        List<Role> roleList=(List<Role>) roleService.getAllRoles();
        model.addAttribute("roleList",roleList);
        model.addAttribute("user_id",user_id);
        model.addAttribute("password",password);
        model.addAttribute("user", user);
        redirectAttributes.addAttribute("user_id", user_id);
        return "redirect:/home";

    }

    @GetMapping(value="/home/{user_id}/{id}")
    public String deletePassword(RedirectAttributes redirectAttributes,Model model,@PathVariable Long id,@ModelAttribute("password")Password password, @ModelAttribute("user")User user,@PathVariable(required = false) int user_id) {
        passwordService.deletePasswordById(id);

        List<Role> roleList=(List<Role>) roleService.getAllRoles();
        model.addAttribute("roleList",roleList);
        model.addAttribute("user_id",user_id);
        model.addAttribute("password",password);
        model.addAttribute("user", user);
        redirectAttributes.addAttribute("user_id", user_id);
        return "redirect:/home";

    }

    @GetMapping(value="/admin/{user_id}/{role_id}")
    public String addUserToGroupForm(Model model,@PathVariable(required = false) int user_id,@PathVariable(required = false) int role_id){
        model.addAttribute("user_id",user_id);
        model.addAttribute("role_id",role_id);
        // model.addAttribute("role",role);
        List<UsersAndRoles> userlist=new ArrayList<UsersAndRoles>();
        for(UserRoles userRole:userRolesService.getUserRolesByRoleId(role_id)){
            userlist.add(new UsersAndRoles(userService.getUserById(userRole.getUser_id()).getUser_id(),userService.getUserById(userRole.getUser_id()).getUser_names(),userService.getUserById(userRole.getUser_id()).getUser_names(),userService.getUserById(userRole.getUser_id()).getUser_email()));
        }
        model.addAttribute("userList",userlist);

        List<User> userlistNo=new ArrayList<User>();
        userlistNo=userService.getUsersThatareNotInThisRole(role_id);

        model.addAttribute("role_name",roleService.getRoleById(role_id).getRole_name());

        model.addAttribute("userListNo",userlistNo);

        return "edit_group";
    }
    @PostMapping(value="/admin/{user_id}/{role_id}")
    public String addUserToGroup(@RequestParam(required = false) int user,RedirectAttributes redirectAttributes,Model model, @RequestParam(required = false) int user_id, @RequestParam(required = false) int role_id) throws Exception{
        userRolesService.saveRole(new UserRoles(role_id,user));
        model.addAttribute("user_id",user_id);
        model.addAttribute("role_id",role_id);
        // model.addAttribute("role",role);
        List<UsersAndRoles> userlist=new ArrayList<UsersAndRoles>();
        for(UserRoles userRole:userRolesService.getUserRolesByRoleId(role_id)){
            userlist.add(new UsersAndRoles(userService.getUserById(userRole.getUser_id()).getUser_id(),userService.getUserById(userRole.getUser_id()).getUser_names(),userService.getUserById(userRole.getUser_id()).getUser_names(),userService.getUserById(userRole.getUser_id()).getUser_email()));
        }
        model.addAttribute("userList",userlist);

        List<User> userlistNo=new ArrayList<User>();
        userlistNo=userService.getUsersThatareNotInThisRole(role_id);

        model.addAttribute("role_name",roleService.getRoleById(role_id).getRole_name());

        model.addAttribute("userListNo",userlistNo);

        return "edit_group";
    }
    @GetMapping(value="/admin/{role_id}/{user_id}/{id}")
    public String deleteUserFromGroup(RedirectAttributes redirectAttributes,Model model,@PathVariable int role_id,@PathVariable int id, @PathVariable(required = false) int user_id) {
        userRolesService.deleteUserRoleByUserIdAndRoleId(user_id,id);
        model.addAttribute("user_id",user_id);
        model.addAttribute("role_id",id);
        // model.addAttribute("role",role);
        List<UsersAndRoles> userlist=new ArrayList<UsersAndRoles>();
        for(UserRoles userRole:userRolesService.getUserRolesByRoleId(id)){
            userlist.add(new UsersAndRoles(userService.getUserById(userRole.getUser_id()).getUser_id(),userService.getUserById(userRole.getUser_id()).getUser_names(),userService.getUserById(userRole.getUser_id()).getUser_names(),userService.getUserById(userRole.getUser_id()).getUser_email()));
        }
        model.addAttribute("userList",userlist);

        List<User> userlistNo=new ArrayList<User>();
        userlistNo=userService.getUsersThatareNotInThisRole(id);
        model.addAttribute("role_name",roleService.getRoleIdFromId(role_id).getRole_name());
        userRolesService.deleteUserRoleByUserIdAndRoleId(id,role_id);

        model.addAttribute("userListNo",userlistNo);

        return "edit_group";
    }
    @PostMapping(value="/admin/addNewGroup/form")
    public String addNewGroupForm(Model model,@RequestParam(required = false) int user_id){
        model.addAttribute("user_id",user_id);
        return "add_new_role";
    }
    @PostMapping(value="/admin/addNewGroup")
    public String saveGroup(Model model,RedirectAttributes redirectAttributes,@RequestParam(required = false) int user_id,@RequestParam(required = false)  String name) throws Exception{
        Role role=new Role(name);
        roleService.saveRole(role);
        List<Role> roleList=(List<Role>) roleService.getAllRoles();
        model.addAttribute("roleList",roleList);
        model.addAttribute("user_id",user_id);
        model.addAttribute("user", userService.getUserById(user_id));
        model.addAttribute("user_id", user_id);
        redirectAttributes.addAttribute("user_id", user_id);
        return "redirect:/admin";
    }
    @GetMapping(value="/admin/deleteGroup/{user_id}/{id}")
    public String deleteGroup(RedirectAttributes redirectAttributes,Model model,@PathVariable int id,@ModelAttribute("user")User user,@PathVariable(required = false) int user_id) {

        List<Role> roleList=(List<Role>) roleService.getAllRoles();
        model.addAttribute("roleList",roleList);
        model.addAttribute("user_id",user_id);
        model.addAttribute("user", userService.getUserById(user_id));
        model.addAttribute("user_id", user_id);
        redirectAttributes.addAttribute("user_id", user_id);

        roleService.deleteRoleById(id);
        return "redirect:/admin";
    }
    @GetMapping(value="/admin/deleteUser/{id}/{user_id}")
    public String deleteUser(RedirectAttributes redirectAttributes,Model model,@PathVariable int id,@PathVariable(required = false) int user_id) {

        List<Role> roleList=(List<Role>) roleService.getAllRoles();
        model.addAttribute("roleList",roleList);
        model.addAttribute("user_id",user_id);
        model.addAttribute("user", userService.getUserById(user_id));
        model.addAttribute("user_id", user_id);
        redirectAttributes.addAttribute("user_id", user_id);

        userService.deleteUserById(id);
        return "redirect:/admin";
    }
    @GetMapping(value="/admin/editUser/{id}/{user_id}")
    public String editUserForm(RedirectAttributes redirectAttributes,Model model,@PathVariable int id,@ModelAttribute("user")User user,@PathVariable(required = false) int user_id) {
        List<UserRoles> userRoleList=userRolesService.getUserRolesByUserId(id);
        List<Role>roleList=new ArrayList<Role>();
        Role role=new Role();
        TempUserRoles temp=new TempUserRoles();
        tempUserRolesService.deleteTempUserRoleByUserId(id);
      /*  for(int i=0;i<userRoleList.size();i++){
            role=new Role(userRoleList.get(i).getRole_id(),roleService.getRoleFromId(userRoleList.get(i).getRole_id()));
            roleList.add(role);
        }*/
        roleList=roleService.getRolesAndTempRolesByUser(id);

        for(int i=0;i<roleService.getRolesFromUserId(id).size();i++){
            temp=new TempUserRoles(roleService.getRolesFromUserId(id).get(i).getRole_id(),id);
            tempUserRolesService.saveRole(temp);
        }
        List<Role>roleListNo=roleService.getRoleWhereUserIsNot(id);
        model.addAttribute("roleListNo",roleListNo);
        model.addAttribute("id",id);
        model.addAttribute("roleList",roleList);
        model.addAttribute("clicked","false");
        model.addAttribute("user_id",user_id);
        model.addAttribute("user", userService.getUserById(id));
        redirectAttributes.addAttribute("user_id", user_id);
        redirectAttributes.addAttribute("id", id);
        return "edit_user";
    }
    @PostMapping(params = "add",value="/admin/editUser/{id}/{user_id}")
    public String editUserFormAddGroup(RedirectAttributes redirectAttributes, Model model, @RequestParam int id, @ModelAttribute("user")User user, @RequestParam(required = false) int user_id, @RequestParam(required = false) int role_id) {
        UserRoles userrole=new UserRoles(role_id,id);
        TempUserRoles tempUserRole=new TempUserRoles(role_id,id,"add");
        // userRolesService.saveRole(userrole);
        tempUserRolesService.saveRole(tempUserRole);
        List<UserRoles> userRoleList=userRolesService.getUserRolesByUserId(id);
        List<Role>roleList=new ArrayList<Role>();
        Role role=new Role();
        roleList=roleService.getRolesAndTempRolesByUser(id);

        List<Role>roleListNo=roleService.getRoleWhereUserIsNot(id);

        model.addAttribute("roleListNo",roleListNo);
        model.addAttribute("id",id);
        model.addAttribute("roleList",roleList);
        model.addAttribute("clicked","true");
        model.addAttribute("user_id",user_id);
        model.addAttribute("user", userService.getUserById(id));
        model.addAttribute("user_email",userService.getUserById(id).getUser_email());
        redirectAttributes.addAttribute("user_id", user_id);
        redirectAttributes.addAttribute("id", id);
        return "edit_user";
    }
    @PostMapping(value="/admin/editUser/{id}/{user_id}")
    public String editUser(RedirectAttributes redirectAttributes,Model model,@ModelAttribute("user")User user,@RequestParam int id,@RequestParam(required = false) int user_id) {
        List<TempUserRoles>tempUserRoles=tempUserRolesService.getUserRolesByUserId(id);
        if(tempUserRoles.size()>0){

            Mail mail = new Mail();
            mail.setMailFrom("pass.exchanger.project@gmail.com");
            mail.setMailTo(userService.getUserById(id).getUser_email());
            mail.setMailSubject("Your Group List Has Been Updated");
            mail.setMailContent("The list with your groups was changed. Please check your profile settings for more information.");
            mailService.sendEmail(mail);
        }
        for(TempUserRoles temp:tempUserRoles) {
            if (temp.getAction() != null) {
                if (temp.getAction().equals("add")) {

                    userRolesService.saveRole(new UserRoles(temp.getRole_id(), id));
                    tempUserRolesService.deleteTempUserRoleByUserIdAndRoleId(id, temp.getRole_id());
                } else {

                    userRolesService.deleteUserRoleByUserIdAndRoleId(id, temp.getRole_id());
                    tempUserRolesService.deleteTempUserRoleByUserIdAndRoleId(id, temp.getRole_id());
                }
            }
        }

        List<UserRoles> userRoleList=userRolesService.getUserRolesByUserId(id);
        List<Role>roleList=new ArrayList<Role>();
        Role role=new Role();

        roleList=roleService.getRolesAndTempRolesByUser(id);
        List<Role>roleListNo=roleService.getRoleWhereUserIsNot(id);
        model.addAttribute("roleListNo",roleListNo);
        model.addAttribute("roleList",roleList);
        model.addAttribute("user_id",user_id);
        model.addAttribute("user", userService.getUserById(id));
        redirectAttributes.addAttribute("user_id", user_id);
        redirectAttributes.addAttribute("id", id);
        redirectAttributes.addFlashAttribute("notification",String.format("User successfully saved", userService.getUserById(user_id).getUser_names()));
        redirectAttributes.addFlashAttribute("action", "save");
        return "redirect:/admin";
    }
    @GetMapping(value="/admin/deleteUserFromGroup/{id}/{user_id}/{role_id}")
    public String deleteGroupFromUser(RedirectAttributes redirectAttributes,Model model,@PathVariable int id, @PathVariable(required = false) int user_id,@PathVariable(required = false) int role_id) {
       // userRolesService.deleteUserRoleByUserIdAndRoleId(id,role_id);
        //tempUserRolesService.deleteTempUserRoleByUserIdAndRoleId(id,role_id);
        TempUserRoles toDelete=new TempUserRoles(role_id,id,"delete");
        if(tempUserRolesService.getTempUserRolesByUserIdAndRoleId(id,role_id)==null ){
            tempUserRolesService.saveRole(toDelete);
        }
        if(tempUserRolesService.getTempUserRolesByUserIdAndRoleId(id,role_id)!=null){
            tempUserRolesService.updateAction(tempUserRolesService.getTempUserRolesByUserIdAndRoleId(id,role_id));
        }

       // userRolesService.deleteUserRoleByUserIdAndRoleId(id,role_id);
        List<UserRoles> userRoleList=userRolesService.getUserRolesByUserId(id);
        List<Role>roleList=new ArrayList<Role>();
        Role role=new Role();
       /* for(int i=0;i<userRoleList.size();i++){

            role=new Role(userRoleList.get(i).getRole_id(),roleService.getRoleFromId(userRoleList.get(i).getRole_id()));
            roleList.add(role);
        }
        for(int n=0;n<tempUserRolesService.getUserRolesByUserId(id).size();n++){
            if(tempUserRolesService.getUserRolesByUserId(id).get(n).getAction()==null || tempUserRolesService.getUserRolesByUserId(id).get(n).getAction()==""){
                role=new Role(tempUserRolesService.getUserRolesByUserId(id).get(n).getRole_id(),roleService.getRoleFromId((tempUserRolesService.getUserRolesByUserId(id).get(n).getRole_id())));

                roleList.add(role);
            }
            if(tempUserRolesService.getUserRolesByUserId(id).get(n).getAction()=="delete"){
                role=new Role(tempUserRolesService.getUserRolesByUserId(id).get(n).getRole_id(),roleService.getRoleFromId((tempUserRolesService.getUserRolesByUserId(id).get(n).getRole_id())));

                roleList.remove(role);
            }

        }*/
        roleList=roleService.getRolesAndTempRolesByUser(id);
        List<Role>roleListNo=roleService.getRoleWhereUserIsNot(id);
        model.addAttribute("roleListNo",roleListNo);
        model.addAttribute("id",id);
        model.addAttribute("clicked","true");

        model.addAttribute("roleList",roleList);
        model.addAttribute("user_id",user_id);
        model.addAttribute("user", userService.getUserById(id));
        redirectAttributes.addAttribute("user_id", user_id);
        redirectAttributes.addAttribute("id", id);
        return "edit_user";

    }
    @PostMapping(params = "cancel",value="/admin/editUser/{id}/{user_id}")
    public String cancelFromEditUser(RedirectAttributes redirectAttributes,Model model, @RequestParam(required = false) int user_id,@RequestParam(required = false) int id){
        tempUserRolesService.deleteTempUserRoleByUserId(id);
        List<Role> roleList=(List<Role>) roleService.getAllRoles();
        model.addAttribute("roleList",roleList);
        model.addAttribute("user_id",user_id);
        model.addAttribute("user", userService.getUserById(user_id));
        model.addAttribute("user_id", user_id);
        redirectAttributes.addAttribute("user_id", user_id);
        return "redirect:/admin";
    }
    @PostMapping(params = "cancel",value="/admin/{user_id}/{role_id}")
    public String cancelFromEditGroup(RedirectAttributes redirectAttributes,Model model, @RequestParam(required = false) int user_id){
        List<Role> roleList=(List<Role>) roleService.getAllRoles();
        model.addAttribute("roleList",roleList);
        model.addAttribute("user_id",user_id);
        model.addAttribute("user", userService.getUserById(user_id));
        model.addAttribute("user_id", user_id);
        redirectAttributes.addAttribute("user_id", user_id);
        return "redirect:/admin";
    }
    @PostMapping(value="/admin/searchUser")
    public String findUser(Model model, @RequestParam(required = false) int user_id, @RequestParam(required = false) String searchText){
        List<UsersAndRoles> usersList=jdbcTemplate.query("Select users.user_id,users.user_names,users.user_username,users.user_email, group_concat(roles.role_name separator ',') as user_roles from users left join user_roles on user_roles.user_id=users.user_id left join roles on roles.role_id=user_roles.role_id where LOWER('"+searchText+"') LIKE LOWER(CONCAT('%', users.user_names, '%')) or LOWER('"+searchText+"') LIKE LOWER(CONCAT('%', users.user_username, '%')) or LOWER('"+searchText+"') LIKE LOWER(CONCAT('%', users.user_email, '%')) group by users.user_id,users.user_names,users.user_username,users.user_email;",
                (rs,rowNum)->new UsersAndRoles(rs.getInt("user_id"),rs.getString("user_names"),rs.getString("user_username"),rs.getString("user_email"),rs.getString("user_roles")));

        List<RoleAndAllUsers>roleAndAllUsers=jdbcTemplate.query("Select roles.role_id,roles.role_name, group_concat(users.user_names separator ',') as users from users right join user_roles on users.user_id=user_roles.user_id right join roles on roles.role_id=user_roles.role_id group by roles.role_id",
                (rs,rowNum)->new RoleAndAllUsers(rs.getInt("role_id"),rs.getString("role_name"),rs.getString("users")));
        model.addAttribute("user",userService.getUserById(user_id));
        model.addAttribute("user_id",user_id);
        model.addAttribute("rolesList",roleAndAllUsers);
        model.addAttribute("usersList",usersList);
        return "admin";
    }
    @PostMapping(value="/admin/searchGroup")
    public String findGroup(Model model, @RequestParam( required = false) int user_id, @RequestParam(required = false) String searchText){
        List<UsersAndRoles> usersList=jdbcTemplate.query("Select users.user_id,users.user_names,users.user_username,users.user_email, group_concat(roles.role_name separator ',') as user_roles from users left join user_roles on user_roles.user_id=users.user_id left join roles on roles.role_id=user_roles.role_id group by users.user_id,users.user_names,users.user_username,users.user_email",
                (rs,rowNum)->new UsersAndRoles(rs.getInt("user_id"),rs.getString("user_names"),rs.getString("user_username"),rs.getString("user_email"),rs.getString("user_roles")));

        List<RoleAndAllUsers>roleAndAllUsers=jdbcTemplate.query("Select roles.role_id,roles.role_name, group_concat(users.user_names separator ',') as users from users right join user_roles on users.user_id=user_roles.user_id right join roles on roles.role_id=user_roles.role_id where LOWER('"+searchText+"') LIKE LOWER(CONCAT('%',roles.role_name,'%')) group by roles.role_id",
                (rs,rowNum)->new RoleAndAllUsers(rs.getInt("role_id"),rs.getString("role_name"),rs.getString("users")));
        model.addAttribute("user",userService.getUserById(user_id));
        model.addAttribute("user_id",user_id);
        model.addAttribute("rolesList",roleAndAllUsers);
        model.addAttribute("usersList",usersList);
        return "admin";
    }

    @GetMapping(value="/home/settings/{user_id}")
    public String settings(RedirectAttributes redirectAttributes,Model model,@PathVariable(required = false) int user_id){
        List<TempUserRoles>tempUserRoles=tempUserRolesService.getUserRolesByUserId(user_id);
        TempUserRoles temp=new TempUserRoles();
 /*       for(TempUserRoles tempp:tempUserRoles) {
            if (tempp.getAction() != null) {
                if (tempp.getAction().equals("add")) {

                    userRolesService.saveRole(new UserRoles(tempp.getRole_id(), user_id));
                    tempUserRolesService.deleteTempUserRoleByUserIdAndRoleId(user_id, tempp.getRole_id());
                } else {

                    userRolesService.deleteUserRoleByUserIdAndRoleId(user_id, tempp.getRole_id());
                    tempUserRolesService.deleteTempUserRoleByUserIdAndRoleId(user_id, tempp.getRole_id());
                }
            }
        }*/
        List<Role>roleList=new ArrayList<Role>();
        tempUserRolesService.deleteTempUserRoleByUserId(user_id);
        roleList=roleService.getRolesAndTempRolesByUser(user_id);


        for(int i=0;i<roleService.getRolesFromUserId(user_id).size();i++){
            temp=new TempUserRoles(roleService.getRolesFromUserId(user_id).get(i).getRole_id(),user_id);
            tempUserRolesService.saveRole(temp);
        }
        List<UserRoles> userRoleList=userRolesService.getUserRolesByUserId(user_id);

        Role role=new Role();

        roleList=roleService.getRolesAndTempRolesByUser(user_id);
        List<Role>roleListNo=roleService.getRoleWhereUserIsNot(user_id);
        model.addAttribute("roleListNo",roleListNo);
        model.addAttribute("id",user_id);
        model.addAttribute("roleList",roleList);
        model.addAttribute("user_id",user_id);
        model.addAttribute("email",userService.getUserById(user_id).getUser_email());
        model.addAttribute("names",userService.getUserById(user_id).getUser_names());
        model.addAttribute("username", userService.getUserById(user_id).getUser_username());
        redirectAttributes.addAttribute("user_id", user_id);
        redirectAttributes.addAttribute("id", user_id);

        return "profile_settings";
    }

    @PostMapping(params = "add",value="/home/settings/{user_id}")
    public String saveUser(RedirectAttributes redirectAttributes,Model model,@RequestParam(required = false) int user_id,@RequestParam(required = false) int role_id) {
       /* UserRoles userrole=new UserRoles(role_id,user_id);
        userRolesService.saveRole(userrole);
        List<UserRoles> userRoleList=userRolesService.getUserRolesByUserId(user_id);
        List<Role>roleList=new ArrayList<Role>();
        Role role=new Role();
        for(int i=0;i<userRoleList.size();i++){
            role=new Role(userRoleList.get(i).getRole_id(),roleService.getRoleFromId(userRoleList.get(i).getRole_id()));
            roleList.add(role);
        }
        List<Role>roleListNo=roleService.getRoleWhereUserIsNot(user_id);
        model.addAttribute("roleListNo",roleListNo);
        model.addAttribute("id",user_id);
        model.addAttribute("roleList",roleList);
        model.addAttribute("user_id",user_id);
        model.addAttribute("email",userService.getUserById(user_id).getUser_email());
        model.addAttribute("names",userService.getUserById(user_id).getUser_names());
        model.addAttribute("username", userService.getUserById(user_id).getUser_username());
        model.addAttribute("user", userService.getUserById(user_id));
        redirectAttributes.addAttribute("user_id", user_id);
        redirectAttributes.addAttribute("id", user_id);*/
        UserRoles userrole=new UserRoles(role_id,user_id);
        TempUserRoles tempUserRole=new TempUserRoles(role_id,user_id,"add");

        tempUserRolesService.saveRole(tempUserRole);
        List<UserRoles> userRoleList=userRolesService.getUserRolesByUserId(user_id);
        List<Role>roleList=new ArrayList<Role>();
        Role role=new Role();

        roleList=roleService.getRolesAndTempRolesByUser(user_id);

        List<Role>roleListNo=roleService.getRoleWhereUserIsNot(user_id);

        model.addAttribute("roleListNo",roleListNo);
    //    model.addAttribute("id",id);
        model.addAttribute("roleList",roleList);

        model.addAttribute("user_id",user_id);
        model.addAttribute("user", userService.getUserById(user_id));
        model.addAttribute("dropdown",true);
      //  model.addAttribute("user_email",userService.getUserById(id).getUser_email());
     //   redirectAttributes.addAttribute("user_id", user_id);
       // model.addAttribute("roleListNo",roleListNo);
      // model.addAttribute("id",user_id);
   //     model.addAttribute("roleList",roleList);
   //     model.addAttribute("user_id",user_id);
        model.addAttribute("email",userService.getUserById(user_id).getUser_email());
        model.addAttribute("names",userService.getUserById(user_id).getUser_names());
        model.addAttribute("username", userService.getUserById(user_id).getUser_username());
        model.addAttribute("user", userService.getUserById(user_id));
    //    redirectAttributes.addAttribute("user_id", user_id);
      //  redirectAttributes.addAttribute("id", user_id);
     //   redirectAttributes.addAttribute("id", id);
        return "profile_settings";
    }
    @GetMapping(value="/home/settings/{user_id}/{role_id}")
    public String deleteGroupFromUserEdit(RedirectAttributes redirectAttributes,Model model, @PathVariable(required = false) int user_id,@PathVariable(required = false) int role_id) {
       /* userRolesService.deleteUserRoleByUserIdAndRoleId(user_id,role_id);
        List<UserRoles> userRoleList=userRolesService.getUserRolesByUserId(user_id);
        List<Role>roleList=new ArrayList<Role>();
        Role role=new Role();
        for(int i=0;i<userRoleList.size();i++){
            role=new Role(userRoleList.get(i).getRole_id(),roleService.getRoleFromId(userRoleList.get(i).getRole_id()));
            roleList.add(role);
        }
        List<Role>roleListNo=roleService.getRoleWhereUserIsNot(user_id);
        model.addAttribute("roleListNo",roleListNo);
        model.addAttribute("id",user_id);
        model.addAttribute("roleList",roleList);
        model.addAttribute("user_id",user_id);
        model.addAttribute("email",userService.getUserById(user_id).getUser_email());
        model.addAttribute("names",userService.getUserById(user_id).getUser_names());
        model.addAttribute("username", userService.getUserById(user_id).getUser_username());
        model.addAttribute("user", userService.getUserById(user_id));
        redirectAttributes.addAttribute("user_id", user_id);
        redirectAttributes.addAttribute("id", user_id);*/

        TempUserRoles toDelete=new TempUserRoles(role_id,user_id,"delete");
        if(tempUserRolesService.getTempUserRolesByUserIdAndRoleId(user_id,role_id)==null ){
            tempUserRolesService.saveRole(toDelete);
        }
        if(tempUserRolesService.getTempUserRolesByUserIdAndRoleId(user_id,role_id)!=null){
            tempUserRolesService.updateAction(tempUserRolesService.getTempUserRolesByUserIdAndRoleId(user_id,role_id));
        }


        List<UserRoles> userRoleList=userRolesService.getUserRolesByUserId(user_id);
        List<Role>roleList=new ArrayList<Role>();
        Role role=new Role();

        roleList=roleService.getRolesAndTempRolesByUser(user_id);
        List<Role>roleListNo=roleService.getRoleWhereUserIsNot(user_id);
        model.addAttribute("roleListNo",roleListNo);
        model.addAttribute("id",user_id);
        model.addAttribute("clicked","true");

        model.addAttribute("roleList",roleList);
        model.addAttribute("user_id",user_id);
        model.addAttribute("user", userService.getUserById(user_id));
        redirectAttributes.addAttribute("user_id", user_id);
        redirectAttributes.addAttribute("id", user_id);
        model.addAttribute("dropdown",true);


        redirectAttributes.addAttribute("user_id", user_id);
        model.addAttribute("email",userService.getUserById(user_id).getUser_email());
        model.addAttribute("names",userService.getUserById(user_id).getUser_names());
        model.addAttribute("username", userService.getUserById(user_id).getUser_username());
        redirectAttributes.addAttribute("user_id", user_id);
        redirectAttributes.addAttribute("id", user_id);


        return "profile_settings";

    }

    @GetMapping(value="/resetpassword")
    public String resetPassword(Model model){

        return "reset_password";
    }


    @RequestMapping(value = "/passwordValidity", method = RequestMethod.GET)
    @ResponseBody
    @CrossOrigin
    public void passwordValidity(@RequestParam Long id) {
        passwordService.deletePasswordById(id);
    }

    @PostMapping(value="/home/settings/{user_id}")
    public String editProfile(RedirectAttributes redirectAttributes,Model model,@RequestParam(required = false) int user_id,@RequestParam(required = false) String user_names,@RequestParam(required = false) String user_email,@RequestParam(required = false)String new_password,@RequestParam(required = false)String rep_new_password,@RequestParam(required = false)String current_password)  {
        String pass=userService.getPasswordByUsername(userService.getUserById(user_id).getUser_username(),"admin");
        if(current_password.equals(userService.getPasswordByUsername(userService.getUserById(user_id).getUser_username(),"admin"))) {
            if (!new_password.trim().isEmpty() && new_password!=null && new_password!="" && !new_password.equals("") && rep_new_password.equals(new_password)) {
                pass=new_password;
            }
        }

        List<TempUserRoles>tempUserRoles=tempUserRolesService.getUserRolesByUserId(user_id);
        for(TempUserRoles temp:tempUserRoles) {
            if (temp.getAction() != null) {
                if (temp.getAction().equals("add")) {

                    userRolesService.saveRole(new UserRoles(temp.getRole_id(), user_id));
                    tempUserRolesService.deleteTempUserRoleByUserIdAndRoleId(user_id, temp.getRole_id());
                } else {

                    userRolesService.deleteUserRoleByUserIdAndRoleId(user_id, temp.getRole_id());
                    tempUserRolesService.deleteTempUserRoleByUserIdAndRoleId(user_id, temp.getRole_id());
                }
            }
        }

        List<UserRoles> userRoleList=userRolesService.getUserRolesByUserId(user_id);
        List<Role>roleList=new ArrayList<Role>();
        Role role=new Role();
        List<Role>roleListNo=roleService.getRoleWhereUserIsNot(user_id);
        model.addAttribute("user", userService.getUserById(user_id));
        User newUser=new User(user_id,userService.getUserById(user_id).getUser_username(),user_email, pass.getBytes(),user_names);
        userService.saveUser(newUser);
        redirectAttributes.addAttribute("user_id", user_id);
        if(userService.getUserById(user_id).getUser_username().equals("admin")){
            return "redirect:/admin";
        }
        return "redirect:/home";
    }

    @PostMapping(params = "cancel",value="/home/settings/{user_id}")
    public String cancelFromProfileSettings(RedirectAttributes redirectAttributes,Model model,@ModelAttribute("user")User user, @RequestParam(required = false) int user_id){
        List<Role> roleList=(List<Role>) roleService.getAllRoles();
        model.addAttribute("roleList",roleList);
        model.addAttribute("user_id",user_id);
        model.addAttribute("user", userService.getUserById(user_id));
        model.addAttribute("user_id", user_id);
        redirectAttributes.addAttribute("user_id", user_id);
        if(userService.getUserById(user_id).getUser_username().equals("admin")){
            return "redirect:/admin";
        }
        return "redirect:/home";
    }


    @RequestMapping(value = "/home/resetPassword/sendEmail", method = RequestMethod.GET)
    @ResponseBody
    @CrossOrigin
    public String sendEmailForResetPassword(@RequestParam String email) throws Exception{
        User user=userService.getUserByUsernameOrEmail(email,email);
        if(user==null){
            return "false";
        }

        else  {
            if(codeService.getCodeByUserId(user.getUser_id())!=null){
                return "code";
            }
            codeService.insertCode(user.getUser_id());
            Mail mail = new Mail();
            mail.setMailFrom("pass.exchanger.project@gmail.com");
            mail.setMailTo(user.getUser_email());
            mail.setMailSubject("Spring Boot - Email demo");
            mail.setMailContent("Your code for reseting your password is "+codeService.getCodeById(codeService.getLastID()).getCode());
            mailService.sendEmail(mail);
            return "true";
        }
    }

    @PostMapping(value="/home/resetPassword")
    public String resetPassword(Model model,@RequestParam(required = false)  String email,@RequestParam(required = false)  String code,@RequestParam(required = false)  String new_password,@RequestParam(required = false)  String rep_new_password ) throws Exception{
        User user=userService.getUserByUsernameOrEmail(email,email);
        if(codeService.getCodeByUserId(user.getUser_id()).getCode().equals(code) && new_password.equals(rep_new_password)){
            userService.updatePassword(new_password, user.getUser_id());
            return "redirect:/index";
        }
        return "redirect:/index";
    }

    @PostMapping(params ="cancel",value="/home/resetPassword")
    public String cancelResetPassword() throws Exception{
        return "redirect:/index";
    }

    @RequestMapping(value = "/validatePassword", method = RequestMethod.POST)
    @ResponseBody
    @CrossOrigin
    public String validatePassword(UserIDAndPass userIDAndPass) throws Exception{
        if(userService.getPasswordByUsername(userService.getUserById(Integer.parseInt(userIDAndPass.getUser_id())).getUser_username(),"admin").equals(userIDAndPass.getPassword())){
            return "correct";
        }
        return "incorrect";
    }


    @RequestMapping(value = "/validateCode", method = RequestMethod.POST)
    @ResponseBody
    @CrossOrigin
    public String validateCode(UserIDAndPass userIDAndPass) throws Exception{
        if(userIDAndPass.getPassword().equals(codeService.getCodeByUserId(userService.getUserByEmail(userIDAndPass.getUser_id()).getUser_id()).getCode())){
            return "correct";
        }
        return "incorrect";
    }

    @RequestMapping(value = "/validateEmailAndUsername", method = RequestMethod.POST)
    @ResponseBody
    @CrossOrigin
    public String validateEmailAndUsername(UserIDAndPass userIDAndPass) throws Exception{


        if(userService.getUserByUsernameOrEmail(userIDAndPass.getPassword(),userIDAndPass.getPassword())!=null){
            if((userService.getUserByUsernameOrEmail(userIDAndPass.getPassword(),userIDAndPass.getPassword()).getUser_id()!=Integer.parseInt(userIDAndPass.getUser_id()))){
            return "incorrect";
        }


        }
        return "correct";
    }


    @RequestMapping(value = "/validateGroupName", method = RequestMethod.POST)
    @ResponseBody
    @CrossOrigin
    public String validateGroupName(UserIDAndPass userIDAndPass) throws Exception{

        for(Role role:roleService.getAllRoles()){
            if(role.getRole_name().equals(userIDAndPass.getPassword())){
                return "incorrect";
            }
        }
        return "correct";
    }


}