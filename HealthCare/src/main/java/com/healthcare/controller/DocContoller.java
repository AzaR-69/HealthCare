package com.healthcare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.healthcare.repository.DoctorRepository;

@RestController
@CrossOrigin
@RequestMapping("/doctors")
public class DocContoller {
	@Autowired
	DoctorRepository doctorRepository;

	@GetMapping("")
	public List<Doctor> getDoctors(){
		return doctorRepository.findAll();
	}
	
	@PostMapping("/add")
	public void addDoctors(@RequestBody Doctor doctor) {
		doctorRepository.save(doctor);
	}
	
	@GetMapping("/getByDID/{did}")
	public Doctor getDoctor(@PathVariable String did) throws Exception {
		return doctorRepository.findById(did).orElseThrow(()->new Exception("Doctor with ID "+did+" Not found"));
	}
	
	@PatchMapping("/updateDoctor")
	public void update(@RequestBody Doctor doctor) {
		doctorRepository.save(doctor);
	}
	
	@DeleteMapping("/deleteDoctor/{id}")
	public void delete(@PathVariable String id) {
		doctorRepository.deleteById(id);
	}
	
}
