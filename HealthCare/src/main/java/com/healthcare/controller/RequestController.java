package com.healthcare.controller;

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

import com.healthcare.model.RequestModel;
import com.healthcare.repository.RequestRepository;

@CrossOrigin
@RestController
@RequestMapping("/requests")
public class RequestController {

	@Autowired
	RequestRepository requestRepository;

	@PostMapping("/add")
	public void addRequest(@RequestBody RequestModel request) {
		requestRepository.save(request);
	}
	@GetMapping("/getRequest/{id}")
	public RequestModel getRequest(@PathVariable String id) throws Exception {
		return requestRepository.findByIdCustom(id).orElseThrow(() -> new Exception("Not found"));
	}

	@PatchMapping("/updateRequest")
	public void update(@RequestBody RequestModel request) {
		requestRepository.save(request);
	}
	
	@DeleteMapping("/deleteRequest/{id}")
	public void delete(@PathVariable String id) {
		requestRepository.deleteByCustomId(id);
	}
	
	
	
}
