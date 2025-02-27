package com.formaster.springSecurityConfig;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.formaster.loginuser.UserEntity;

public class UserPrincipal implements UserDetails {
	private UserEntity userEntity;

	public UserPrincipal(UserEntity userEntity) {
		this.userEntity = userEntity;
	}

	public String getFirstName() {
		return userEntity.getFname();
	}

	public int getLoginUserId() {
		return userEntity.getId();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> authorities = new ArrayList<>();
		if (userEntity.getUrole() == 1) {
			authorities.add(new SimpleGrantedAuthority("ADMIN"));
		} else {
			authorities.add(new SimpleGrantedAuthority("CLIENT"));
		}
		return authorities;
	}

	@Override
	public String getPassword() {
		return userEntity.getPass();
	}

	@Override
	public String getUsername() {
		return userEntity.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
