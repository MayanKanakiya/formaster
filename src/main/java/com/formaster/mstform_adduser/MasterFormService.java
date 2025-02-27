package com.formaster.mstform_adduser;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.formaster.loginuser.UserDTO;

public interface MasterFormService {

	public UserDTO AddUserJValid(UserDTO userDTO);

	public UserDTO AddUser(UserDTO userDTO, MultipartFile imageFile);

	public List<UserDTO> getAllUserData();

	public List<UserDTO> fetchUserDataById(int id);

	public UserDTO deleteUserData(UserDTO userDTO, int id);
}
