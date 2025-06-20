package com.nt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nt.model.User;
import com.nt.repo.UserRepo;
@Service
public class MongoUserDetailsService implements UserDetailsService {

	 @Autowired
	    private UserRepo userRepo;
	 
	 @Override
	    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
	        User user = userRepo.findByEmail(email)
	                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

	        return org.springframework.security.core.userdetails.User.builder()
	                .username(user.getEmail())
	                .password(user.getPassword())
	                .roles(user.getRole()) // example: "USER"
	                .build();
	    }

}
