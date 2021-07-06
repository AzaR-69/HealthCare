package com.healthcare.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.model.RequestModel;

@Transactional

public interface RequestRepository extends JpaRepository<RequestModel, Long> {
	@Query(value="SELECT * FROM requests WHERE doctor_id=?1 OR patient_id=?1",nativeQuery=true)
	Optional<RequestModel> findByIdCustom(@Param("id") String id);
	
	@Query(value="SELECT * FROM requests WHERE doctor_id=?1 OR patient_id=?1",nativeQuery=true)
	List<RequestModel> getRequests(@Param("id") String id);
	
	@Modifying
	@Query(value="DELETE FROM requests WHERE patient_id=?1 AND date=?2",nativeQuery=true)
	public void deleteByPatientIdAndDate(@Param("patient_id") String PatientId,@Param("date") String date);
}
