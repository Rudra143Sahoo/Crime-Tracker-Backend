//package com.nt.config;
//import static org.springframework.security.config.Customizer.withDefaults;
//
//import com.nt.service.MongoUserDetailsService;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    private final MongoUserDetailsService mongoUserDetailsService;
//
//    public SecurityConfig(MongoUserDetailsService mongoUserDetailsService) {
//        this.mongoUserDetailsService = mongoUserDetailsService;
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//    	http
//        .csrf(csrf -> csrf.disable())
//        .cors(withDefaults())
//        .authorizeHttpRequests(auth -> auth
//            .requestMatchers("/api/auth/**").permitAll()
//            .requestMatchers("/api/userfeed/submit").hasRole("USER")
//            .anyRequest().authenticated()
//        )
//            .userDetailsService(mongoUserDetailsService)
//          
//            .logout(logout -> logout
//                .logoutUrl("/api/auth/logout")
//                .logoutSuccessUrl("/login.html?logout=true")
//                .invalidateHttpSession(true)
//                .deleteCookies("JSESSIONID")
//                .permitAll()
//            )
//            .sessionManagement(session -> session
//                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
//            );
//    	// Explicitly disable form login and http basic using the modern way
//        http.formLogin(AbstractHttpConfigurer::disable);
//        http.httpBasic(AbstractHttpConfigurer::disable);
//
//        return http.build();
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//        return config.getAuthenticationManager();
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    // ✅ CORS config for frontend on 127.0.0.1:5500
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("http://127.0.0.1:5500")
//                        .allowedMethods("*")
//                        .allowCredentials(true)
//                        .maxAge(3600);
//            }
//        };
//    }
//}
//------------------------------------------------------------------------------------------


//package com.nt.config;
//import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//import static org.springframework.security.config.Customizer.withDefaults;
//
//import java.util.List;
//
//import com.nt.service.MongoUserDetailsService;
//
//@Configuration
//@EnableWebSecurity
//@EnableMethodSecurity
//public class SecurityConfig {
//	private final MongoUserDetailsService mongoUserDetailsService;
//
//	public SecurityConfig(MongoUserDetailsService mongoUserDetailsService) {
//	    this.mongoUserDetailsService = mongoUserDetailsService;
//	}
//	
//	
//	@Bean
//	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//	    return config.getAuthenticationManager();
//	}
//
//	@Bean
//	public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception{
//		http
//		.cors(withDefaults()) 
//		// .csrf(csrf -> csrf.disable())
//		.csrf(csrf -> csrf
//			    .csrfTokenRepository(org.springframework.security.web.csrf.CookieCsrfTokenRepository.withHttpOnlyFalse())
//			)
////		.cors(Customizer.withDefaults()) // ensure CORS is enabled
//		      .authorizeHttpRequests((requests)->requests
//				 .requestMatchers("/api/auth/**").permitAll()
//				 .requestMatchers("/test-session").permitAll() 
//              .requestMatchers("/api/userfeed/submit").hasRole("USER"))
//		      .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)) // <--- ADD THIS LINE
//     	      .userDetailsService(mongoUserDetailsService)
//		     . formLogin(AbstractHttpConfigurer::disable);
//       		
//              
//           return http.build();
//	         
//				
//	}
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//	    return new BCryptPasswordEncoder();
//	}
////	@Bean
////	public CorsConfigurationSource corsConfigurationSource() {
////	    CorsConfiguration config = new CorsConfiguration();
////	    config.setAllowCredentials(true);
////	    config.setAllowedOrigins(List.of("http://127.0.0.1:5500"));
////	    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
////	    config.setAllowedHeaders(List.of("*"));
////	    config.setMaxAge(3600L);
////
////	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
////	    source.registerCorsConfiguration("/**", config);
////	    return source;
////	}
//
//
//	
//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//	    return new WebMvcConfigurer() {
//	        @Override
//	        public void addCorsMappings(CorsRegistry registry) {
//	            registry.addMapping("/**")
//	                    .allowedOrigins("http://127.0.0.1:5500")
//	                    .allowedMethods("*")
//	                    .allowCredentials(true)
//	                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//	                    .allowedHeaders("*")
//	                    .maxAge(3600);
//	           
//	        }
//	    };
//	}
//
//	}
//---------------------------------------------------------------------------------------------------

//package com.nt.config;
//
//import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//import static org.springframework.security.config.Customizer.withDefaults;
//
//import java.util.List;
//
//import com.nt.service.MongoUserDetailsService;
//
//@Configuration
//@EnableWebSecurity
//@EnableMethodSecurity
//public class SecurityConfig {
//    private final MongoUserDetailsService mongoUserDetailsService;
//
//    public SecurityConfig(MongoUserDetailsService mongoUserDetailsService) {
//        this.mongoUserDetailsService = mongoUserDetailsService;
//    }
//    
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//        return config.getAuthenticationManager();
//    }
//
//    @Bean
//    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception{
//        http
//            .cors(withDefaults())
//            // Remove withHttpOnlyFalse() to keep HttpOnly=true for security,
//            // as the browser screenshot confirmed it's being set this way.
//            // We will fetch the token via API response instead.
//            .csrf(withDefaults()) 
//            .authorizeHttpRequests((requests)->requests
//                .requestMatchers("/api/auth/**").permitAll() // Allow all auth endpoints
//                .requestMatchers("/test-session").permitAll() // Allow session test
//                // Permit access to your frontend files if served by Spring Boot
//                .requestMatchers("/", "/login.html", "/login.js", "/login.css", "/register.html").permitAll() 
//                .requestMatchers("/api/userfeed/submit").hasRole("user") // Example of a secured endpoint
//            )
//            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
//            .userDetailsService(mongoUserDetailsService)
//            .formLogin(AbstractHttpConfigurer::disable); // Disable Spring Security's default form login
//                       
//        return http.build();
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    // CORS configuration for your frontend
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("http://127.0.0.1:5500" , "http://localhost:5500") // Your frontend origin
//                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
//                        .allowCredentials(true) // Crucial for sending/receiving cookies (including CSRF)
//                        .allowedHeaders("*") // Allow all headers
//                        .maxAge(3600); // How long the CORS pre-flight request can be cached
//            }
//        };
//    }
//}
//

package com.nt.config;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import static org.springframework.security.config.Customizer.withDefaults;

import java.util.List;

import com.nt.service.MongoUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private final MongoUserDetailsService mongoUserDetailsService;

    public SecurityConfig(MongoUserDetailsService mongoUserDetailsService) {
        this.mongoUserDetailsService = mongoUserDetailsService;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        // Configure CookieCsrfTokenRepository explicitly
        CookieCsrfTokenRepository csrfTokenRepository = new CookieCsrfTokenRepository();
        //csrfTokenRepository.setCookieHttpOnly(false); // Can be true in production
        csrfTokenRepository.setCookiePath("/"); // Ensures the cookie applies to all paths on your domain

        // Configure CsrfTokenRequestAttributeHandler to ensure the token is available as a request attribute.
        // Your /api/auth/csrf-check endpoint relies on this to get the token from the server.
        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
        // REMOVED: requestHandler.setCsrfTokenRepository(csrfTokenRepository); // This line is incorrect

        http
            .cors(withDefaults())
            .csrf(csrf -> csrf
                .csrfTokenRepository(csrfTokenRepository) // Correct: Set the repository for CSRF
                .csrfTokenRequestHandler(requestHandler::handle) // Correct: Use the handler to expose the token
            )
            .authorizeHttpRequests((requests)->requests
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/test-session").permitAll()
                    .requestMatchers("/", "/login.html", "/login.js", "/login.css", "/register.html", "/register.js").permitAll()
                    .requestMatchers("/Crime-Tracker-frontend/**", "/js/**", "/css/**", "/images/**", "/csrf-check").permitAll()
                    .requestMatchers("/api/userfeed/all").permitAll()
                .requestMatchers("/api/userfeed/submit").hasRole("USER")
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                .maximumSessions(1)
                .maxSessionsPreventsLogin(false)
            )
            .logout(logout -> logout
            	    .logoutUrl("/api/auth/logout") // your custom logout endpoint
            	    .invalidateHttpSession(true)
            	    .deleteCookies("JSESSIONID", "XSRF-TOKEN")
            	    .clearAuthentication(true)
            	    .logoutSuccessHandler((request, response, authentication) -> {
            	        response.setStatus(HttpServletResponse.SC_OK);
            	    })
            	)

            .userDetailsService(mongoUserDetailsService)
            .formLogin(AbstractHttpConfigurer::disable)
//            .httpBasic(Customizer.withDefaults());
            .httpBasic(AbstractHttpConfigurer::disable);
        
                        
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://127.0.0.1:5500" , "http://localhost:5500")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowCredentials(true)
                        .allowedHeaders("*")
                        .maxAge(3600);
            }
        };
    }
}
