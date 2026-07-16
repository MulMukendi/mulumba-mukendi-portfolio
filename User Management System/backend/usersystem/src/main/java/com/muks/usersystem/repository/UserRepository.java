package com.muks.usersystem.repository;

import com.muks.usersystem.entity.User;
import com.muks.usersystem.exceptions.UserNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailIgnoreCase(String email);

    List<User> findByFirstNameIgnoreCase(String firstname) throws UserNotFoundException;

    Optional<User> findByUsernameIgnoreCase(String username);

    List<User> findTop3ByOrderByCreatedAtDesc();

    @Query("SELECT AVG(u.age) FROM User u")
    Integer getAverageAge();

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}
