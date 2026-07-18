package com.property.service;

import com.property.dto.AuthRequest;
import com.property.dto.AuthResponse;
import com.property.model.User;
import com.property.repository.UserRepository;
import com.property.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(AuthRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(User.UserRole.valueOf(request.getRole().toUpperCase()));

        User savedUser = userRepository.save(user);
        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getId());

        return new AuthResponse(token, savedUser.getId(), savedUser.getEmail(), 
                               savedUser.getFullName(), savedUser.getRole().toString());
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getId());
        return new AuthResponse(token, user.getId(), user.getEmail(), 
                               user.getFullName(), user.getRole().toString());
    }
}
