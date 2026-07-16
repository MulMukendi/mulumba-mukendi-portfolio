package com.muks.usersystem.controller;

import com.muks.usersystem.entity.User;
import com.muks.usersystem.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users") //this controller handles users
@CrossOrigin(origins = "http://localhost:5173")

public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id){

        return userService.getUserById(id);
    }

    @GetMapping
    public List<User> getAllUsers(){

        return userService.getAllUsers();
    }

    @GetMapping("/search")
    public List<User> searchByFirstName(@RequestParam String firstName){

        return userService.searchByFirstName(firstName);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){

        userService.deleteUser(id);

    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser){

        return userService.updateUser(id, updatedUser);
    }

    @GetMapping("/dashboard/stats/count")
    public Integer numberOfUsers(){

        return userService.numberOfUsers();
    }

    @GetMapping("recent")
    public List<User> findTop3ByOrderByCreatedAtDesc(){

        return userService.findTop3ByOrderByCreatedAtDesc();
    }

    @GetMapping("/dashboard/stats/average-age")
    public Integer getAverageAge(){
        return userService.getAverageAge();
    }

    @GetMapping("/dashboard/stats/new-today")
    public Long countByCreatedAtBetween(){
        return userService.countByCreatedAtBetween();
    }
}
