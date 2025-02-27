package com.formaster.mstform_adduser;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.formaster.loginuser.UserDTO;
import com.formaster.loginuser.UserEntity;

import jakarta.transaction.Transactional;

public interface MasterFormRepository extends JpaRepository<UserEntity, Integer> {
	@Modifying
	@Transactional
	@Query(value = "insert into user_entity(active,cno,createdby,email,fname,gender,image,lname,pass,urole,validfrom,validto) values(?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12)", nativeQuery = true)
	int mstUserAdd(int active, String cno, int createdby, String email, String fname, String gender, String image,
			String lname, String pass, int urole, String validfrom, String validto);

	@Query(value = "select count(*) from user_entity where email=?1", nativeQuery = true)
	int duplicateEmail(String email);

	@Query(value = "select id,fname,lname,email,cno,gender,validfrom,validto,urole,image,createdby,createdon,modifyby,modifyon,active from user_entity where 1=1 and isdelete=0", nativeQuery = true)
	List<UserDTO> getAllUserData();

	@Modifying
	@Transactional
	@Query(value = "update user_entity set isdelete=1 where id=?1", nativeQuery = true)
	int deleteUdata(int id);

	@Query(value = "select id,fname,lname,email,cno,gender,validfrom,validto,urole,image,createdby,createdon,modifyby,modifyon,active from user_entity where id=?1", nativeQuery = true)
	List<UserDTO> fetchUserDataById(int id);

}
