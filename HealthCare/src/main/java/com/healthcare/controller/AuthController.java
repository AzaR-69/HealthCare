package com.healthcare.controller;

import java.io.UnsupportedEncodingException;
import javax.validation.Valid;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.model.User;
import com.healthcare.repository.UserRepository;
import com.healthcare.security.JwtUtil;
import com.healthcare.services.JwtResponse;

@CrossOrigin(origins = "*")
@RestController
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtil jwtUtil;

	@GetMapping("/")
	public String home() {
		return "home";
	}

	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody User user) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtil.generateJwtToken(authentication);
		return ResponseEntity.ok(new JwtResponse(jwt));
	}

	@GetMapping(value = "/getDetails/{token}", produces = MediaType.APPLICATION_JSON_VALUE)
	public String getPayload(@PathVariable String token) throws UnsupportedEncodingException {
		String payload = token.split("\\.")[1];
		return new String(Base64.decodeBase64(payload), "UTF-8");
	}

	@PostMapping("/signup")
	public void register(@RequestBody User user) throws Exception {
		if (userRepository.existsByUsername(user.getUsername())) {
			throw new Exception("Error: username is already taken");
		}
		if (userRepository.existsByEmail(user.getEmail())) {
			throw new Exception("Error: email is already taken");
		}
		user.setAvailability(true);
		user.setPassword(encoder.encode(user.getPassword()));
		user.setRole("ROLE_USER");
		userRepository.save(user);
	}

	@GetMapping(value = "/getUser/{username}")
	public User findUser(@PathVariable String username) throws Exception {
		return userRepository.findByUsername(username).orElseThrow(()->new Exception("User not found"));
	}
	
	@PatchMapping(value="/update")
	public void updateProfile(@RequestBody User user) {
		userRepository.save(user);
	}
	
	@PostMapping("/registerDoctor")
	public void addDoctors(@RequestBody User user) throws Exception{
		if (userRepository.existsByUsername(user.getUsername())) {
			throw new Exception("Error: username is already taken");
		}
		if (userRepository.existsByEmail(user.getEmail())) {
			throw new Exception("Error: email is already taken");
		}
		user.setPassword(encoder.encode(user.getPassword()));
		user.setRole("ROLE_DOCTOR");
		userRepository.save(user);
	}
	
	
	@PostMapping("/registerAdmin")
	public void addAdmin(@RequestBody User user) throws Exception{
		if (userRepository.existsByUsername(user.getUsername())) {
			throw new Exception("Error: username is already taken");
		}
		if (userRepository.existsByEmail(user.getEmail())) {
			throw new Exception("Error: email is already taken");
		}
		user.setPassword(encoder.encode(user.getPassword()));
		user.setRole("ROLE_ADMIN");
		userRepository.save(user);
	}
	
	@PatchMapping("/updateAvailability/{username}/{availability}")
	public void updateAvailability(@PathVariable String username,@PathVariable boolean availability) throws Exception {
		User user=userRepository.findByUsername(username).orElseThrow(()->new Exception("Not found"));
		user.setAvailability(availability);
		userRepository.save(user);
	}
}
