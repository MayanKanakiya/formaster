package com.formaster.loginuser;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

	UserEntity findByEmail(String email);
}
