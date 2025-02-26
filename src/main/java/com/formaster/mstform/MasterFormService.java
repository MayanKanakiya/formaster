package com.formaster.mstform;

import org.springframework.web.multipart.MultipartFile;

import com.formaster.user.UserDTO;

public interface MasterFormService {

	public UserDTO AddUserJValid(UserDTO userDTO);

	public UserDTO AddUser(UserDTO userDTO, MultipartFile imageFile);
}
