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

import com.healthcare.model.RequestModel;
import com.healthcare.model.User;
import com.healthcare.repository.RequestRepository;
import com.healthcare.repository.UserRepository;

@CrossOrigin
@RestController
@RequestMapping("/requests")
public class RequestController {

	@Autowired
	RequestRepository requestRepository;

	@Autowired
	UserRepository userRepository;

	@PostMapping("/add")
	public void addRequest(@RequestBody RequestModel request) {
		requestRepository.save(request);
	}

	@GetMapping("/getRequest/{id}")
	public RequestModel getRequest(@PathVariable String id) throws Exception {
		return requestRepository.findByIdCustom(id).orElseThrow(() -> new Exception("Not found"));
	}

	@GetMapping("/getRequests/{id}")
	public List<RequestModel> getAll(@PathVariable String id) {
		return requestRepository.getRequests(id);
	}

	@PatchMapping("/updateRequest/{status}")
	public void update(@PathVariable boolean status, @RequestBody RequestModel request) {
		if (status) {
			User user = userRepository.findById(request.getPatientId()).orElse(new User());
			user.setAvailability(status);
			userRepository.save(user);
		}
		requestRepository.save(request);
	}

	@DeleteMapping("/deleteRequest/{id}/{date}")
	public void delete(@PathVariable String id,@PathVariable String date) {
		requestRepository.deleteByPatientIdAndDate(id, date);
	}

}
