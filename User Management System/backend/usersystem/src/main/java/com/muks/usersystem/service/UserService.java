package com.muks.usersystem.service;

import com.muks.usersystem.entity.User;
import com.muks.usersystem.exceptions.EmailExistsException;
import com.muks.usersystem.exceptions.UserNotFoundException;
import com.muks.usersystem.exceptions.UsernameTakenException;
import com.muks.usersystem.repository.UserRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){

        this.userRepository = userRepository;
    }



    @Caching( evict = {
            @CacheEvict(value = "users", allEntries = true),
            @CacheEvict(value = "numberOfUsers"),
            @CacheEvict(value = "averageAge"),
            @CacheEvict(value = "recentlyAddedUsers", allEntries = true ),
            @CacheEvict(value = "createdToday")
    })
    public User createUser(User user){

            if (userRepository.findByEmailIgnoreCase(user.getEmail()).isPresent()){
                System.out.println("EMAIL ALREADY EXISTS!");
                throw new EmailExistsException("This email already exists in our system.");
            }


            if (userRepository.findByUsernameIgnoreCase(user.getUsername()).isPresent()){
                System.out.println("USERNAME ALREADY EXISTS!");
                throw new UsernameTakenException("This username has been taken. try another.");
            }

            return userRepository.save(user);
    }

    @Cacheable(value = "user", key = "#id")
    public User getUserById(Long id){
        System.out.println("getUserById() executed"); //for testing purposes
        return userRepository.findById(id).
                orElseThrow(() -> new UserNotFoundException("User not found."));
    }

    @Cacheable("users")
    public List<User> getAllUsers(){
        System.out.println("getAllUsers() executed"); //for testing purposes
        return userRepository.findAll();
    }


    //for now no cache
    public List<User> searchByFirstName(String firstName){
        List<User> users = userRepository.findByFirstNameIgnoreCase(firstName);
        if (users.isEmpty()){
            throw new UserNotFoundException("User not found.");
        }

        return users;
    }


    @Caching(evict = {
            @CacheEvict(value = "users", allEntries = true),
            @CacheEvict(value = "user", key = "#id"),
            @CacheEvict(value = "numberOfUsers"),
            @CacheEvict(value = "averageAge"),
            @CacheEvict(value = "recentlyAddedUsers", allEntries = true ),
            @CacheEvict(value = "createdToday")
    })
    public void deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        userRepository.delete(user);
    }


    @Caching(evict = {
            @CacheEvict(value = "users", allEntries = true),
            @CacheEvict(value = "user", key = "#id"),
            @CacheEvict(value = "averageAge"),
            @CacheEvict(value = "recentlyAddedUsers", allEntries = true ),

    })
    public User updateUser(Long id, User updatedUser) {
        //find the person we want to update
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        //does any user already have this email?
        Optional<User> emailOwner = userRepository.findByEmailIgnoreCase(updatedUser.getEmail());

        //if someone already has that email, check if they are the person we want to update?
        if (emailOwner.isPresent() && !emailOwner.get().getId().equals(id)) {
            System.out.println("EMAIL ALREADY EXISTS!");
            throw new EmailExistsException("This email already exists in our system.");
        }

        Optional<User> usernameOwner = userRepository.findByUsernameIgnoreCase(updatedUser.getUsername());

        if (usernameOwner.isPresent() &&
                !usernameOwner.get().getId().equals(id)) {
            System.out.println("USERNAME ALREADY EXISTS!");

            throw new UsernameTakenException("This username has been taken. try another.");
        }

        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setLastName(updatedUser.getLastName());
        existingUser.setAge(updatedUser.getAge());
        existingUser.setEmail(updatedUser.getEmail());

        return userRepository.save(existingUser);
    }

    @Cacheable("numberOfUsers")
    public Integer numberOfUsers(){

        return Math.toIntExact(userRepository.count());             //total count of users
    }

    @Cacheable("recentlyAddedUsers")
    public List<User> findTop3ByOrderByCreatedAtDesc(){

        return userRepository.findTop3ByOrderByCreatedAtDesc();     //most recently added users
    }

    @Cacheable("averageAge")
    public Integer getAverageAge(){

        return userRepository.getAverageAge();                      //average age of users
    }
    @Cacheable("createdToday")
    public Long countByCreatedAtBetween(){
        LocalDateTime startOfToday = LocalDate.now().atStartOfDay();
        LocalDateTime startOfTomorrow = startOfToday.plusDays(1);

        return userRepository.countByCreatedAtBetween(startOfToday, startOfTomorrow);      //number of users created today
    }
}



