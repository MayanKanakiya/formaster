package com.formaster.springSecurityConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.formaster.loginuser.UserEntity;
import com.formaster.loginuser.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		UserEntity userEntity = userRepository.findByEmail(email);
		System.out.println("UserEntity found: " + userEntity);
		if (userEntity == null) {
			throw new UsernameNotFoundException("User not found with email: " + email);
		}
		return new UserPrincipal(userEntity);
	}
}
