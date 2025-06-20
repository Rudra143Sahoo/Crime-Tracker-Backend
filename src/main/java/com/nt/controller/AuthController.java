//package com.nt.controller;
//
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.csrf.CsrfToken;
//import org.springframework.web.bind.annotation.*;
//
//import com.nt.model.LoginRequest;
//import com.nt.model.User;
//import com.nt.repo.UserRepo;
//import com.nt.service.UserService;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpSession;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://127.0.0.1:5500",  allowCredentials = "true") // allow frontend access
//public class AuthController {
//	// inject AuthenticationManager
//	@Autowired
//	private AuthenticationManager authenticationManager;
//    @Autowired
//    private UserService userService;
//
//    @Autowired
//    private UserRepo userRepository;
//
//    // Registration: role is assigned inside service, not by user input
//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody User user) {
//        System.out.println("Received user registration: " + user);
//
//        if (userService.userExists(user.getEmail())) {
//            return ResponseEntity.badRequest().body("Email already registered");
//        }
//
//        // Assign role inside service as USER
//        userService.registerUser(user);
//        return ResponseEntity.ok("User registered successfully");
//    }
//    @GetMapping("/csrf-check")
//    public ResponseEntity<String> csrfCheck(HttpServletRequest request) {
//        CsrfToken csrfToken = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
//        System.out.println("CSRF Token: " + csrfToken.getToken()); // Debug
//        return ResponseEntity.ok("CSRF token generated");
//    }
//
////    @GetMapping("/csrf-check")
////    public ResponseEntity<Void> csrfCheck() {
////        return ResponseEntity.ok().build(); // Triggers CSRF token creation
////    }
//    
////    @GetMapping("/csrf-check")
////    public ResponseEntity<String> csrfCheck() {
////        return ResponseEntity.ok("CSRF token sent as cookie").build;
////    }
//
//    // Login: authenticate and save user in session
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody LoginRequest request, HttpSession session) {
//        String email = request.getEmail();
//        String password = request.getPassword();
//        System.out.println("Login request received for email: " + email);
//
////        if (userService.authenticate(email, password)) {
////            Optional<User> optionalUser = userRepository.findByEmail(email);
////            if (optionalUser.isPresent()) {
////                User user = optionalUser.get();
////                session.setAttribute("user", user);
////                return ResponseEntity.ok("Login successful");
////            } else {
////                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
////            }
//        
//        
////        }
////
////        System.out.println("Login failed for email: " + email);
////        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
////    }
//        try {
//            // Perform authentication
//            Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(email, password)
//            );
//
//            // Set authentication to context
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
//
//            return ResponseEntity.ok("Login successful");
//        } catch (Exception ex) {
//            System.out.println("Login failed: " + ex.getMessage());
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
//        }
//}
//}


package com.nt.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.csrf.CsrfToken; // Import CsrfToken
import org.springframework.web.bind.annotation.*;
import com.nt.model.LoginRequest;
import com.nt.model.User;
import com.nt.repo.UserRepo;
import com.nt.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"}, allowCredentials = "true") // allow frontend access
public class AuthController {
    // inject AuthenticationManager
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepo userRepository;

    // Registration: role is assigned inside service, not by user input
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        System.out.println("Received user registration: " + user);

        if (userService.userExists(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        // Assign role inside service as USER
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // --- MODIFIED: Return CsrfToken object as JSON ---
    @GetMapping("/csrf-check")
    public CsrfToken csrfCheck(HttpServletRequest request) {
        CsrfToken csrfToken = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        System.out.println("CSRF Token (from server): " + csrfToken.getToken()); // Debug server-side
        // Spring will automatically convert the CsrfToken object to JSON:
        // {"headerName":"X-XSRF-TOKEN","parameterName":"_csrf","token":"YOUR_ACTUAL_TOKEN"}
        return csrfToken;
    }

    // Login: authenticate and save user in session
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request, HttpSession session) {
        String email = request.getEmail();
        String password = request.getPassword();
        System.out.println("Login request received for email: " + email);

        try {
            // Perform authentication
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
            );

            // Set authentication to context
            SecurityContextHolder.getContext().setAuthentication(authentication);
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            return ResponseEntity.ok("Login successful");
        } catch (Exception ex) {
            System.out.println("Login failed: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
    	System.out.println("logout method called");
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        SecurityContextHolder.clearContext();

        // Expire JSESSIONID cookie
        jakarta.servlet.http.Cookie sessionCookie = new jakarta.servlet.http.Cookie("JSESSIONID", null);
        sessionCookie.setPath("/");
        sessionCookie.setHttpOnly(true);
        sessionCookie.setMaxAge(0); // Expire now
        response.addCookie(sessionCookie);

        // Expire XSRF-TOKEN cookie
        jakarta.servlet.http.Cookie csrfCookie = new jakarta.servlet.http.Cookie("XSRF-TOKEN", null);
        csrfCookie.setPath("/");
        csrfCookie.setMaxAge(0);
        response.addCookie(csrfCookie);

        return ResponseEntity.ok("Logged out successfully");
    }


}

//_____________________________________________________________________________________________________________
//package com.nt.controller;
//
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException; // Import specific exceptions for better handling
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException; // Import common AuthenticationException
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.csrf.CsrfToken; 
//import org.springframework.web.bind.annotation.*;
//
//import com.nt.model.LoginRequest;
//import com.nt.model.User;
//import com.nt.repo.UserRepo;
//import com.nt.service.UserService; // Assuming this service exists and handles user registration
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpSession;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true") 
//public class AuthController {
//    
//    @Autowired
//    private AuthenticationManager authenticationManager;
//    @Autowired
//    private UserService userService; // Assuming UserService handles user registration details
//
//    @Autowired
//    private UserRepo userRepository; // Assuming UserRepo is used by UserService or directly
//
//    /**
//     * Handles user registration.
//     * The user role is typically assigned within the UserService.
//     * @param user User object containing registration details (email, plain password)
//     * @return ResponseEntity indicating success or failure of registration
//     */
//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody User user) {
//        System.out.println("Received user registration: " + user.getEmail()); // Log email, avoid logging plain password
//
//        if (userService.userExists(user.getEmail())) {
//            return ResponseEntity.badRequest().body("Email already registered");
//        }
//
//        // Delegate to UserService to handle password encoding and user saving
//        userService.registerUser(user); 
//        return ResponseEntity.ok("User registered successfully");
//    }
//
//    /**
//     * Endpoint to retrieve the CSRF token.
//     * Spring Security populates the CsrfToken object, which is then returned as JSON.
//     * The client-side JavaScript uses this to include the X-XSRF-TOKEN header in subsequent requests.
//     * @param request HttpServletRequest to get the CsrfToken attribute
//     * @return CsrfToken object as JSON
//     */
//    @GetMapping("/csrf-check")
//    public CsrfToken csrfCheck(HttpServletRequest request) {
//        CsrfToken csrfToken = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
//        if (csrfToken != null) {
//            System.out.println("CSRF Token (from server): " + csrfToken.getToken()); 
//        } else {
//            System.out.println("CSRF Token is null. Check Spring Security configuration.");
//        }
//        return csrfToken;
//    }
//
//    /**
//     * Handles user login.
//     * Authenticates the user using Spring Security's AuthenticationManager and sets the security context.
//     * @param request LoginRequest containing email and plain password
//     * @param session HttpSession to store security context
//     * @return ResponseEntity indicating login success or failure
//     */
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody LoginRequest request, HttpSession session) {
//        String email = request.getEmail();
//        String password = request.getPassword();
//        System.out.println("Login request received for email: " + email);
//
//        try {
//            // Perform authentication using the AuthenticationManager.
//            // UsernamePasswordAuthenticationToken expects plain password.
//            // The AuthenticationManager will internally use UserDetailsService (MongoUserDetailsService)
//            // and PasswordEncoder (BCryptPasswordEncoder) to verify credentials.
//            Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(email, password)
//            );
//
//            // If authentication is successful, set the Authentication object in the SecurityContextHolder.
//            // This establishes the authenticated session.
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//            
//            // Explicitly saving the context to the session ensures it's available for subsequent requests.
//            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
//
//            System.out.println("Login successful for email: " + email);
//            return ResponseEntity.ok("Login successful");
//        } catch (BadCredentialsException ex) {
//            // This specific exception is thrown when password does not match or user is not found by username.
//            System.err.println("Login failed: Bad credentials for email " + email + ". Message: " + ex.getMessage());
//            ex.printStackTrace(); // Print stack trace for detailed debugging
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
//        } catch (AuthenticationException ex) {
//            // Catch other authentication-related exceptions (e.g., DisabledException, LockedException)
//            System.err.println("Login failed (AuthenticationException): " + ex.getClass().getName() + " - " + ex.getMessage());
//            ex.printStackTrace(); // Print stack trace for detailed debugging
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed: " + ex.getMessage());
//        } catch (Exception ex) {
//            // Catch any other unexpected exceptions
//            System.err.println("An unexpected error occurred during login for email " + email + ": " + ex.getMessage());
//            ex.printStackTrace(); // Print stack trace for detailed debugging
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred during login.");
//        }
//    }
//}
//
