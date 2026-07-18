package com.muks.usersystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class UsersystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(UsersystemApplication.class, args);
	}

}
