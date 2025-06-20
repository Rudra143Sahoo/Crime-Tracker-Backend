//package com.nt.controller; // Or com.nt.controller.test if you create a subpackage
//
//import jakarta.servlet.http.HttpSession; // Make sure this import is correct (jakarta for Spring Boot 3+)
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController // This annotation makes it a Spring REST controller
//public class SessionTestController {
//
//    @GetMapping("/test-session") // This maps the HTTP GET request to /test-session
//    public String testSession(HttpSession session) {
//        // Accessing HttpSession automatically creates it if it doesn't exist
//        // Spring injects the HttpSession object for you.
//        String sessionId = session.getId();
//        // You can also put something in the session to confirm it's working
//        session.setAttribute("testAttribute", "Hello Session!");
//        System.out.println("SessionTestController: Session ID created/accessed: " + sessionId); // Add a print statement to your backend logs
//        return "Session created/accessed. ID: " + sessionId;
//    }
//}
