package com.healthcare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.model.Doctor;
import com.healthcare.model.User;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.UserRepository;

@RestController
@CrossOrigin
@RequestMapping("/doctors")
public class DocContoller {
	@Autowired
	DoctorRepository doctorRepository;

	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	UserRepository userRepository;
	
	@GetMapping("")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<Doctor> getDoctors(){
		return doctorRepository.findAll();
	}
	
	@PostMapping("/add")
	@PreAuthorize("hasRole('ADMIN')")
	public void addDoctors(@RequestBody Doctor doctor) {
		User user=new User();
		user.setName(doctor.getName());
		user.setId(doctor.getId());
		user.setEmail("Doc"+doctor.getName().replace(" ", "")+"@hc.com");
		user.setRole("ROLE_DOCTOR");
		user.setAvailability(true);
		String name=doctor.getName().replace(" ", "").toLowerCase();
		user.setUsername("doctor_"+name);
		user.setPassword(encoder.encode("doc_"+name));
		userRepository.save(user);
		doctor.setAvailability(true);
		doctorRepository.save(doctor);
	}
	
	@GetMapping("/getByDID/{did}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public Doctor getDoctor(@PathVariable String did) throws Exception {
		return doctorRepository.findById(did).orElseThrow(()->new Exception("Doctor with ID "+did+" Not found"));
	}
	
	@PatchMapping("/updateDoctor")
	@PreAuthorize("hasRole('ADMIN')")
	public void update(@RequestBody Doctor doctor) {
		doctorRepository.save(doctor);
	}
	
	@DeleteMapping("/deleteDoctor/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public void delete(@PathVariable String id) {
		userRepository.deleteById(id);
		doctorRepository.deleteById(id);
	}
	
}
