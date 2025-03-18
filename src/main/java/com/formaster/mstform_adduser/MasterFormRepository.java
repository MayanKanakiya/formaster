package com.formaster.mstform_adduser;

import java.sql.Timestamp;
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
	
	@Query(value = "select id,fname,lname,email,cno,gender,validfrom,validto,urole,image,createdby,createdon,modifyby,modifyon,active from user_entity where id=?1 and isdelete=0", nativeQuery = true)
	List<UserDTO> getUserDataById(int id);

	@Modifying
	@Transactional
	@Query(value = "update user_entity set isdelete=1 where id=?1", nativeQuery = true)
	int deleteUdata(int id);

	@Query(value = "select id,fname,lname,email,cno,gender,validfrom,validto,urole,image,createdby,createdon,modifyby,modifyon,active from user_entity where id=?1", nativeQuery = true)
	List<UserDTO> fetchUserDataById(int id);

	@Modifying
	@Transactional
	@Query(value = "update user_entity set fname=?1,lname=?2,email=?3,cno=?4,gender=?5,validfrom=?6,validto=?7,urole=?8,image=?9,modifyby=?10,modifyon=?11 where id=?12", nativeQuery = true)
	int updateUdata(String fname, String lname, String email, String cno, String gender, String validfrom,
			String validto, int urole, String image, int modifyby, Timestamp modifyon, int id);

}
