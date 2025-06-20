//package com.nt.service;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import com.nt.model.User;
//import com.nt.repo.UserRepo;
//
//@Service
//public class UserService {
//    @Autowired
//    private UserRepo userRepository;
//    @Autowired
//    private PasswordEncoder passwordEncoder;  // Use the bean from config
//    //private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//
//    public User registerUser(User user) {
//    	// Assign role USER explicitly (ignore any client input)
//        user.setRole("USER");
//        // Hash the password before saving
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        return userRepository.save(user);
//    }
//
//    public boolean authenticate(String email, String rawPassword) {
//        return userRepository.findByEmail(email)
//                .map(user -> passwordEncoder.matches(rawPassword, user.getPassword()))
//                .orElse(false);
//    }
//
//    public boolean userExists(String email) {
//        return userRepository.findByEmail(email).isPresent();
//    }
//
//}
//
package com.nt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nt.model.User;
import com.nt.repo.UserRepo;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Registers a new user with the default "USER" role and encrypted password.
     */
    public User registerUser(User user) {
        user.setRole("USER"); // Set role explicitly to prevent frontend tampering
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash password
        return userRepository.save(user);
    }

    /**
     * Authenticates a user by verifying email and raw password.
     */
    public boolean authenticate(String email, String rawPassword) {
        return userRepository.findByEmail(email)
                .map(user -> passwordEncoder.matches(rawPassword, user.getPassword()))
                .orElse(false);
    }

    /**
     * Checks if a user already exists by email.
     */
    public boolean userExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    /**
     * Returns a user by email.
     */
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}
