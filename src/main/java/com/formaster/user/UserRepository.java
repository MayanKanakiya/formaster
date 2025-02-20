package com.formaster.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

	/*
	 * @Query(value = "select count(*) from user_entity where email=?1 and pass=?2",
	 * nativeQuery = true) int login(String email, String pass);
	 */
	UserEntity findByEmail(String email);
}
